import MonthlyMoonCalendar from "../components/moon/Calendar";

const MoonCalendarPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#F4F1EC] rounded-2xl border border-gray-200 px-4 py-12 shadow-md mx-auto">
      <h1 className="text-3xl text-center text-burgundy font-bold mb-4">Monthly Lunar Phase Calendar</h1>
      <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
        Need a closer look? Click the image to enlarge.
      </p>
      <MonthlyMoonCalendar />
    </main>
  );
}

export default MoonCalendarPage;



