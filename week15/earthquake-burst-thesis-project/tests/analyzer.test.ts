import { Analyzer } from '../src/services/analyzer.js';
import { EarthquakeRecord } from '../src/domain/Record.js';

function rec(id: string, day: string, mag = 4.5): EarthquakeRecord {
  return new EarthquakeRecord(id, `${day}T00:00:00.000Z`, mag);
}

test('Burst ratio supports thesis on a synthetic dataset', () => {
  const analyzer = new Analyzer();

  // 40 days: 4/day normally (39 days), but 1 day has 84 events (big spike).
  // Total records = 39*4 + 84 = 240.
  const start = new Date('2026-01-01T00:00:00.000Z');
  const days: string[] = [];
  for (let i = 0; i < 40; i++) {
    days.push(new Date(start.getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  }

  const records: EarthquakeRecord[] = [];
  let id = 0;
  for (let i = 0; i < days.length; i++) {
    const count = i === 25 ? 84 : 4;
    for (let j = 0; j < count; j++) records.push(rec(String(id++), days[i], 4.8));
  }

  expect(records.length).toBeGreaterThanOrEqual(200);

  const res = analyzer.analyze({
    thesisStatement: 'test thesis',
    records,
    burstRatioThreshold: 3.0
  });

  // Avg = 240/40 = 6, max = 84, ratio = 14
  expect(res.avgDailyCount).toBeCloseTo(6, 6);
  expect(res.maxDailyCount).toBe(84);
  expect(res.burstRatio).toBeCloseTo(14, 6);
  expect(res.conclusion).toBe('Supported');
});
