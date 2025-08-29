// 포트폴리오 섹션 컴포넌트
import { useState } from 'react';
import PortfolioCardList from './PortfolioCardList';
import CategoryFilter from './CategoryFilter';
import PartnerLogoSlider from "./PartnerLogoSlider";
import { portfolioProjects } from '../../data/portfolioData';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const filtered = portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* 포트폴리오 메인 섹션 */}
      <div className="pt-[0px] pl-16 pr-12 pb-24 bg-white">
        {/* Portfolio 페이지 제목 */}
        <div className="max-w-7xl mx-auto">
          {/* 검은 실선 */}
          <div style={{
            width: '110px',
            height: '3px',
            backgroundColor: '#000000',
            marginLeft: '50px',
            marginBottom: '20px'
          }}></div>
          
          {/* 메인 타이틀 */}
          <h2 style={{
            fontSize: '45px',
            fontWeight: '1100',
            marginBottom: '80px',
            color: '#1f2937',
            lineHeight: '1.2',
            letterSpacing: '-3.5px',
            marginLeft: '50px'
          }}>
            Portfolio
          </h2>
        </div>
        
        <div className="flex gap-16 items-start" style={{ marginLeft: '64px', marginTop: '-0px' }}>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex flex-col h-full items-start" style={{ marginLeft: '200px' }}>
            <div className="w-full">
              <PortfolioCardList projects={filtered} />
            </div>
          </div>
        </div>
      </div>

      {/* 파트너 로고 슬라이더 */}
      <div style={{ marginTop: "0px" }}>
        <PartnerLogoSlider />
      </div>
    </div>
  );
}

