
import { format, lastDayOfMonth } from 'date-fns';
import { mapMoonPhase } from './mapMoonPhase';

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

export const getMonthlyMoonPhases = async (
  month: number,
  year: number,
  location = 'Raleigh'
) => {
  if (!API_KEY) {
    throw new Error('Missing Visual Crossing API key.');
  }

  const start = format(new Date(year, month - 1, 1), 'yyyy-MM-dd');
  const end = format(lastDayOfMonth(new Date(year, month - 1)), 'yyyy-MM-dd');

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

    return data.days.map((day: { datetime: string; moonphase: number }) => ({
      date: day.datetime,
      moonPhaseValue: day.moonphase,
      moonPhase: mapMoonPhase(day.moonphase),
    }));
  } catch (err) {
    console.error('Moon phase fetch error:', err);
    throw err;
  }
};
