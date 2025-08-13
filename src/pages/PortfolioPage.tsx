import { useState } from 'react';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import PortfolioSection from '../components/Portfolio/PortfolioSection';

const categories = ["공공", "금융", "일반", "제조", "유통", "기타"];

const dummyProjects = [
  { id: 1, title: "프로젝트 1", description: "설명 텍스트", category: "공공" },
  { id: 2, title: "프로젝트 2", description: "설명 텍스트", category: "금융" },
  { id: 3, title: "프로젝트 3", description: "설명 텍스트", category: "일반" },
  { id: 4, title: "프로젝트 4", description: "설명 텍스트", category: "제조" },
  { id: 5, title: "프로젝트 5", description: "설명 텍스트", category: "유통" },
  { id: 6, title: "프로젝트 6", description: "설명 텍스트", category: "기타" },
  { id: 99, title: "공공 테스트 프로젝트", description: "공공용 카드입니다", category: "공공" },
];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const filtered = dummyProjects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <section className="pt-[120px] pl-16 pr-12 pb-24 bg-white">
        <h2 className="text-[40px] font-extrabold mb-6 text-black tracking-tight" style={{ marginLeft: '64px' }}>Portfolio</h2>

        <div className="flex gap-16">
          <aside className="w-[280px] shrink-0" style  ={{ marginLeft: '64px' }}>
            <div className="flex flex-col" style={{ rowGap: '18px' }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-[64px] w-full rounded-[999px] border text-[20px] font-bold transition-colors ${
                      isSelected
                        ? "bg-white text-[#0168b7] border-[#0168b7]"
                        : "bg-[#0168b7] text-white border-transparent hover:bg-[#055c9a]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="flex-1">
            <h3 className="text-[44px] font-extrabold mb-8">{selectedCategory}</h3>
            <PortfolioCardList projects={filtered} />
          </div>
        </div>
      </section>

      <PortfolioSection />
    </>
  );
};

export default PortfolioPage;