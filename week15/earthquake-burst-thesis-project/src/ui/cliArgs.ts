export type CliArgs = { days: number; minMag: number };

export function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { days: 180, minMag: 4.5 };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--days') out.days = Number(argv[++i]);
    if (a === '--minMag') out.minMag = Number(argv[++i]);
  }

  if (!Number.isFinite(out.days) || out.days < 1) out.days = 180;
  if (!Number.isFinite(out.minMag) || out.minMag < 0) out.minMag = 4.5;

  return out;
}
