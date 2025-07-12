'use client';

import { useEffect, useState } from 'react';
import { moonMeanings } from '@/data/moonMeanings';

type MoonDay = {
  date: string;
  phase: string;
};

export default function MonthlyMoonCalendar() {
  const [moonData, setMoonData] = useState<MoonDay[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoon = async () => {
      try {
        const res = await fetch('/api/moon/month');
        const data = await res.json();
        setMoonData(data.moonData);
      } catch (err) {
        setError('Could not load moon data');
      }
    };
    fetchMoon();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-7 gap-2 p-4">
      {moonData.map((day) => (
        <div
          key={day.date}
          className="border rounded-2xl p-2 shadow-sm bg-white dark:bg-gray-800"
        >
          <p className="font-semibold">{new Date(day.date).toDateString()}</p>
          <p className="text-indigo-600">{day.phase}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {moonMeanings[day.phase] ?? 'No interpretation available'}
          </p>
        </div>
      ))}
    </div>
  );
}
