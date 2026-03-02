import { Thesis } from './domain/Thesis.js';
import { ApiClient } from './persistence/ApiClient.js';
import { Repository } from './persistence/Repository.js';
import { Cleaner } from './services/cleaner.js';
import { Analyzer } from './services/analyzer.js';
import { parseArgs } from './ui/cliArgs.js';
import { EarthquakeRecord } from './domain/Record.js';

const CA_BBOX = { minLat: 32.4, maxLat: 42.1, minLon: -124.6, maxLon: -114.1 };
const TARGET_RECORDS = 200;

function isoDaysAgo(days: number): string {
  const now = new Date();
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

function cacheKey(daysBack: number, minMag: number): string {
  return `usgs:ca:days=${daysBack}:minMag=${minMag}`;
}

async function ingestEarthquakes(args: { daysBack: number; minMagnitude: number }): Promise<EarthquakeRecord[]> {
  const api = new ApiClient();
  const repo = new Repository();
  const cleaner = new Cleaner();

  const key = cacheKey(args.daysBack, args.minMagnitude);
  const cached = repo.get<EarthquakeRecord[]>(key);
  if (cached) return cached;

  const end = new Date().toISOString();
  const start = isoDaysAgo(args.daysBack);

  const pageSize = 200;
  let offset = 1;
  const all: EarthquakeRecord[] = [];

  // Paginate until we have 200 records or there are no more pages
  while (all.length < TARGET_RECORDS) {
    const raw = await api.fetchEarthquakes({
      startTimeIso: start,
      endTimeIso: end,
      minMagnitude: args.minMagnitude,
      minLatitude: CA_BBOX.minLat,
      maxLatitude: CA_BBOX.maxLat,
      minLongitude: CA_BBOX.minLon,
      maxLongitude: CA_BBOX.maxLon,
      limit: pageSize,
      offset
    });

    all.push(...cleaner.normalize(raw));

    if (raw.features.length < pageSize) break;
    offset += pageSize;
  }

  repo.set(key, all);
  return all;
}

function printResearchStyle(thesis: Thesis, result: any): void {
  console.log('');
  console.log('================= Research-Style Result (Minimal) =================');
  console.log('');
  console.log('Thesis');
  console.log(`  ${thesis.statement}`);
  console.log('');
  console.log('Dataset used');
  console.log('  Name: USGS Earthquake GeoJSON');
  console.log('  Endpoint: https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&...');
  console.log(`  Bounds: CA bbox lat[${CA_BBOX.minLat}, ${CA_BBOX.maxLat}] lon[${CA_BBOX.minLon}, ${CA_BBOX.maxLon}]`);
  console.log(`  Time window: last ${thesis.daysBack} days (what-if filter)`);
  console.log(`  Min magnitude: ${thesis.minMagnitude} (what-if filter)`);
  console.log('');
  console.log('Methods');
  console.log('  Clean: drop rows missing id/time/mag, convert time to ISO');
  console.log('  Group: count earthquakes per day (Map)');
  console.log('  Metric: burstRatio = maxDaily / avgDaily');
  console.log('');
  console.log('Results');
  console.log(`  Records analyzed: ${result.recordCount}`);
  console.log(`  Days observed: ${result.uniqueDays}`);
  console.log(`  Avg daily count: ${result.avgDailyCount}`);
  console.log(`  Max daily count: ${result.maxDailyCount}`);
  console.log(`  Burst ratio (max/avg): ${result.burstRatio}`);
  console.log('');
  console.log('Top 5 days (small table)');
  console.log('  Day         Count');
  console.log('  ----------  -----');
  for (const row of result.topDays) {
    const day = String(row.day).padEnd(10, ' ');
    const count = String(row.count).padStart(5, ' ');
    console.log(`  ${day}  ${count}`);
  }
  console.log('');
  console.log('Conclusion');
  console.log(`  ${result.conclusion}`);
  console.log('');
  console.log('Rationale');
  console.log(result.rationale.split('\n').map((l: string) => '  ' + l).join('\n'));
  console.log('====================================================================');
  console.log('');
}

async function main(): Promise<void> {
  const cli = parseArgs(process.argv.slice(2));

  const thesis = new Thesis(
    'In California, for earthquakes ≥ 4.5, the busiest day in the last N days has at least 3× the average daily count.',
    cli.days,
    cli.minMag,
    3.0,
    'California (approx bounding box)'
  );

  const records = await ingestEarthquakes({ daysBack: thesis.daysBack, minMagnitude: thesis.minMagnitude });

  const analyzer = new Analyzer();
  const result = analyzer.analyze({
    thesisStatement: thesis.statement,
    records,
    burstRatioThreshold: thesis.burstRatioThreshold
  });

  printResearchStyle(thesis, result);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
