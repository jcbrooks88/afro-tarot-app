// src/utils/getMonthlyMoonPhases.ts

import { mapMoonPhase } from './mapMoonPhase';

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

export const getMonthlyMoonPhases = async (month: number, year: number) => {
  if (!API_KEY) {
    throw new Error('Missing Visual Crossing API key.');
  }

  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const end = `${year}-${String(month).padStart(2, '0')}-31`;
  const location = 'Raleigh'; // or make this dynamic later

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${start}/${end}?unitGroup=us&elements=datetime,moonphase&key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Visual Crossing API Error (${response.status}): ${errorText}`);
      throw new Error(`Failed to fetch moon data (${response.status})`);
    }

    const data = await response.json();

    if (!Array.isArray(data.days)) {
      console.error('Unexpected moon data format:', data);
      throw new Error('Invalid moon data structure');
    }

    type MoonDay = {
      datetime: string;
      moonphase: number;
    };

    return data.days.map((day: MoonDay) => ({
      date: day.datetime,
      moonPhaseValue: day.moonphase,
      moonPhase: mapMoonPhase(day.moonphase),
    }));
  } catch (err) {
    console.error('Moon phase fetch error:', err);
    throw err;
  }
};
