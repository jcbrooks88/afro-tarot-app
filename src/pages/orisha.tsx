import React from 'react';
import { motion } from 'framer-motion';
import OrishaCardLibrary from '../components/orisha/OrishaLibrary';

const OrishaPage: React.FC = () => {
  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-burgundy mb-4 drop-shadow-sm">
          Connect to Your Inner Orisha
        </h1>
        <p className="text-gray-700 font-semibold dark:text-gray-300 max-w-2xl mx-auto">
          Orisha&apos;s are spiritual beings in the Yoruba religion, each with unique qualities that connect them to different aspects of life. Similarly, the Zodiac and planets are systems with symbolic meanings tied to personality, fate, and the cosmos. Exploring the connections between Orisha&apos;s, Zodiac signs, and planetary influences can deepen your spiritual understanding. However, these associations vary across traditions, regions, and lineages. It&apos;s important to stay open-minded, research thoroughly, and build a personal connection that feels authentic to your path.
        </p>
      </motion.div>

      <OrishaCardLibrary />
    </main>
  );
};

export default OrishaPage;
