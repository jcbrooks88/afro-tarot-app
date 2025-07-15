import React from 'react';
import Image from 'next/image';

type MoonCard = {
  name: string;
  meaning?: string;
};

type MoonItemProps = {
  card: MoonCard;
  onPress?: () => void;
};

const formatCardName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const MoonItem: React.FC<MoonItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);

  return (
    <div
      onClick={onPress}
      className="flex flex-col items-center justify-start p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow cursor-pointer max-w-xs mx-auto"
    >
      <div className="relative w-40 sm:w-48 aspect-[2/3] mb-4">
        <Image
          src={`/images/moon-phases/${imageName}.png`}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 160px, 192px"
          className="object-cover rounded-xl border border-gray-200 dark:border-gray-700"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src = '/images/fallback.webp')
          }
        />
      </div>
    </div>
  );
};

export default MoonItem;
