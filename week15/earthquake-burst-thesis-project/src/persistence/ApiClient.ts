import fetch from 'node-fetch';

export type UsgsGeoJson = {
  features: Array<{
    id: string;
    properties: { mag: number | null; time: number | null };
    geometry: { type: 'Point'; coordinates: [number, number, number?] } | null;
  }>;
};

export class ApiClient {
  async fetchEarthquakes(args: {
    startTimeIso: string;
    endTimeIso: string;
    minMagnitude: number;
    minLatitude: number;
    maxLatitude: number;
    minLongitude: number;
    maxLongitude: number;
    limit: number;
    offset: number;
  }): Promise<UsgsGeoJson> {
    const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
    url.searchParams.set('format', 'geojson');
    url.searchParams.set('starttime', args.startTimeIso);
    url.searchParams.set('endtime', args.endTimeIso);
    url.searchParams.set('minmagnitude', String(args.minMagnitude));
    url.searchParams.set('minlatitude', String(args.minLatitude));
    url.searchParams.set('maxlatitude', String(args.maxLatitude));
    url.searchParams.set('minlongitude', String(args.minLongitude));
    url.searchParams.set('maxlongitude', String(args.maxLongitude));
    url.searchParams.set('limit', String(args.limit));
    url.searchParams.set('offset', String(args.offset));
    url.searchParams.set('orderby', 'time-asc');

    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': 'earthquake-thesis-minimal/1.0' }
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`USGS request failed: ${res.status} ${res.statusText}\n${body}`);
    }

    return (await res.json()) as UsgsGeoJson;
  }
}
