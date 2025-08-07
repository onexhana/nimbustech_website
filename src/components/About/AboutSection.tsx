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
import { useState, useEffect } from 'react';
import AboutTab from './AboutTab';
import AboutCard from './AboutCard';

// ========================================
// 탭 및 카드 데이터 (각 섹션별 6개씩 확장됨)
// ========================================
// 탭 리스트 정의: 네비게이션에 표시될 탭명을 배열로 지정합니다.
const TAB_LIST = ["ITO", "클라우드", "RPA", "솔루션"];

// 각 탭별 카드 데이터 정의: title(제목)과 description(내용 배열) 형태로 구성된 객체입니다.
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
      title: "모두에게 안착할 서비스",
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
    {
      title: "품질 관리 시스템",
      description: [
        "1. 체계적인 품질 관리 프로세스",
        "2. 정기적인 코드 리뷰",
        "3. 자동화된 테스트 환경"
      ],
    },
    {
      title: "고객 만족 서비스",
      description: [
        "1. 24/7 고객 지원 체계",
        "2. 신속한 문제 해결",
        "3. 지속적인 피드백 수집"
      ],
    },
    {
      title: "혁신적 기술 도입",
      description: [
        "1. 최신 기술 스택 활용",
        "2. 지속적인 기술 연구",
        "3. 효율적인 개발 방법론"
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
    {
      title: "클라우드 마이그레이션",
      description: [
        "1. 안전한 데이터 이전",
        "2. 무중단 서비스 전환",
        "3. 성능 최적화"
      ],
    },
    {
      title: "멀티 클라우드 관리",
      description: [
        "1. AWS, Azure, GCP 지원",
        "2. 하이브리드 클라우드 구축",
        "3. 비용 최적화"
      ],
    },
    {
      title: "재해 복구 솔루션",
      description: [
        "1. 자동 백업 시스템",
        "2. 신속한 복구 절차",
        "3. 비즈니스 연속성 보장"
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
    {
      title: "AI 기반 자동화",
      description: [
        "1. 인공지능 OCR 활용",
        "2. 지능형 문서 처리",
        "3. 학습 기반 프로세스 개선"
      ],
    },
    {
      title: "업무 프로세스 분석",
      description: [
        "1. 현황 분석 및 진단",
        "2. 자동화 우선순위 도출",
        "3. ROI 분석 및 제안"
      ],
    },
    {
      title: "운영 및 유지보수",
      description: [
        "1. 24/7 모니터링",
        "2. 신속한 장애 대응",
        "3. 지속적인 성능 개선"
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
  // activeTab - 선택된 탭, cardsVisible - 카드 애니메이션 표시 여부, currentSlide - 현재 슬라이드 인덱스
  const [activeTab, setActiveTab] = useState("ITO");
  const [cardsVisible, setCardsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이더 현재 위치

  // useEffect: activeTab 변경 시 카드 등장 애니메이션을 재시작합니다.
  useEffect(() => {
    setCardsVisible(false);
    const timer = setTimeout(() => {
      setCardsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // 탭 변경 핸들러: activeTab, currentSlide 및 애니메이션 상태를 초기화합니다.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
    setIsTransitioning(false); // 애니메이션 전환 상태 초기화
  };

  // 다음 슬라이드로 이동하는 함수: 최대 슬라이드 개수를 계산하여 순환합니다.
  const nextSlide = () => {
    const maxSlides = Math.ceil(TAB_CONTENTS[activeTab].length / 3) - 1;
    setCurrentSlide(prev => prev < maxSlides ? prev + 1 : 0);
  };

  // 이전 슬라이드로 이동하는 함수: 순환 형태로 이동합니다.
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

        {/* ======================================== */}
        {/* 카드 영역 (슬라이더 구현부) */}
        {/* ======================================== */}
        <div className="flex items-start gap-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginLeft: '50px', marginRight: '50px' }}>
          {/* 좌측 화살표 버튼 */}
          <button 
            onClick={prevSlide}
            className="hover:bg-gray-100 transition-all duration-300"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
              fontSize: '68px',
              fontWeight: 'bold',
              padding: '0',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              lineHeight: '0',
              paddingBottom: '8px'
            }}
          >
            ‹
          </button>

          {/* 카드 컨테이너 - 새 카드 등장 효과 */}
          <div 
            className="flex gap-4 flex-1" 
            style={{ 
              display: 'flex', 
              gap: '30px', 
              flex: '1', 
              justifyContent: 'center'
            }}
          >
            {TAB_CONTENTS[activeTab]
              .slice(currentSlide * 3, currentSlide * 3 + 3)
              .map((card, idx) => (
                <div
                  key={`${activeTab}-${currentSlide}-${idx}`}
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px) scale(0.9)',
                    animation: `cardAppear 0.6s ease-out ${idx * 0.15}s forwards`
                  }}
                >
                  <AboutCard
                    title={card.title}
                    description={card.description}
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
          <button 
            onClick={nextSlide}
            className="hover:bg-gray-100 transition-all duration-300"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
              fontSize: '68px',
              fontWeight: 'bold',
              padding: '0',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              lineHeight: '0',
              paddingBottom: '8px'
            }}
          >
            ›
          </button>
        </div>

        {/* ======================================== */}
        {/* 슬라이드 인디케이터 (점 표시) */}
        {/* ======================================== */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '8px' }}>
          {Array.from({ length: Math.ceil(TAB_CONTENTS[activeTab].length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '16px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: currentSlide === index ? '#3b82f6' : '#d1d5db',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
