import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import CardModal from './CardModal';
import FilterToggle from './FilterToggle';
import rawData from '../data/tarot_cards.json';
import { TarotCard } from '@/types/TarotCard';

type FilterOption = 'All' | 'Major' | 'Minor' | 'Cups' | 'Pentacles' | 'Swords' | 'Wands';

const CardLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const tarotData = rawData as TarotCard[];

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = tarotData.filter((card: TarotCard) => {
      const matchesSearch =
        card.name.toLowerCase().includes(query) ||
        card.keywords.some((kw) => kw.toLowerCase().includes(query));

      const matchesFilter =
        filter === 'All' ||
        card.arcana === filter ||
        (card.arcana === 'Minor' && card.suit?.toLowerCase() === filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });

    setFilteredCards(filtered);
  }, [searchQuery, filter, tarotData]);

  const handleCardPress = (card: TarotCard) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] px-4 sm:px-6 py-6">
      {/* Filter Toggle */}
      <div className="sticky top-0 bg-[#F4F1EC] z-10 py-3 sm:py-4">
        <FilterToggle selected={filter} onSelect={setFilter} />
      </div>

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        />
      </div>

      {/* Card Grid */}
      {filteredCards.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 italic">
          No cards match your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-20">
          {filteredCards.map((card) => (
            <CardItem key={card.name} card={card} onPress={() => handleCardPress(card)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalVisible && selectedCard && (
        <CardModal card={selectedCard} onClose={() => setModalVisible(false)} />
      )}
    </div>
  );
};

export default CardLibrary;
