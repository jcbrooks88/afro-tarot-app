import Head from 'next/head';
import React from 'react';
import CardLibrary from '../components/CardLibrary';

const Home = () => {
  return (
    <>
      <Head>
        <title>House of Brooks Tarot Explorer </title>
        <meta
          name="description"
          content="Explore tarot cards by arcana, suit, and keyword."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F4F1EC] min-h-screen flex flex-col">
        <header className="bg-[#8c3030] shadow-md">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
            <h1 className="text-3xl text-outline sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider leading-snug">
            House of Brooks
            </h1>
            <h2 className="text-xl text-outline sm:text-2xl md:text-3xl text-white tracking-tight leading-snug">
            Tarot Card Explorer
            </h2>
            <p className="mt-2 text-sm text-outline italic sm:text-base text-gray-200 max-w-sm sm:max-w-md mx-auto px-2">
              Browse and learn the meanings of tarot cards
            </p>
          </div>
        </header>

        <section className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <CardLibrary />
        </section>
      </main>
    </>
  );
};

export default Home;
