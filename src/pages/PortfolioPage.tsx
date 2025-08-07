import React, { useState } from "react";

// 🔹 산업군 필터 컴포넌트 (좌측 사이드바)
import FilterBar from "@/components/Portfolio/FilterBar";

// 🔹 프로젝트 카드 슬라이드 컴포넌트
import PortfolioCardList from "@/components/Portfolio/PortfolioCardList";

// 🔹 협력사 로고 그리드 컴포넌트
import PartnerGrid from "@/components/Portfolio/PartnerGrid";

// 🔹 더미 프로젝트 데이터 (향후 API 대체 예정)
const dummyProjects = [
  {
    id: 1,
    title: "스타트업 A사의 사용자 맞춤형 서비스 플랫폼 개발",
    description: "전자정부 고도화 프로젝트 기반",
    category: "공공",
    image: "/images/portfolio/gov1.jpg",
  },
  {
    id: 2,
    title: "국방 빅데이터 시스템 설계",
    description: "데이터 통합 플랫폼",
    category: "공공",
    image: "/images/portfolio/gov2.jpg",
  },
  {
    id: 3,
    title: "AI 보험 자동화 시스템 구축",
    description: "보험 업무 최적화",
    category: "금융",
    image: "/images/portfolio/fin1.jpg",
  },
  {
    id: 4,
    title: "제조업체 스마트 팩토리 전환",
    description: "IoT 기반 자동화",
    category: "제조",
    image: "/images/portfolio/manu1.jpg",
  },
];

const PortfolioPage = () => {
  // 🔸 현재 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("공공");

  // 🔸 선택된 카테고리에 따라 프로젝트 필터링
  const filtered = dummyProjects.filter(
    (p) => !selectedCategory || p.category === selectedCategory
  );

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-20">
        {/* 🔹 섹션 제목 */}
        <h2 className="text-[28px] font-extrabold tracking-tight text-[#0168b7] mb-6">
          Portfolio
        </h2>

        {/* 🔸 좌우 2단 레이아웃: 필터 + 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-8">
          {/* 🔹 좌측 필터 영역 (고정 너비 + sticky) */}
          <aside className="md:sticky md:top-20 h-fit">
            <FilterBar
              categories={["공공", "금융", "일반", "제조", "유통", "기타"]}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </aside>

          {/* 🔹 우측 콘텐츠 영역 */}
          <main>
            {/* 🔸 선택된 카테고리 제목 */}
            <h3 className="text-2xl font-bold mb-5">{selectedCategory}</h3>

            {/* 🔸 필터링된 카드 슬라이드 출력 */}
            <PortfolioCardList
              category={selectedCategory}
              projects={filtered}
            />

            {/* 🔸 협력사 로고 그리드 표시 */}
            <div className="mt-16">
              <PartnerGrid />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
