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
      className="flex flex-col items-center justify-start p-4 m-4 rounded-2xl bg-white shadow-md cursor-pointer hover:shadow-xl transition-shadow"
    >
      <Image
        src={`/images/${imageName}.webp`}
        alt={card.name}
        width={200}
        height={300}
        style={{ height: 'auto' }}
        onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')}
        className="rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 text-center">{card.name}</h3>
      <p className="text-sm text-gray-500 text-center">{card.keywords.join(', ')}</p>
    </div>
  );
};

export default CardItem;
