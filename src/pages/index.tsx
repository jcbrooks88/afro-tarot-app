import Head from 'next/head';
import React from 'react';
import CardLibrary from '../components/CardLibrary';

const Home = () => {
  return (
    <>
      <Head>
        <title>Tarot Explorer</title>
        <meta
          name="description"
          content="Explore tarot cards by arcana, suit, and keyword."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F4F1EC] min-h-screen flex flex-col">
        <header className="bg-[#8c3030] shadow-md">
          <div className="max-w-5xl mx-auto px-6 py-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tarot Explorer
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-200 max-w-md mx-auto">
              Browse and learn the meanings of tarot cards
            </p>
          </div>
        </header>

        <section className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <CardLibrary />
        </section>
      </main>
    </>
  );
};

export default Home;
