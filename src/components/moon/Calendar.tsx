import { useEffect, useState } from 'react';
import { moonMeanings } from '@/data/moonMeanings';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    return <p className="text-center text-gray-500 animate-pulse">Loading moon data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
  }

  return (
    <section className="min-h-screen px-4 py-6 sm:py-8 bg-[#F4F1EC]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moonData.map((day, index) => (
          <motion.div
            key={day.date}
            className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <p className="text-lg font-semibold text-gray-800 text-center">
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
                height={150}
                className="w-24 h-24 md:w-28 md:h-28 mx-auto object-contain"
              />
            </div>

            <p className="text-burgundy font-semibold text-center">{day.phase}</p>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {moonMeanings[day.phase] ?? 'No interpretation available.'}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-xl max-w-full max-h-[90vh] w-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
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
                className="w-full h-auto max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MonthlyMoonCalendar;
