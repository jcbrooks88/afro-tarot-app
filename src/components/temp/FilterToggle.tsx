import React from 'react';

export type FilterOption = 'All' | 'Major' | 'Minor' | 'Cups' | 'Pentacles' | 'Swords' | 'Wands';

interface FilterToggleProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
}

const filters: FilterOption[] = [
  'All',
  'Major',
  'Minor',
  'Cups',
  'Pentacles',
  'Swords',
  'Wands',
];

const FilterToggle: React.FC<FilterToggleProps> = ({ selected, onSelect }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 px-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onSelect(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm border
              ${
                selected === filter
                  ? 'bg-[#a54a4a] border-[#8c3030] text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterToggle;
