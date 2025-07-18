import { useEffect, useState } from 'react';
import { moonMeanings } from '@/data/moonMeanings';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type MoonDay = { date: string; phase: string };

const MonthlyMoonCalendar = () => {
  const [moonData, setMoonData] = useState<MoonDay[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const baseFolder = process.env.NEXT_PUBLIC_CLOUDINARY_MOON_FOLDER;

  useEffect(() => {
    const fetchMoon = async (loc: string) => {
      try {
        const res = await fetch(`/api/moon/month?location=${loc}`);

        if (res.status === 429) {
          console.warn('Rate limit hit (429). Using fallback data.');
          setError('Daily limit reached. Try again later.');
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const text = await res.text();
          console.error(`Moon API Error (${res.status}):`, text);
          setError('Could not fetch moon data. ' + text);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!data?.moonData || !Array.isArray(data.moonData)) {
          console.error('Unexpected moon data:', data);
          setError('Invalid moon data format.');
        } else {
          setMoonData(data.moonData);
        }
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        setError('Failed to load moon data.');
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const loc = `${coords.latitude.toFixed(2)},${coords.longitude.toFixed(2)}`;
          fetchMoon(loc);
        },
        () => fetchMoon('Raleigh,NC')
      );
    } else {
      fetchMoon('Raleigh,NC');
    }
  }, []);

  const getImageSrc = (phase: string) => {
    const name = phase.toLowerCase().replace(/\s+/g, '-');
    return `https://res.cloudinary.com/${cloudName}/image/upload/${baseFolder}/${name}.png`;
  };

  if (loading) return <p className="text-center animate-pulse">Loading moon data...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <section className="min-h-screen p-4 bg-[#F4F1EC]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moonData.map((d, i) => (
          <motion.div
            key={d.date}
            className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => setSelectedImage(getImageSrc(d.phase))}
          >
            <p className="text-center font-semibold">
              {new Date(d.date).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <Image
              src={getImageSrc(d.phase)}
              alt={d.phase}
              width={128}
              height={128}
              className="mx-auto"
            />
            <p className="text-center text-burgundy font-semibold">{d.phase}</p>
            <p className="mt-2 text-sm text-gray-600 text-center">
              {moonMeanings[d.phase] ?? 'No meaning available.'}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
              >
                ✕
              </button>
              <Image
                src={selectedImage}
                alt="Moon phase"
                width={400}
                height={400}
                className="rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MonthlyMoonCalendar;
