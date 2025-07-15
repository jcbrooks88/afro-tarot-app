import React from 'react';
import CardLibrary from '../components/tarot/CardLibrary';

const TarotPage: React.FC = () => {
  return (
        <div className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <CardLibrary />
        </div>
  );
};

export default TarotPage;
