<<<<<<< HEAD
// src/pages/AboutPage.tsx
// ========================================
// ABOUT 페이지 메인 페이지 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: About 섹션 렌더링
// 수정 사항: 없음 (기본 구조 유지)
// ========================================
// AboutSection 컴포넌트: About 페이지의 메인 섹션 컴포넌트를 가져옵니다.
import AboutSection from '../components/About/AboutSection';

// AboutPage 컴포넌트: 라우터에 의해 호출되는 About 페이지 최상위 컴포넌트입니다.
// AboutSection을 포함하여 페이지의 전체 레이아웃을 렌더링합니다.
export default function AboutPage() {
  return (
    <>
      <div className="about-page">
        <AboutSection />
      </div>
      <style>{`
        .about-page ~ footer {
          display: none;
        }
      `}</style>
    </>
=======
// components/About/ServiceTabs.tsx
import { useState } from "react";

const TAB_LIST = ["ITO", "클라우드", "RPA", "솔루션"];

const TAB_CONTENTS: Record<string, { title: string; description: string[] }[]> = {
  ITO: [
    {
      title: "전담 Manager 제도 운영",
      description: [
        "전담 Manager 제도를 도입하여 체계적인 관리를 통해 고객사와 개발자의 신뢰를 기반으로 프로젝트 성공 유도"
      ],
    },
  ],
  클라우드: [
    {
      title: "G-클라우드 운영 경험",
      description: [
        "공공 및 민간 클라우드 인프라를 안정적으로 운영한 다년간의 경험 보유"
      ],
    },
  ],
  RPA: [
    {
      title: "삼성SDS Brity RPA 파트너",
      description: [
        "다양한 고객사에 RPA 구축 및 자동화 적용 경험 보유"
      ],
    },
  ],
  솔루션: [
    {
      title: "Multiverse Component",
      description: [
        "대규모 시스템 통합을 위한 커스터마이징 솔루션 제공"
      ],
    },
  ],
};

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState("ITO");

  return (
    <div className="w-full px-4 py-10 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">
        신뢰성 높은 DT서비스를 제공하여 <br /> 지속적인 고객 성공을 리딩합니다
      </h2>

      <div className="flex gap-2 mb-6">
        {TAB_LIST.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TAB_CONTENTS[activeTab].map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 border border-gray-200"
          >
            <h3 className="font-semibold text-blue-600 mb-2">{card.title}</h3>
            <ul className="text-sm text-gray-800 whitespace-pre-line">
              {card.description.map((line, i) => (
                <li key={i}>• {line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
>>>>>>> feat/sumin-portfolio
  );
}
