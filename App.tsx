import Head from 'next/head';
import React from 'react';
import CardLibrary from './src/pages/CardLibrary';

const Home = () => {
  return (
    <>
      <Head>
        <title>Tarot Explorer</title>
        <meta name="description" content="Explore tarot cards by arcana, suit, and keyword." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F4F1EC] min-h-screen">
        <header className="text-center py-6 px-4 bg-[#8c3030] text-white shadow-md">
          <h1 className="text-3xl font-bold">Tarot Explorer</h1>
          <p className="text-sm mt-1">Browse and learn the meanings of tarot cards</p>
        </header>

        <CardLibrary />
      </main>
    </>
  );
};

export default Home;
