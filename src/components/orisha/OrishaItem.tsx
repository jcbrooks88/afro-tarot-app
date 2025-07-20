import React from 'react';
import Image from 'next/image';
import { OrishaCard } from '@/types/OrishaCard';

const formatCardName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

interface CardItemProps {
  card: OrishaCard;
  onPress: () => void;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_FOLDER;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${BASE_FOLDER}`;

const OrishaCardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);
  const imageUrl = `${BASE_URL}/${imageName}.png`;
  const fallbackUrl = `/images/fallback.webp`;

  return (
    <div
      onClick={onPress}
      className="flex flex-col items-center justify-start p-4 sm:p-5 rounded-2xl bg-gray-50 shadow-md cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
    >
      {/* Image Container */}
      <div className="w-full max-w-xs aspect-[2/3] mb-4">
        <Image
          src={imageUrl}
          alt={card.name}
          width={320}
          height={480}
          className="rounded-xl object-contain w-full h-full"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
        />
      </div>

      {/* Card Text */}
      <h3 className="text-base sm:text-lg font-semibold text-burgundy text-center line-clamp-2">
        {card.name}
      </h3>

      <h1 className="text-sm sm:text-base font-bold text-gray-800 text-center line-clamp-2">
        {card.pronunciation}
      </h1>

      <p className="text-xs sm:text-sm text-gray-500 text-center line-clamp-2">
        {card.zodiac_sign}
        <br />
        {card.zodiac_dates}
      </p>
    </div>
  );
};

export default OrishaCardItem;
