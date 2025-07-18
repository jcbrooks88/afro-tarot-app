import React from 'react';
import Image from 'next/image';
import { TarotCard } from '@/types/TarotCard';

const formatCardName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

interface CardItemProps {
  card: TarotCard;
  onPress: () => void;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_FOLDER;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${BASE_FOLDER}`;

const CardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);
  const imageUrl = `${BASE_URL}/${imageName}.webp`;
  const fallbackUrl = `/images/fallback.webp`;

  return (
    <div
      onClick={onPress}
      className="flex flex-col items-center justify-start p-3 sm:p-4 rounded-2xl bg-gray-50 shadow-md cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative w-32 sm:w-44 aspect-[2/3] mb-3 sm:mb-4">
        <Image
          src={imageUrl}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 128px, 176px"
          className="object-contain rounded-lg"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
        />
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-burgundy text-center line-clamp-2">
        {card.name}
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 text-center line-clamp-2">
        {card.keywords.join(', ')}
        <br />
        {card.meaning_up}
        <br />
        {card.meaning_rev}
      </p>
    </div>
  );
};

export default CardItem;
