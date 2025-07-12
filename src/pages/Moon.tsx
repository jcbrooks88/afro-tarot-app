import MonthlyMoonCalendar from "@/components/moon/Calendar";
import React from 'react';

const MoonPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">🌙 Moon Phase Calendar</h1>
      <MonthlyMoonCalendar />
    </div>
  );
};
export default MoonPage;


