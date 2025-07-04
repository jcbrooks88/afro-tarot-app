import React from 'react';
import Image from 'next/image';
import { TarotCard } from '../types/TarotCard';

interface CardModalProps {
  card: TarotCard | null;
  onClose: () => void;
}

const formatCardName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const imageName = formatCardName(card.name);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <Image
            src={`/images/${imageName}.webp`}
            alt={card.name}
            width={300}
            height={400}
            className="rounded-lg mb-4"
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')}
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{card.name}</h2>
          <p className="italic text-sm text-gray-500 mb-3">{card.arcana} Arcana</p>
          <p className="text-sm text-gray-600 text-center mb-4">
            {card.keywords.join(' • ')}
          </p>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            {card.description || card.meaning_up}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
