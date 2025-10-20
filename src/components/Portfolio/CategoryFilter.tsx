// 카테고리 필터 컴포넌트 (카테고리 버튼 목록)

import { usePortfolioData } from '../../context/PortfolioContext';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { portfolioData } = usePortfolioData();
  
  // 관리자에서 설정한 필터 스타일 가져오기
  const getFilterStyle = (categoryName: string) => {
    const savedFilterStyles = localStorage.getItem('filterStyleSettings');
    if (savedFilterStyles) {
      try {
        const filterStyles = JSON.parse(savedFilterStyles);
        return filterStyles[categoryName];
      } catch (error) {
        console.error('필터 스타일 로드 실패:', error);
      }
    }
    
    // 기본값 반환 (현재 사이트 색상)
    return {
      backgroundColor: "#00A3E0",
      textColor: "#ffffff",
      borderColor: "#00A3E0",
      borderWidth: 1,
      fontSize: 25,
      fontWeight: 500,
      borderRadius: 999,
      padding: "12px 24px",
      hoverBackgroundColor: "#008CC0",
      hoverTextColor: "#ffffff"
    };
  };
  
  return (
    <div className="flex flex-col h-full">

      <div className="flex flex-col flex-1" style={{ rowGap: '18px', marginTop: '0px' }}> {/* 버튼 별 간격 설정 칸 */}
        {portfolioData.categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const filterStyle = getFilterStyle(cat);
          
          return (
                         <button
               key={cat}
               onClick={() => onCategoryChange(cat)}
               style={{
                 height: '64px',
                 width: '280px',
                 borderRadius: `${filterStyle.borderRadius || 999}px`,
                 border: isSelected ? `${(filterStyle.borderWidth || 1) + 2}px solid ${filterStyle.borderColor}` : `${filterStyle.borderWidth || 1}px solid transparent`,
                fontSize: `${filterStyle.fontSize || 25}px`,
                fontWeight: filterStyle.fontWeight || 500,
                 transition: 'all 0.3s ease',
                 textAlign: 'left',
                 paddingLeft: '32px',
                 backgroundColor: isSelected ? 'white' : filterStyle.backgroundColor,
                 color: isSelected ? filterStyle.borderColor : filterStyle.textColor,
                 cursor: 'pointer'
               }}
               onMouseEnter={(e) => {
                 const target = e.target as HTMLButtonElement;
                 if (isSelected) {
                   target.style.backgroundColor = '#FFFFFF';
                   target.style.border = `${(filterStyle.borderWidth || 1) + 2}px solid ${filterStyle.borderColor}`;
                   target.style.color = filterStyle.borderColor;
                 } else {
                   target.style.backgroundColor = filterStyle.hoverBackgroundColor || filterStyle.borderColor;
                   target.style.color = filterStyle.hoverTextColor || 'white';
                   target.style.border = `${filterStyle.borderWidth || 1}px solid ${filterStyle.borderColor}`;
                 }
               }}
               onMouseLeave={(e) => {
                 const target = e.target as HTMLButtonElement;
                 if (isSelected) {
                   target.style.backgroundColor = 'white';
                   target.style.border = `${(filterStyle.borderWidth || 1) + 2}px solid ${filterStyle.borderColor}`;
                   target.style.color = filterStyle.borderColor;
                 } else {
                   target.style.backgroundColor = filterStyle.backgroundColor;
                   target.style.color = filterStyle.textColor;
                   target.style.border = `${filterStyle.borderWidth || 1}px solid transparent`;
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
