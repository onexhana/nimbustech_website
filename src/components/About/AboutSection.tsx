// src/components/About/AboutSection.tsx
// ========================================
// ABOUT 페이지 메인 섹션 컴포넌트
// 담당자: About 페이지 팀
// 
// 📋 주요 기능:
// - 4개 탭 네비게이션 (ITO, 클라우드, RPA, 솔루션)
// - 각 탭별 6개 카드 데이터 (총 24개 카드)
// - 3개씩 보여주는 슬라이더 기능
// - 좌우 화살표 버튼 네비게이션
// - 하단 인디케이터 (점 표시)
// - 카드 등장 애니메이션 효과
// - 카드 호버 효과
// 
// 🎨 스타일링:
// - 카드 크기: 380px × 200px (고정)
// - 카드 간격: 30px
// - 화면 좌우 여백: 50px
// - 그림자 효과 및 둥근 모서리
// 
// 🚀 애니메이션:
// - 카드 순차 등장 (0.15초 간격)
// - 카드 호버 시 위로 8px 이동
// - 인디케이터 모양 변화 (점 → 막대)
// 
// ⚠️ 주의사항:
// - 다른 팀과 merge 시 이 파일들만 수정됨
// - AboutSection, AboutCard, AboutTab 등 About/ 폴더 전체
// ========================================
import { useState } from 'react';
import AboutTab from './AboutTab';
import AboutCard from './AboutCard'; // 효과 버전 (호버 애니메이션 활성화)
//import AboutCard from './AboutCardNoEffect'; // 무효화 버전 (호버 효과 없음)
const noEffect = AboutCard.name === 'AboutCardNoEffect';

// ========================================
// 탭 및 카드 데이터 (각 섹션별 6개씩 확장됨)
// ========================================
// 탭 리스트 정의: 네비게이션에 표시될 탭명을 배열로 지정합니다.
const TAB_LIST = ["ITO", "클라우드", "RPA", "솔루션"];

// 각 탭별 카드 데이터 정의: title(제목)과 description(내용 배열) 형태로 구성된 객체입니다.
const TAB_CONTENTS: Record<string, { title: string; description: string[] }[]> = {
  ITO: [
    {
      title: "풍부한 인재 자원",
      description: [
        "5,500명 이상의 IT 전문가",
        "데이터베이스 보유"
      ],
    },
    {
      title: "검증된 신뢰성",
      description: [
        "주요 파트너사와 8년 이상의",
        "지속적 협력 관계"
      ],
    },
    {
      title: "체계적 인재 매칭",
      description: [
        "CRM 기반 전담 매니저 배치로",
        "최적화된 인재 선별"
      ],
    },
  ],
  클라우드: [
    {
      title: "전략적 파트너십",
      description: [
        "클라우드 MSP 전문기업 및 종합 IT",
        "인프라 솔루션 기업과의 협력 체계"
      ],
    },
    {
      title: "공공 클라우드 운영 실적",
      description: [
        "국가정보자원관리원 G-클라우드",
        "구축 및 운영 5년 이상 지속",
      ],
    },
    {
      title: "민간 클라우드 인프라 관리",
      description: [
        "메트라이프생명, 한국투자증권,",
        "DB손해보험 인프라 운영 중"
      ],
    },
  ],
  RPA: [
    {
      title: "삼성SDS Brity RPA 파트너",
      description: [
        "국내 대표 RPA 솔루션 Brity의",
        "공인 공급업체"
      ],
    },
    {
      title: "RPA 프로젝트 수행 이력",
      description: [
        "1. 반복 업무 자동화",
        "2. 업무 효율성 극대화",
        "3. 에러율 최소화"
      ],
    },
    {
      title: "RPA 전문 인력 확보",
      description: [
        "자동화 솔루션 구축 및 운영 가능한",
        "전문 엔지니어 보유"
      ],
    },
  ],
  솔루션: [
    {
      title: "Multiverse Component",
      description: [
        "Multiverse로 누구나 활용 가능하도록",
        "Data의 가치를 극대화, 미래를 위한",
        "Open Innovation Platform으로 진화 "
      ],
    },
    {
      title: "Acculnsight+ 2.0",
      description: [
        "데이터 전처리부터 분석과 운영의 Data",
        "science 전 영역을 지원하는 Multi-",
        "Cloud 기반의 AI DevOps 플랫폼"
      ],
    },
    {
      title: "Accu.Tuning (AutoML)",
      description: [
        "직관적인 UI로 모델 생성, 설명, 배포를",
        "한번에 제공하는 AutoML 솔루션"
      ],
    },
    {
      title: "ERP 솔루션",
      description: [
        "1. 통합 업무 관리 시스템",
        "2. 실시간 데이터 연동",
        "3. 맞춤형 워크플로우"
      ],
    },
    {
      title: "모바일 앱 개발",
      description: [
        "1. 크로스 플랫폼 개발",
        "2. 네이티브 성능 최적화",
        "3. 직관적인 UI/UX 설계"
      ],
    },
    {
      title: "데이터 분석 플랫폼",
      description: [
        "1. 빅데이터 처리 시스템",
        "2. 실시간 분석 대시보드",
        "3. AI 기반 예측 분석"
      ],
    },
  ],
};

