import React from 'react';
import { motion } from 'framer-motion';
import CardLibrary from '../components/tarot/CardLibrary';

const TarotPage: React.FC = () => {
  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-burgundy mb-4 drop-shadow-sm">
          Explore the Tarot Library
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Dive into each card&apos;s symbolism, suit, arcana, and upright/reversed meanings.
        </p>
      </motion.div>

      <CardLibrary />
    </main>
  );
};

export default TarotPage;
