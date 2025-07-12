// components/MonthlyMoonCalendar.tsx
"use client";

import { useEffect, useState } from "react";
import { getMonthlyMoonPhases } from "../../utils/getMonthlyMoonPhases";
import { moonMeanings } from "../../data/moonMeanings";

const MonthlyMoonCalendar = () => {
  const [moonData, setMoonData] = useState<any[]>([]);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMonthlyMoonPhases(month, year);
      setMoonData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-7 gap-2 p-4">
      {moonData.map(({ date, moonPhase }, i) => (
        <div key={i} className="bg-white p-2 rounded-xl shadow text-center">
          <p className="text-sm font-semibold">{new Date(date).getDate()}</p>
          <p className="text-xs mt-1">{moonPhase}</p>
          <p className="text-[10px] text-gray-500">{moonMeanings[moonPhase]}</p>
        </div>
      ))}
    </div>
  );
};

export default MonthlyMoonCalendar;
