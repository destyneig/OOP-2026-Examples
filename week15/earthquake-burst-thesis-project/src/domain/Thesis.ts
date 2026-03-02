export class Thesis {
  constructor(
    public readonly statement: string,
    public readonly daysBack: number,
    public readonly minMagnitude: number,
    public readonly burstRatioThreshold: number,
    public readonly boundedRegion: string
  ) {}
}
