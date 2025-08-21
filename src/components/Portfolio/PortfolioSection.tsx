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
      <div className="pt-[100px] pl-16 pr-12 pb-24 bg-white">
        <div className="flex items-start" style={{ marginLeft: '64px' }}>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex flex-col h-full items-start" style={{ marginLeft: '200px' }}>
            <h3 className="text-[36px] font-extrabold mb-6 text-black tracking-tight">{selectedCategory}</h3>
            <div className="w-full">
              <PortfolioCardList projects={filtered} />
            </div>
          </div>
        </div>
      </div>

      {/* 파트너 로고 슬라이더 */}
      <div style={{ marginTop: "50px" }}>
        <PartnerLogoSlider />
      </div>
    </div>
  );
}

