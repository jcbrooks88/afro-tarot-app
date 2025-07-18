import React, { useState, useEffect } from 'react';
import rawData from '../../data/orisha_cards.json';
import { OrishaCard } from '@/types/OrishaCard';
import OrishaCardItem from './OrishaItem';
import OrishaCardModal from './OrishaModal';

const OrishaCardLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState<OrishaCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<OrishaCard | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const tarotData = rawData as OrishaCard[];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchQuery.toLowerCase();

      const filtered = tarotData.filter((card) =>
        card.name.toLowerCase().includes(query)
      );

      const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredCards(sorted);
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, tarotData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalVisible(false);
        setSelectedCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardPress = (card: OrishaCard) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] rounded-2xl border border-gray-200 px-4 sm:px-10 py-10 sm:py-12 shadow-md mx-auto max-w-screen-xl">
      {/* Search + Reset Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8">
        <input
          type="text"
          aria-label="Search Orisha cards"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-xl border bg-gray-50 border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-burgundy transition"
        />
        <button
          onClick={handleReset}
          className="text-sm bg-burgundy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition self-start sm:self-auto"
        >
          Reset Search
        </button>
      </div>

      {/* Card Grid */}
      {filteredCards.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 italic">
          No cards match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 pb-24">
          {filteredCards.map((card) => (
            <OrishaCardItem
              key={card.name}
              card={card}
              onPress={() => handleCardPress(card)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalVisible && selectedCard && (
        <OrishaCardModal
          card={selectedCard}
          onClose={() => {
            setModalVisible(false);
            setSelectedCard(null);
          }}
        />
      )}
    </div>
  );
};

export default OrishaCardLibrary;
