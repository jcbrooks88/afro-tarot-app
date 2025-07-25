import React, { useState, useEffect } from 'react';
import rawData from '../../data/tarot_cards.json';
import { TarotCard } from '@/types/TarotCard';
import CardItem from './CardItem';
import CardModal from './CardModal';
import FilterToggle from './FilterToggle';

type FilterOption = 'All' | 'Major' | 'Minor' | 'Cups' | 'Pentacles' | 'Swords' | 'Wands';

const majorArcanaOrder = [
  'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
  'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
  'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
  'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
];

const minorRankOrder = [
  'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Page', 'Knight', 'Queen', 'King'
];

const suitOrder = ['Cups', 'Pentacles', 'Swords', 'Wands'];

const CardLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const tarotData = rawData as TarotCard[];

  const getSortIndex = (card: TarotCard): number => {
    if (card.arcana === 'Major') {
      const index = majorArcanaOrder.indexOf(card.name);
      return index !== -1 ? index : 9999;
    }

    const suit = card.suit ?? '';
    const nameParts = card.name.split(' of ');
    const rank = nameParts[0];

    const suitIndex = suitOrder.indexOf(suit);
    const rankIndex = minorRankOrder.indexOf(rank);

    return (suitIndex !== -1 && rankIndex !== -1)
      ? suitIndex * 100 + rankIndex
      : 9999;
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
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

      const sorted = [...filtered].sort((a, b) => getSortIndex(a) - getSortIndex(b));
      setFilteredCards(sorted);
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, filter, tarotData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalVisible(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardPress = (card: TarotCard) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilter('All');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] rounded-2xl border border-gray-200 px-10 py-12 shadow-md mx-auto">
      {/* Toggle Filters on Mobile */}
      <div className="sm:hidden flex justify-end mb-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="text-sm text-burgundy border border-burgundy px-3 py-1 rounded-lg"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter + Search Section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showFilters ? 'max-h-screen mb-4' : 'max-h-0 sm:max-h-full mb-0'
        } sm:mb-6`}
      >
        <div className="bg-[#F4F1EC] sm:flex sm:items-center sm:justify-between gap-3 space-y-3 sm:space-y-0">
          {/* Filter Toggle */}
          <div className="flex justify-center sm:justify-start">
            <FilterToggle selected={filter} onSelect={setFilter} />
          </div>

          {/* Reset Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={handleReset}
              className="text-sm bg-burgundy text-white px-3 py-1 rounded-lg hover:bg-opacity-90 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            aria-label="Search tarot cards"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-gray-50 border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-burgundy transition"
          />
        </div>
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