// ========================================
// 메인 컴포넌트 함수
// ========================================
export default function AboutSection() {
  // 상태 관리:
  // activeTab - 선택된 탭, currentSlide - 현재 슬라이드 인덱스
  const [activeTab, setActiveTab] = useState("ITO");
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이더 현재 위치
  const cards = TAB_CONTENTS[activeTab];
  const isMultiPage = activeTab === '솔루션';
  const groupSize = isMultiPage ? 3 : cards.length;
  const numSlides = isMultiPage ? Math.ceil(cards.length / 3) : 1;

  // 탭 변경 핸들러: activeTab, currentSlide 및 애니메이션 상태를 초기화합니다.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  // 다음 슬라이드로 이동하는 함수: 최대 슬라이드 개수를 계산하여 순환합니다.
  const nextSlide = () => {
    const maxSlides = numSlides - 1;
    setCurrentSlide(prev => prev < maxSlides ? prev + 1 : 0);
  };

  // 이전 슬라이드로 이동하는 함수: 순환 형태로 이동합니다.
  const prevSlide = () => {
    const maxSlides = numSlides - 1;
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
          marginBottom: '48px',
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

        {/* ======================================== */}
        {/* 카드 영역 (슬라이더 구현부) */}
        {/* ======================================== */}
        <div className="flex items-start gap-4" style={{ position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {/* 좌측 화살표 버튼 */}
          {isMultiPage && currentSlide > 0 && (
          <button 
            onClick={prevSlide}
            className="hover:bg-gray-100 transition-all duration-300"
            style={{
              border: 'none',
              outline: 'none',
              position: 'absolute',
              top: '50%',
              left: '50px',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              zIndex: 10,
              cursor: 'pointer',
              fontSize: '28px',
              fontWeight: '700'
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#1f2937" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" />
            </svg>
          </button>
          )}

          {/* 카드 컨테이너 - 새 카드 등장 효과 */}
          <div
            className="flex gap-4 flex-1"
            style={{ position: 'relative', overflow: 'visible', display: 'flex', gap: '30px', flex: '1', justifyContent: 'center', marginLeft: '50px', marginRight: '50px' }}
          >
            {cards
              .slice(currentSlide * groupSize, currentSlide * groupSize + groupSize)
              .map((card, idx) => (
                <div
                  key={`${activeTab}-${currentSlide}-${idx}`}
                  style={{
                    opacity: noEffect ? 1 : 0,
                    transform: noEffect ? 'translateY(0)' : 'translateY(30px) scale(0.9)',
                    ...(noEffect ? {} : { animation: `cardAppear 0.6s ease-out ${idx * 0.15}s forwards` })
                  }}
                >
                  <AboutCard
                    title={card.title}
                    description={card.description}
                    detailLink={activeTab === '솔루션' ? 'https://www.naver.com' : undefined}
                  />
                </div>
              ))}
          </div>

          {/* ======================================== */}
          {/* CSS 애니메이션 스타일 (카드 등장 효과) */}
          {/* ======================================== */}
          <style>{`
            @keyframes cardAppear {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
              }
              50% {
                opacity: 0.7;
                transform: translateY(-5px) scale(1.02);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>

          {/* 우측 화살표 버튼 */}
          {isMultiPage && currentSlide < numSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="hover:bg-gray-100 transition-all duration-300"
            style={{
              border: 'none',
              outline: 'none',
              position: 'absolute',
              top: '50%',
              right: '50px',
              transform: 'translate(50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              zIndex: 10,
              cursor: 'pointer',
              fontSize: '28px',
              fontWeight: '700'
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#1f2937" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" />
            </svg>
          </button>
          )}
        </div>
      </div>
    </div>
  );
}