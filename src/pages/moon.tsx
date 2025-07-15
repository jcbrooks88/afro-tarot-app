import React from 'react';
import { motion } from 'framer-motion';
import MonthlyMoonCalendar from "../components/moon/Calendar";

const MoonCalendarPage: React.FC = () => {
  return (
    <main className="bg-[#F4F1EC] px-4 py-12 rounded-2xl border border-gray-200 shadow-md mx-auto">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl text-burgundy font-bold mb-4">
          Monthly Lunar Phase Calendar
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Need a closer look? Click the image to enlarge.
        </p>
      </motion.div>

      <MonthlyMoonCalendar />
    </main>
  );
};

export default MoonCalendarPage;
