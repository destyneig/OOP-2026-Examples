export class EarthquakeRecord {
  constructor(
    public readonly id: string,
    public readonly timeIso: string, // ISO-8601
    public readonly magnitude: number
  ) {}

  dayKeyUtc(): string {
    return this.timeIso.slice(0, 10);
  }
}
