import { portfolioCategories } from '../../data/portfolioData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-[40px] font-extrabold mb-6 text-black tracking-tight">Portfolio</h2>
      <div className="flex flex-col flex-1" style={{ rowGap: '18px' }}> {/* 버튼 별 간격 설정 칸 */}
        {portfolioCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`h-[64px] w-[280px] rounded-[999px] border text-[24px] font-bold transition-colors ${
                isSelected
                  ? "bg-white text-[#00A3E0] border-[#00A3E0] hover:bg-[#FFFFFF]"
                  : "bg-[#00A3E0] text-white border-transparent hover:bg-[#008CC0] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
