import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>House of Brooks | Home</title>
        <meta name="description" content="Welcome to the Mystical House of Brooks Tarot Explorer" />
      </Head>

      <div className="px-4 py-8 sm:py-10 md:py-16 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white/70 rounded-3xl shadow-xl border border-gray-200 px-6 sm:px-10 py-12 backdrop-blur-md">
          <div className="flex flex-col items-center text-center">

            <motion.h1
              className="text-5xl md:text-6xl font-bold tracking-tight text-gray-800 mb-6"
              style={{ textShadow: '0 0 6px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Welcome Home
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/images/ace-of-cups.webp"
                alt="Tarot Ace of Cups card"
                width={300}
                height={450}
                className="rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out mb-6"
                priority
              />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="font-medium text-burgundy">
                Empowering others
              </span>{' '}
              to find the answers they are looking for — through the powerful symbolism of the Tarot.
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
