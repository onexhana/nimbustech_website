// 카테고리 필터 컴포넌트 (카테고리 버튼 목록)

import { portfolioCategories } from '../../data/portfolioData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col" style={{ marginTop: '30px' }}> {/* Portfolio 제목을 카드와 평행하게 배치 */}
        {/* ⬇️ 여기가 포트폴리오 위에 있는 검은 선입니다! ⬇️ */}
        <div 
          style={{ 
            width: '80px', 
            height: '2px', 
            backgroundColor: '#000000', // 이 부분이 검은색 선을 만드는 코드
            marginBottom: '0px'
          }}
        ></div>
        {/* ⬆️ 위 코드가 포트폴리오 제목 위의 검은 선입니다! ⬆️ */}
        <h2 className="text-[40px] font-extrabold mb-6 text-black tracking-tight" style={{ marginTop: '0px' }}>Portfolio</h2>
      </div>
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
                   target.style.border = '3px solid #00A3E0'; // 원래 파란색 테두리
                 } else {
                   target.style.backgroundColor = '#00A3E0';
                   target.style.color = 'white';
                   target.style.border = '3px solid transparent'; // 원래 투명 테두리
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
