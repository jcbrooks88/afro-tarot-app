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

const CardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);

  return (
    <div
      onClick={onPress}
      className="flex flex-col items-center justify-start p-3 sm:p-4 rounded-2xl bg-white shadow-md cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative w-32 sm:w-44 aspect-[2/3] mb-3 sm:mb-4">
        <Image
          src={`/images/${imageName}.webp`}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 128px, 176px"
          className="object-cover rounded-lg"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
          }
        />
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center line-clamp-2">
        {card.name}
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 text-center line-clamp-2">
        {card.keywords.join(', ')}
      </p>
    </div>
  );
};

export default CardItem;
