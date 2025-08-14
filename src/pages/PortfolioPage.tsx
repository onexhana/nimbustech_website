import { useState } from 'react';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import { portfolioProjects, portfolioCategories } from '../data/portfolioData';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const filtered = portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <section className="pt-[100px] pl-16 pr-12 pb-24 bg-white">
        <div className="flex gap-16 items-start" style={{ marginLeft: '64px' }}>
          <div className="flex flex-col h-full">
            <h2 className="text-[40px] font-extrabold mb-6 text-black tracking-tight">Portfolio</h2>
            <div className="flex flex-col flex-1" style={{ rowGap: '18px' }}> {/* 버튼 별 간격 설정 칸 */} 
              {portfolioCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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