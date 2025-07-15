import { useEffect, useState } from 'react';
import { moonMeanings } from '@/data/moonMeanings';
import Image from 'next/image';

type MoonDay = {
  date: string;
  phase: string;
};

const MonthlyMoonCalendar = () => {
  const [moonData, setMoonData] = useState<MoonDay[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoon = async (latLong: string) => {
      try {
        const res = await fetch(`/api/moon/month?location=${latLong}`);
        const data = await res.json();
        setMoonData(data.moonData);
        console.log("Fetched moon data:", data.moonData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
        setError('Could not load moon data.');
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          fetchMoon(coords);
        },
        () => {
          fetchMoon('New York,NY');
        }
      );
    } else {
      fetchMoon('New York,NY');
    }
  }, []);

  const getImageSrc = (phase: string) => {
    const fileName = phase.toLowerCase().replace(/\s+/g, '-');
    return `/images/moon-phases/${fileName}.png`;
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 animate-pulse">Loading moon data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Monthly Moon Calendar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moonData.map((day) => (
          <div
            key={day.date}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm transition-transform hover:scale-[1.015] hover:shadow-md"
          >
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>

            <div
              className="my-3 cursor-pointer"
              onClick={() => setSelectedImage(getImageSrc(day.phase))}
            >
              <Image
                src={getImageSrc(day.phase)}
                alt={`${day.phase} illustration`}
                width={150}
                height={300}
                className="sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto object-contain"
              />
            </div>

            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-center">
              {day.phase}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {moonMeanings[day.phase] ?? 'No interpretation available.'}
            </p>
          </div>
        ))}
      </div>

      {selectedImage && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative bg-white dark:bg-gray-900 rounded-xl max-w-full max-h-[90vh] w-auto"
      onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside image
    >
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-90 transition"
        aria-label="Close"
      >
        ✕
      </button>
      <Image
        src={selectedImage}
        alt="Enlarged moon phase"
        width={500}
        height={500}
        className="w-full h-auto max-w-[90vw] max-h-[80vh] bg-black object-contain rounded-xl"
      />
    </div>
  </div>
)}

    </section>
  );
}
export default MonthlyMoonCalendar;