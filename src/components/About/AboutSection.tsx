// src/components/About/AboutSection.tsx
// ========================================
// ABOUT 페이지 메인 섹션 컴포넌트
// 담당자: About 페이지 팀
// 
// 📋 주요 기능:
// - 4개 탭 네비게이션 (ITO, 클라우드, RPA, 솔루션)
// - 각 탭별 카드 데이터 (ITO/클라우드/RPA: 3개, 솔루션: 7개)
// - 솔루션: 무한 루프 슬라이더 (Swiper 기반)
// - 기타 탭: 3개씩 고정 표시
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
// - 솔루션: 무한 루프 슬라이더
// 
// ⚠️ 주의사항:
// - 다른 팀과 merge 시 이 파일들만 수정됨
// - AboutSection, AboutCard, AboutTab 등 About/ 폴더 전체
// ========================================
import { useState, useEffect, useRef } from 'react';
import AboutTab from './AboutTab';
// Swiper 관련 import 제거
import AboutCard from './AboutCard'; // 효과 버전 (호버 애니메이션 활성화)
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
//import AboutCard from './AboutCardNoEffect'; // 무효화 버전 (호버 효과 없음)

const noEffect = AboutCard.name === 'AboutCardNoEffect';

// ========================================
// 탭 및 카드 데이터 (각 섹션별 6개씩 확장됨)
// ========================================
// 탭 리스트 정의: 네비게이션에 표시될 탭명을 배열로 지정합니다.
const TAB_LIST = ["ITO", "클라우드", "RPA", "솔루션"];

