// src/components/FilterBar.tsx
import React from 'react';

type FilterBarProps = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string) => void;
};

const FilterBar = ({ categories, selected, onSelect }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border transition-all 
            ${selected === cat
              ? 'bg-white text-blue-600 border-blue-600'
              : 'bg-blue-600 text-white border-transparent'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
