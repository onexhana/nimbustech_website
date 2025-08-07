// src/components/About/AboutSection.tsx
import { useState, useEffect } from 'react';
import AboutTab from './AboutTab';
import AboutCard from './AboutCard';

const TAB_LIST = ["ITO", "클라우드", "RPA", "솔루션"];

const TAB_CONTENTS: Record<string, { title: string; description: string[] }[]> = {
  ITO: [
    {
      title: "전담 Manager 제도 운영",
      description: [
        "전담 Manager 제도를 도입하여 체계적인",
        "관리를 통해 고객사와 개발자의 신뢰를",
        "기반으로 프로젝트 성공 유도"
      ],
    },
    {
      title: "모두에게 안착할 드라이브 서비스",
      description: [
        "1. 학술을 지키는 서비스",
        "2. 협동 인권도 소츠의 여가는 서비스",
        "3. 투명하고 간성한 소통을 하는 서비스"
      ],
    },
    {
      title: "다가서는 서비스",
      description: [
        "1. 참여하는 서비스를 지향하는 조직",
        "2. 인직 제공하는 서비스"
      ],
    },
  ],
  클라우드: [
    {
      title: "G-클라우드 운영 경험",
      description: [
        "공공 및 민간 클라우드 인프라를",
        "안정적으로 운영한 다년간의 경험 보유"
      ],
    },
    {
      title: "확장 가능한 인프라",
      description: [
        "1. 자동 스케일링 지원",
        "2. 고가용성 보장",
        "3. 24/7 모니터링 시스템"
      ],
    },
    {
      title: "보안 강화 서비스",
      description: [
        "1. 데이터 암호화",
        "2. 접근 권한 관리"
      ],
    },
  ],
  RPA: [
    {
      title: "삼성SDS Brity RPA 파트너",
      description: [
        "다양한 고객사에 RPA 구축 및",
        "자동화 적용 경험 보유"
      ],
    },
    {
      title: "프로세스 자동화",
      description: [
        "1. 반복 업무 자동화",
        "2. 업무 효율성 극대화",
        "3. 에러율 최소화"
      ],
    },
    {
      title: "맞춤형 솔루션",
      description: [
        "1. 고객 요구사항 분석",
        "2. 최적화된 자동화 설계"
      ],
    },
  ],
  솔루션: [
    {
      title: "Multiverse Component",
      description: [
        "대규모 시스템 통합을 위한",
        "커스터마이징 솔루션 제공"
      ],
    },
    {
      title: "통합 시스템 구축",
      description: [
        "1. 레거시 시스템 연동",
        "2. API 기반 통합",
        "3. 데이터 마이그레이션"
      ],
    },
    {
      title: "기술 컨설팅",
      description: [
        "1. 아키텍처 설계",
        "2. 기술 로드맵 수립"
      ],
    },
  ],
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("ITO");
  const [cardsVisible, setCardsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 탭 변경 시 카드 애니메이션 초기화
    setCardsVisible(false);
    const timer = setTimeout(() => {
      setCardsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0); // 탭 변경 시 슬라이드 초기화
  };

  const nextSlide = () => {
    const maxSlides = Math.ceil(TAB_CONTENTS[activeTab].length / 3) - 1;
    setCurrentSlide(prev => prev < maxSlides ? prev + 1 : 0);
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(TAB_CONTENTS[activeTab].length / 3) - 1;
    setCurrentSlide(prev => prev > 0 ? prev - 1 : maxSlides);
  };



  return (
    <div className="w-full px-6 py-12 bg-white" style={{ paddingTop: '120px' }}>
      {/* 메인 타이틀 */}
      <div className="max-w-7xl mx-auto">
        {/* 검은 실선 */}
        <div style={{
          width: '110px',
          height: '3px',
          backgroundColor: '#000000',
          marginLeft: '50px',
          marginBottom: '20px'
        }}></div>
        
        <h2 style={{
          fontSize: '45px',
          fontWeight: '1100',
          marginBottom: '32px',
          color: '#1f2937',
          lineHeight: '1.6',
          letterSpacing: '-3.5px',
          marginLeft: '50px'
        }}>
          신뢰성 높은 DT서비스를 제공하여<br />
          지속적인 고객 성공을 리딩합니다
        </h2>

        {/* 탭 컴포넌트 */}
        <AboutTab 
          tabs={TAB_LIST}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* 카드 영역 */}
        <div className="flex items-start gap-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {/* 카드 컨테이너 - 3개 카드 가로 배치 */}
          <div className="flex gap-4 flex-1" style={{ display: 'flex', gap: '32px', flex: '1' }}>
            {TAB_CONTENTS[activeTab].map((card, idx) => (
              <AboutCard
                key={`${activeTab}-${idx}`}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          {/* 우측 화살표 버튼 */}
          <button 
            onClick={nextSlide}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold px-2"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9ca3af',
              fontSize: '24px',
              fontWeight: 'bold',
              padding: '0 8px',
              alignSelf: 'center'
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
