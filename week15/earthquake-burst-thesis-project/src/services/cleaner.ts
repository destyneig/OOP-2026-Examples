import { EarthquakeRecord } from '../domain/Record.js';
import type { UsgsGeoJson } from '../persistence/ApiClient.js';

export class Cleaner {
  normalize(raw: UsgsGeoJson): EarthquakeRecord[] {
    const out: EarthquakeRecord[] = [];

    for (const f of raw.features) {
      const id = f?.id;
      const mag = f?.properties?.mag;
      const time = f?.properties?.time;

      // Validate required fields
      if (!id) continue;
      if (typeof mag !== 'number' || !Number.isFinite(mag)) continue;
      if (typeof time !== 'number' || !Number.isFinite(time)) continue;
      if (!f.geometry || f.geometry.type !== 'Point') continue;

      out.push(new EarthquakeRecord(id, new Date(time).toISOString(), mag));
    }

    return out;
  }
}
