import React from 'react';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        Welcome Home
      </h1>

      <Image
        src="/images/ace-of-cups.webp"
        alt="Tarot Ace of Cups card"
        width={300}
        height={450}
        className="rounded-xl shadow-lg mb-6"
        priority
      />

      <p className="text-lg md:text-xl text-gray-300 max-w-xl">
        Empowering others to find the answers they are looking for.
      </p>
    </div>
  );
};

export default HomePage;
