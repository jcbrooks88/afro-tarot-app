// src/pages/api/moon/month.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location = 'New York,NY' } = req.query;

  const now = new Date();
  const start = format(now, 'yyyy-MM-01');
  const end = format(now, 'yyyy-MM-28'); // enough days to cover full month
  
  const url = `${BASE_URL}/${location}/${start}/${end}?key=${API_KEY}&elements=datetime,moonphase,moonphasephase&unitGroup=us`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const moonData = data.days.map((day: any) => ({
      date: day.datetime,
      phase: day.moonphasephase,
    }));

    res.status(200).json({ moonData });
  } catch (err) {
    console.error('Moon API Error:', err);
    res.status(500).json({ error: 'Failed to fetch moon data' });
  }
}
