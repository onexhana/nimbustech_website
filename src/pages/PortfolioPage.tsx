// src/pages/PortfolioPage.tsx
import React, { useState } from 'react';
import FilterBar from '../components/common/FilterBar';

const categories = ['공공', '금융', '일반', '제조', '유통', '기타'];

const dummyProjects = Array(6).fill(null).map((_, i) => ({
  id: i,
  title: `프로젝트 ${i + 1}`,
  description: `설명 텍스트`,
}));

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="p-6">
      {/* ✅ 카테고리 필터 컴포넌트 */}
      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* ✅ 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyProjects.map((project) => (
          <div key={project.id} className="bg-white shadow-md p-4 rounded-xl">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
