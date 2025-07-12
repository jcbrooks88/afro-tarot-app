import MonthlyMoonCalendar from "@/components/Moon/Calendar";

export default function MoonPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">🌙 Moon Phase Calendar</h1>
      <MonthlyMoonCalendar />
    </div>
  );
}
