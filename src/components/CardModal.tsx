import React from 'react';
import Image from 'next/image';
import { TarotCard } from '@/types/TarotCard';

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 sm:px-6">
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full text-xl"
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={`/images/${imageName}.webp`}
            alt={card.name}
            width={280}
            height={420}
            className="rounded-xl mb-6 object-contain"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
            }
          />

          <h2 className="text-3xl font-semibold text-gray-900 mb-1">{card.name}</h2>
          <p className="text-sm text-gray-500 italic mb-3">{card.arcana} Arcana</p>

          <div className="text-sm text-gray-600 mb-4 flex flex-wrap justify-center gap-2">
            {card.keywords.map((word, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium"
              >
                {word}
              </span>
            ))}
          </div>

          <div className="text-base text-gray-700 space-y-3 leading-relaxed">
            <p>
              <span className="font-semibold">Standard Meaning:</span>{' '}
              {card.meaning_up}
            </p>
            <p>
              <span className="font-semibold">Reversed Meaning:</span>{' '}
              {card.meaning_rev}
            </p>
            {card.description && (
              <p>
                <span className="font-semibold">Description:</span>{' '}
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
