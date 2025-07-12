import { mapMoonPhase } from "./mapMoonPhase";

const API_KEY = process.env.VISUAL_CROSSING_KEY;

export const getMonthlyMoonPhases = async (month: number, year: number) => {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const end = `${year}-${String(month).padStart(2, '0')}-31`;

  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Raleigh/${start}/${end}?unitGroup=us&elements=datetime,moonphase&key=${API_KEY}`
  );
  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.days.map((day: any) => ({
    date: day.datetime,
    moonPhaseValue: day.moonphase,
    moonPhase: mapMoonPhase(day.moonphase),
  }));
};


