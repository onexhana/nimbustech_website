import { useState } from "react";
import FilterBar from "@/components/Portfolio/FilterBar";
import PartnerSlider from "@/components/Portfolio/PartnerSlider";
import ProjectSlider from "@/components/Portfolio/ProjectSlider";

const dummyProjects = [
  {
    id: 1,
    title: "스타트업 A사의 사용자 맞춤형 서비스 플랫폼 개발",
    description:
      "전자정부 고도화 프로젝트 기반으로 사용자 경험을 최적화한 맞춤형 서비스 플랫폼을 구축했습니다.",
    category: "공공",
    image: "/images/portfolio/gonggong1.png",
  },
  {
    id: 2,
    title: "국방 빅데이터 시스템 설계",
    description:
      "대용량 데이터 처리와 실시간 분석이 가능한 국방 빅데이터 시스템을 설계 및 구축했습니다.",
    category: "공공",
    image: "/images/portfolio/gonggong2.png",
  },
  {
    id: 3,
    title: "AI 보험 자동화 시스템 구축",
    description: "머신러닝 기반의 보험 업무 자동화 시스템으로 업무 효율성을 크게 향상시켰습니다.",
    category: "금융",
    image: "/images/portfolio/gonggong1.png",
  },
  {
    id: 4,
    title: "제조업체 스마트 팩토리 전환",
    description:
      "IoT 센서와 AI 분석을 통한 스마트 팩토리 구축으로 생산성과 품질을 동시에 개선했습니다.",
    category: "제조",
    image: "/images/portfolio/gonggong2.png",
  },
];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");

  const filtered = dummyProjects.filter(
    (p) => !selectedCategory || p.category === selectedCategory
  );

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-20">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-left">Portfolio</h2>
          <div className="w-[40px] h-[2px] bg-black mt-1" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="basis-1/4 px-4 w-full md:sticky md:top-20 h-fit shrink-0">
            <FilterBar
              categories={["공공", "금융", "일반", "제조", "유통", "기타"]}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </aside>

          <main className="basis-3/4 w-full min-w-0">
            <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
            <ProjectSlider projects={filtered} />

            <div className="mt-20">
              <PartnerSlider />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
