import React from "react";

type FilterBarProps = {
  selected: string;
  onSelect: (category: string) => void;
};

const categories = ["공공", "금융", "일반", "제조", "유통", "기타"];

const FilterBar = ({ selected, onSelect }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {categories.map((cat) => {
        const isSelected = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
              ${isSelected 
                ? "bg-white text-[#0168b7] border-[#0168b7]" 
                : "bg-[#0168b7] text-white border-transparent hover:bg-blue-700"}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;