// 각 탭별 카드 데이터 정의: title(제목)과 description(내용 배열) 형태로 구성된 객체입니다. (솔루션은 7개)
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
      title: "SUSE",
      description: [
        "SUSE 솔루션, 연결해드립니다"
      ],
    },
    {
      title: "WEDATALAB",
      description: [
        "WEDATALAB 솔루션, 연결해드립니다"
      ],
    },
    {
      title: "IT STORY",
      description: [
        "IT STORY 솔루션, 연결해드립니다"
      ],
    },
    {
      title: "ERP 솔루션",
      description: [
        "1. 통합 업무 관리 시스템"
      ],
    },
    {
      title: "모바일 앱 개발",
      description: [
        "1. 크로스 플랫폼 개발"
      ],
    },
    {
      title: "데이터 분석 플랫폼",
      description: [
        "1. 빅데이터 처리 시스템"
      ],
    },
    {
      title: "클라우드 마이그레이션",
      description: [
        "1. 온프레미스 → 클라우드 전환"
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
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  // Swiper ref for infinite loop (솔루션 섹션용)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const cards = TAB_CONTENTS[activeTab];
  const isMultiPage = activeTab === '솔루션';
  
  // 솔루션 섹션용 무한 루프를 위한 카드 복제
  const duplicatedCards = isMultiPage ? Array(3).fill(cards).flat() : cards;

  // 탭 변경 핸들러: activeTab, currentSlide 및 애니메이션 상태를 초기화합니다.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };


  return (
    <div id="about-gray-start">
      <div className="w-full px-6" style={{ paddingTop: '100px', paddingBottom: '96px', backgroundColor: isMobile ? 'transparent' : '#F3F6F9', marginTop: '120px' }}>
      {/* 메인 타이틀 영역 (AboutSection 컴포넌트 내부 상단) */}
      <div className="max-w-7xl mx-auto">
        {/*
          isMobile 분기: 화면 너비가 모바일 기준(<768px)이면 이 블록 실행
          - 모바일용 필터 버튼들을 flex-wrap으로 가로/세로 배치
          - gap 및 marginBottom으로 버튼 간 간격 설정
        */}
        {isMobile ? (
          <div style={{
            position: 'relative',
            top: '-50px',
            margin: '0 16px',
            backgroundColor: '#F3F6F9',
            borderRadius: '16px',
            padding: '30px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 1
          }}>
            
            {/* 모바일 필터 버튼들을 감싸는 div */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '25px'
            }}>
              {/* TAB_LIST 배열을 순회하며 각각 버튼 생성 */}
              {TAB_LIST.map((tab) => (
                <button
                  key={tab}
                  /* 버튼 스타일: 활성 탭은 파란색, 비활성 탭은 흰색 배경 */
                  style={{
                    backgroundColor: activeTab === tab ? '#00A3E0' : 'white',
                    color: activeTab === tab ? 'white' : '#000000',
                    border: activeTab === tab ? 'none' : '1px solid #00A3E0',
                    borderRadius: '20px',
                    padding: '1px 16px',
                    fontSize: '14px',
                    fontWeight: '550',
                    cursor: 'pointer',
                    minWidth: '60px'
                  }}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab} {/* 탭명 표시 */}
                </button>
              ))}
            </div>

            {/* 모바일용 카드 컨테이너 (하늘색 배경) */}
            <div style={{
              backgroundColor: '#E6F7FF',
              borderRadius: '16px',
              padding: '24px 20px 40px', // bottom padding 늘림
              marginBottom: '25px',
              margin: '0 8px 25px 8px'
            }}>
              {/* 현재 활성화된 탭의 첫 번째 카드만 표시 */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#000000',
                margin: '0 0 30px 0'
              }}>
                {cards[currentSlide].title}
              </h3>
              <div style={{
                fontSize: '16px',
                color: '#000000',
                fontWeight: '400',
                lineHeight: '1.4'
              }}>
                {cards[currentSlide].description.map((line, i) => (
                  <p key={i} style={{ marginBottom: '-15px', marginLeft: '0' }}>{line}</p>
                ))}
              </div>
            </div>

            {/* 모바일용 슬라이더 인디케이터 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '15px'
            }}>
              {Array.from({ length: cards.length }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: i === currentSlide ? '24px' : '8px',
                    height: '8px',
                    borderRadius: i === currentSlide ? '4px' : '50%',
                    backgroundColor: i === currentSlide ? '#00A3E0' : '#D1D5DB',
                    border: 'none',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* 탭 컴포넌트 */}
            <AboutTab 
              tabs={TAB_LIST}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* ======================================== */}
            {/* 카드 영역 (솔루션: Swiper 무한루프, 기타: 고정 표시) */}
            {/* ======================================== */}
            <div className="flex items-start" style={{ position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'flex-start', gap: '1vw', justifyContent: 'center', marginLeft: '5vw', marginRight: '5vw' }}>

              {isMultiPage ? (
                                /* 솔루션 섹션: 고정 위치 + 무한 루프 */
                <>
                  {/* 카드 컨테이너 - RPA와 동일한 중앙 정렬 */}
                  <div
                    className="flex flex-1"
                    style={{ 
                      position: 'relative', 
                      overflow: 'visible', 
                      display: 'flex', 
                      flex: '1', 
                      justifyContent: 'center'
                    }}
                  >
                    <div 
                      className="overflow-hidden"
                      style={{ 
                        width: 'calc(30vw * 3 + 1vw * 2)', // 3장 카드(30vw) + gap(5vw * 2)
                        minWidth: 'calc(30vw * 3 + 1vw * 2)',
                        margin: '0 auto' // 중아 정렬
                      }}
                    >
                    <Swiper
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onSwiper={(swiper: any) => {
                        swiperRef.current = swiper;
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onInit={(swiper: any) => {
                        swiperRef.current = swiper;
                      }}
                      spaceBetween={window.innerWidth * 0.01} // 5vw에 해당하는 픽셀 값
                      slidesPerView={3}
                      slidesPerGroup={1}
                      loop={true}
                      loopedSlides={duplicatedCards.length}
                      pagination={false}
                      navigation={false}
                      allowTouchMove={true}
                      centeredSlides={false}
                      speed={300}
                      resistance={false}
                      resistanceRatio={0}
                      watchSlidesProgress={false}
                      freeMode={false}
                      className="about-solution-swiper"
                    >
                      {duplicatedCards.map((card, index) => (
                      <SwiperSlide key={`${card.title}-${index}`}>
                        <div
                          style={{
                            opacity: noEffect ? 1 : 0,
                            transform: noEffect ? 'translateY(0)' : 'translateY(30px) scale(0.9)',
                            ...(noEffect ? {} : { animation: `cardAppear 0.6s ease-out ${(index % 3) * 0.15}s forwards` })
                          }}
                        >
                          <AboutCard
                            title={card.title}
                            description={card.description}
                            detailLink='https://www.naver.com'
                            linkAsButton
                            linkText="자세히 보기"
                            borderRadius="35px"
                            titleColor="#000000"
                            descriptionColor="#6B7280"
                            backgroundColor="#ffffff"
                            minHeight="12vw"
                          />
                        </div>
                      </SwiperSlide>
                      ))}
                    </Swiper>
                    
                      {/* Swiper 스타일 - 솔루션 전용 */}
                      <style>{`
                        .about-solution-swiper {
                          width: 100% !important;
                          overflow: visible !important;
                          margin: 0 auto !important;
                        }
                        .about-solution-swiper .swiper-wrapper {
                          overflow: visible !important;
                        }
                        .about-solution-swiper .swiper-slide {
                          width: 30vw !important; /* 카드 폭을 30vw로 조정 */
                          flex-shrink: 0 !important;
                        }
                        .about-solution-swiper .swiper-slide > div {
                          margin: 10px 0; /* 수평 마진 제거, spaceBetween 사용 */
                        }
                        /* 무한 루프 보장 */
                        .about-solution-swiper .swiper-slide-duplicate {
                          opacity: 1 !important;
                          display: block !important;
                          visibility: visible !important;
                        }
                      `}</style>
                    </div>

                    {/* 솔루션 섹션 네비게이션 화살표 버튼 */}
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      style={{
                        position: 'absolute',
                        top: '-5rem',
                        right: '6rem',
                        border: 'none',
                        outline: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12L15 18" stroke="#1F2937" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" />
                      </svg>
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      style={{
                        position: 'absolute',
                        top: '-5rem',
                        right: '2rem',
                        border: 'none',
                        outline: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#1F2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6L15 12L9 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                /* 기타 섹션: 고정 표시 */
              <div
                className="flex flex-1"
                style={{ position: 'relative', overflow: 'visible', display: 'flex', gap: '5vw', flex: '1', justifyContent: 'center', marginLeft: '5vw', marginRight: '5vw' }}
              >
                  {cards.map((card, idx) => (
                    <div
                      key={`${activeTab}-${idx}`}
                      style={{
                        opacity: noEffect ? 1 : 0,
                        transform: noEffect ? 'translateY(0)' : 'translateY(30px) scale(0.9)',
                        ...(noEffect ? {} : { animation: `cardAppear 0.6s ease-out ${idx * 0.15}s forwards` })
                      }}
                    >
                      {['ITO', '클라우드', 'RPA'].includes(activeTab) ? (
                        <AboutCard
                          title={card.title}
                          description={card.description}
                          borderRadius="35px"
                          titleColor="#000000"
                          descriptionColor="#6B7280"
                          backgroundColor="#ffffff"
                          minHeight="12vw"
                        />
                      ) : (
                        <AboutCard
                          title={card.title}
                          description={card.description}
                        />
                      )}
                    </div>
                  ))}
              </div>
              )}

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
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
}