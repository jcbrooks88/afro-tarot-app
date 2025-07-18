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

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_MOON_FOLDER;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${BASE_FOLDER}`;

const MoonItem: React.FC<MoonItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);
  const imageUrl = `${BASE_URL}/${imageName}.webp`;
  const fallbackUrl = `/images/fallback.webp`;

  return (
    <div
      onClick={onPress}
      className="flex flex-col items-center justify-start p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer max-w-xs mx-auto"
    >
      <div className="relative w-40 sm:w-48 aspect-[2/3] mb-4">
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
    </div>
  );
};

export default MoonItem;
