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
                 const target = e.target as HTMLButtonElement;
                 if (isSelected) {
                   target.style.backgroundColor = '#FFFFFF';
                   target.style.border = '1px solid #00A3E0'; // 호버 시에도 파란색 테두리 유지
                 } else {
                   target.style.backgroundColor = '#008CC0';
                   target.style.color = 'white';
                   target.style.border = '1px solid #00A3E0'; // 호버 시 파란색 테두리 추가
                 }
               }}
               onMouseLeave={(e) => {
                 const target = e.target as HTMLButtonElement;
                 if (isSelected) {
                   target.style.backgroundColor = 'white';
                   target.style.border = '1px solid #00A3E0'; // 원래 파란색 테두리
                 } else {
                   target.style.backgroundColor = '#00A3E0';
                   target.style.color = 'white';
                   target.style.border = '1px solid transparent'; // 원래 투명 테두리
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
