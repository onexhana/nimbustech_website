// 카테고리 필터 컴포넌트 (카테고리 버튼 목록)

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
               style={{
                 height: '64px',
                 width: '280px',
                 borderRadius: '999px',
                 border: isSelected ? '1px solid #00A3E0' : '1px solid transparent',
                 fontSize: '25px',
                 fontWeight: '500',
                 transition: 'all 0.3s ease',
                 textAlign: 'left',
                 paddingLeft: '32px',
                 backgroundColor: isSelected ? 'white' : '#00A3E0',
                 color: isSelected ? '#00A3E0' : 'white',
                 cursor: 'pointer'
               }}
               onMouseEnter={(e) => {
                 if (isSelected) {
                   e.target.style.backgroundColor = '#FFFFFF';
                 } else {
                   e.target.style.backgroundColor = '#008CC0';
                   e.target.style.color = 'white';
                 }
               }}
               onMouseLeave={(e) => {
                 if (isSelected) {
                   e.target.style.backgroundColor = 'white';
                 } else {
                   e.target.style.backgroundColor = '#00A3E0';
                   e.target.style.color = 'white';
                 }
               }}
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
