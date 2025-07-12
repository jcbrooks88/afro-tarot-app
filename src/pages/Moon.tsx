import MonthlyMoonCalendar from "@/components/moon/Calendar";

export default function MoonCalendarPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Moon Calendar</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Align your tarot practice with lunar phases.
      </p>
      <MonthlyMoonCalendar />
    </main>
  );
}


