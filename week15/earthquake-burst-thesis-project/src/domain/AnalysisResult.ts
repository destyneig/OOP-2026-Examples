export type DayCountRow = { day: string; count: number };

export class AnalysisResult {
  constructor(
    public readonly recordCount: number,
    public readonly uniqueDays: number,
    public readonly avgDailyCount: number,
    public readonly maxDailyCount: number,
    public readonly burstRatio: number,
    public readonly topDays: DayCountRow[],
    public readonly conclusion: 'Supported' | 'Not supported' | 'Inconclusive',
    public readonly rationale: string
  ) {}
}
