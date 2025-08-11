import React, { useState } from 'react';
import FilterBar from '@/components/Portfolio/FilterBar';
import PortfolioCardList from '@/components/Portfolio/PortfolioCardList'; // 새로 추가한 슬라이드 카드 컴포넌트
import PortfolioSection from '@/components/Portfolio/PortfolioSection';

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

  const filtered = dummyProjects.filter(
    (p) => selectedCategory === null || p.category === selectedCategory
  );

  return (
    <>
      <section className="pt-10 px-6 pb-16 bg-white">
        {/* 섹션 제목 */}
        <h2 className="text-2xl font-bold text-center mb-8 text-[#0168b7]">포트폴리오</h2>

        {/* 필터 버튼 */}
        <FilterBar selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* 슬라이드 카드 리스트 */}
        <div className="mt-6">
          <PortfolioCardList projects={filtered} />
        </div>
      </section>

      {/* 하단 협력사 로고 슬라이더 섹션 */}
      <PortfolioSection />
    </>
  );
};

export default PortfolioPage;