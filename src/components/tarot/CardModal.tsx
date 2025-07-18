import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TarotCard } from '@/types/TarotCard';

interface CardModalProps {
  card: TarotCard | null;
  onClose: () => void;
}

const formatCardName = (name: string) =>
  name.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '');

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_FOLDER;

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isZoomed ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isZoomed, onClose]);

  if (!card || !CLOUD_NAME || !BASE_FOLDER) return null;

  const imageName = formatCardName(card.name);
  const cloudinarySrc = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${BASE_FOLDER}/${imageName}.webp`;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 sm:px-6 backdrop-blur-sm transition-all duration-300 ease-in-out">
        <div className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-6 max-w-md sm:max-w-lg w-full overflow-y-scroll max-h-[90vh] scrollbar-hide animate-fadeIn border-2 border-gray-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full text-2xl"
          >
            &times;
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center space-y-5">
            {/* Card Image Section */}
            <div
              className="relative w-40 sm:w-60 aspect-[2/3] cursor-zoom-in transition-transform hover:scale-105 border-2 border-gray-300 rounded-xl p-1 bg-neutral-950 shadow-inner"
              onClick={() => setIsZoomed(true)}
              title="Click to zoom"
            >
              <Image
                src={cloudinarySrc}
                alt={card.name}
                fill
                sizes="(max-width: 640px) 160px, 240px"
                className="rounded-lg object-contain"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
                }
              />
            </div>

            {/* Title */}
            <div className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{card.name}</h2>
              <p className="text-sm text-gray-500 italic">{card.arcana} Arcana</p>
            </div>

            {/* Keywords */}
            <div className="w-full border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Keywords</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {card.keywords.map((word, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-300 hover:shadow-md transition"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-left space-y-3">
              <p>
                <span className="font-semibold">Description:</span> {card.description}
              </p>
              {card.description_up && (
                <p>
                  <span className="font-semibold">Standard Meaning:</span> {card.description_up}
                </p>
              )}
              {card.description_rev && (
                <p>
                  <span className="font-semibold">Reversed Meaning:</span> {card.description_rev}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoomed Overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-60 bg-black bg-opacity-90 flex items-center justify-center cursor-zoom-out animate-fadeIn backdrop-blur"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-[80vw] sm:w-[50vw] max-h-[90vh] aspect-[2/3] transition-transform scale-100 hover:scale-105">
            <Image
              src={cloudinarySrc}
              alt={card.name}
              fill
              className="object-contain rounded-lg"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardModal;
