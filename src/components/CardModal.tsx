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
      <div className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-6 max-w-md sm:max-w-lg w-full overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full text-2xl"
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-40 sm:w-60 aspect-[2/3] mb-5">
            <Image
              src={`/images/${imageName}.webp`}
              alt={card.name}
              fill
              sizes="(max-width: 640px) 160px, 240px"
              className="rounded-xl object-contain"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
              }
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-1">{card.name}</h2>
          <p className="text-sm text-gray-500 italic mb-3">{card.arcana} Arcana</p>

          <div className="text-sm sm:text-base text-gray-600 mb-4 flex flex-wrap justify-center gap-2 px-2">
            {card.keywords.map((word, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {word}
              </span>
            ))}
          </div>

          <div className="text-sm sm:text-base text-gray-700 space-y-3 leading-relaxed text-left px-2">
            <p>
              <span className="font-semibold">Description:</span>{' '}
              {card.description}
            </p>
            {card.description && (
            <><p>
                <span className="font-semibold">Standard Meaning:</span>{' '}
                {card.description_up}
              </p><p>
                  <span className="font-semibold">Reversed Meaning:</span>{' '}
                  {card.description_rev}
                </p></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
