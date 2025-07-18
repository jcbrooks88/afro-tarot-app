import type { NextApiRequest, NextApiResponse } from 'next';
import { format, lastDayOfMonth } from 'date-fns';
import { mapMoonPhase } from '../../../utils/mapMoonPhase';

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

type MoonApiResponse = {
  days: { datetime: string; moonphase: number }[];
};

type CachedData = { timestamp: number; data: { date: string; phase: string }[] };

const cache: Record<string, CachedData> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location = 'New York,NY' } = req.query as { location?: string };

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key is missing.' });
  }

  const now = new Date();
  const start = format(now, 'yyyy-MM-01');
  const end = format(lastDayOfMonth(now), 'yyyy-MM-dd');

  const cacheKey = `${location}-${start}-${end}`;
  const cached = cache[cacheKey];
  const nowTime = Date.now();

  if (cached && nowTime - cached.timestamp < CACHE_TTL) {
    return res.status(200).json({ moonData: cached.data });
  }

  const url = `${BASE_URL}/${location}/${start}/${end}?key=${API_KEY}&elements=datetime,moonphase&unitGroup=us`;

  console.log('➡️ Fetch Moon Data:', url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🌙 API Error (${response.status}):`, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const rawData = (await response.json()) as MoonApiResponse;

    if (!Array.isArray(rawData.days)) {
      console.error('❗Invalid moon data format:', rawData);
      return res.status(500).json({ error: 'Invalid moon data format' });
    }

    const moonData = rawData.days.map((day) => ({
      date: day.datetime,
      phase: mapMoonPhase(day.moonphase),
    }));

    cache[cacheKey] = { timestamp: nowTime, data: moonData };

    return res.status(200).json({ moonData });
  } catch (err) {
    console.error('🔥 Moon Fetch Error:', err);
    return res.status(500).json({ error: 'Failed to fetch moon data' });
  }
}
