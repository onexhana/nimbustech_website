import { useState } from 'react';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import CategoryFilter from '../components/Portfolio/CategoryFilter';
import { portfolioProjects } from '../data/portfolioData';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const filtered = portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <section className="pt-[100px] pl-16 pr-12 pb-24 bg-white">
        <div className="flex gap-16 items-start" style={{ marginLeft: '64px' }}>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex-1 flex flex-col h-full" style={{ marginLeft: '300px' }}> {/* 필터와 카드섹션 사이 여백*/} 
            <h3 className="text-[40px] font-extrabold mb-6 text-black tracking-tight">{selectedCategory}</h3>
            <div className="flex-1">
              <PortfolioCardList projects={filtered} />
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection />
    </>
  );
};

export default PortfolioPage;