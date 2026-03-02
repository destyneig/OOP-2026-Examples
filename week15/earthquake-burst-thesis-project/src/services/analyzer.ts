import { AnalysisResult, type DayCountRow } from '../domain/AnalysisResult.js';
import { EarthquakeRecord } from '../domain/Record.js';

export class Analyzer {
  analyze(args: {
    thesisStatement: string;
    records: EarthquakeRecord[];
    burstRatioThreshold: number;
  }): AnalysisResult {
    // Data structure: Set for de-duplication
    const seen = new Set<string>();
    const unique: EarthquakeRecord[] = [];
    for (const r of args.records) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      unique.push(r);
    }

    // Data structure: Map for grouping/aggregation
    const countsByDay = new Map<string, number>();
    for (const r of unique) {
      const day = r.dayKeyUtc();
      countsByDay.set(day, (countsByDay.get(day) ?? 0) + 1);
    }

    const days = [...countsByDay.keys()].sort();
    const counts = days.map((d) => countsByDay.get(d) ?? 0);

    const avgDaily = avg(counts);
    const maxDaily = counts.length === 0 ? 0 : Math.max(...counts);
    const burstRatio = avgDaily === 0 ? 0 : maxDaily / avgDaily;

    const topDays: DayCountRow[] = [...countsByDay.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([day, count]) => ({ day, count }));

    const conclusion = decideConclusion({
      recordCount: unique.length,
      burstRatio,
      threshold: args.burstRatioThreshold
    });

    const rationale = [
      `Thesis: ${args.thesisStatement}`,
      `Records analyzed: ${unique.length}`,
      `Avg daily count: ${round(avgDaily)}`,
      `Max daily count: ${maxDaily}`,
      `Burst ratio (max/avg): ${round(burstRatio)} (threshold ${args.burstRatioThreshold})`
    ].join('\n');

    return new AnalysisResult(
      unique.length,
      days.length,
      round(avgDaily),
      maxDaily,
      round(burstRatio),
      topDays,
      conclusion,
      rationale
    );
  }
}

function avg(xs: number[]): number {
  if (xs.length === 0) return 0;
  let sum = 0;
  for (const x of xs) sum += x;
  return sum / xs.length;
}

function round(x: number): number {
  return Math.round(x * 1000) / 1000;
}

function decideConclusion(args: { recordCount: number; burstRatio: number; threshold: number }):
  | 'Supported'
  | 'Not supported'
  | 'Inconclusive' {
  if (args.recordCount < 200) return 'Inconclusive';
  return args.burstRatio >= args.threshold ? 'Supported' : 'Not supported';
}
