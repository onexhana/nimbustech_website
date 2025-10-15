// src/components/About/AboutSection.tsx
// ========================================
// ABOUT 페이지 메인 섹션 컴포넌트
// 담당자: About 페이지 팀
// 
// 📋 주요 기능:
// - 4개 탭 네비게이션 (ITO, 클라우드, RPA, 솔루션)
// - 각 탭별 카드 데이터 (ITO/클라우드/RPA: 3개, 솔루션: 7개)
// - 모든 탭: 무한 루프 슬라이더 (Swiper 기반)
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
// - 모든 탭: 무한 루프 슬라이더
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
import { useAboutData } from '../../context/AboutContext';

// 탭 및 카드 데이터 (각 섹션별 6개씩 확장됨)
// ========================================

// ========================================
// 메인 컴포넌트 함수
// ========================================
export default function AboutSection() {
  const { aboutData, refreshData } = useAboutData();
  
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

  // 첫 번째 탭을 기본값으로 설정
  useEffect(() => {
    if (aboutData.tabs.length > 0) {
      setActiveTab(aboutData.tabs[0].name);
    }
  }, [aboutData]);

  // 페이지 포커스 시 데이터 새로고침 (admin에서 수정 후 돌아올 때 반영)
  useEffect(() => {
    const handleFocus = () => {
      refreshData();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refreshData]);
  
  const cards = aboutData.tabs.find(tab => tab.name === activeTab)?.cards || [];
  const isMultiPage = activeTab === '솔루션'; // 솔루션 섹션만 무한루프
  
  // 솔루션 섹션만 무한 루프를 위한 카드 복제
  const duplicatedCards = isMultiPage ? Array(2).fill(cards).flat() : cards;

  // 탭 변경 핸들러: activeTab, currentSlide 및 애니메이션 상태를 초기화합니다.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
    
    // 탭 변경 시 Swiper를 첫 번째 슬라이드로 이동
    setTimeout(() => {
      if (swiperRef.current) {
        if (swiperRef.current.slideToLoop) {
          swiperRef.current.slideToLoop(0, 0); // 0ms 애니메이션으로 즉시 이동
        } else if (swiperRef.current.slideTo) {
          swiperRef.current.slideTo(0, 0);
        }
      }
    }, 50);
  };


  return (
    <div id="about-gray-start">
      <div className="w-full" style={{
        padding: isMobile
          ? `80px 0 ${activeTab === 'RPA' ? '40px' : '55px'} 0`
          : `80px 24px ${activeTab === 'RPA' ? '40px' : '60px'} 24px`,
        backgroundColor: '#F3F6F9',
        marginTop: '120px',
        overflow: 'hidden',
        maxWidth: '1920px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
      {/* 메인 타이틀 영역 (AboutSection 컴포넌트 내부 상단) */}
      <div className="max-w-7xl mx-auto" style={{ overflow: 'visible', maxWidth: '1920px', width: '100%', boxSizing: 'border-box' }}>
        {/*
          isMobile 분기: 화면 너비가 모바일 기준(<768px)이면 이 블록 실행
          - 모바일용 필터 버튼들을 flex-wrap으로 가로/세로 배치
          - gap 및 marginBottom으로 버튼 간 간격 설정
        */}
        {isMobile ? (
          <>
            {/* 모바일 메인 멘트 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '27px',
                fontWeight: '700',
                color: '#000000',
                lineHeight: '1.4',
                margin: 0
              }}>
                <span style={{ 
                  fontWeight: 700, 
                  display: 'block', 
                  fontSize: `${aboutData.fontSize?.mobileMainTitle || aboutData.fontSize?.mainTitle || 28}px`,
                  color: aboutData.colors?.mobileMainTitle || aboutData.colors?.mainTitle || '#000000'
                }}>
                  {aboutData.mainTitle}
                </span>
                <span style={{ 
                  fontWeight: 400, 
                  display: 'block', 
                  marginTop: '4px', 
                  marginBottom: '30px',
                  fontSize: `${aboutData.fontSize?.mobileSubtitle || aboutData.fontSize?.subtitle || 19}px`,
                  color: aboutData.colors?.mobileSubtitle || aboutData.colors?.subtitle || '#000000'
                }}>
                {aboutData.subtitle}
                </span>
              </h2>
            </div>
            
            {/* 모바일 필터 버튼들을 감싸는 div */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '25px'
            }}>
              {/* TAB_LIST 배열을 순회하며 각각 버튼 생성 */}
              {aboutData.tabs.map((tab) => (
                <button
                  key={tab.name}
                  /* 버튼 스타일: 활성 탭은 파란색, 비활성 탭은 흰색 배경 */
                  style={{
                    backgroundColor: activeTab === tab.name ? 
                      (aboutData.mobileTabActiveColor || aboutData.tabActiveColor || '#00A3E0') : 'white',
                    color: activeTab === tab.name ? 'white' : 
                      (aboutData.mobileTabInactiveColor || aboutData.tabInactiveColor || '#000000'),
                    border: activeTab === tab.name ? 'none' : `1px solid ${aboutData.mobileTabActiveColor || aboutData.tabActiveColor || '#00A3E0'}`,
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: `${aboutData.fontSize?.mobileTabName || aboutData.fontSize?.tabName || 14}px`,
                    fontWeight: '550',
                    cursor: 'pointer',
                    minWidth: '60px'
                  }}
                  onClick={() => handleTabChange(tab.name)}
                >
                  {tab.name} {/* 탭명 표시 */}
                </button>
              ))}
            </div>

            {/* 모바일용 Swiper 카드 슬라이더 */}
            <div style={{
              backgroundColor: '#E6F7FF',
              borderRadius: '16px',
              padding: '24px 0 40px',
              margin: '0 16px 25px 16px'
            }}>
              {/* 모바일용 Swiper 무한루프 */}
              <Swiper
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSwiper={(swiper: any) => { swiperRef.current = swiper }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSlideChange={(swiper: any) => setCurrentSlide(swiper.realIndex)}
                spaceBetween={20}
                slidesPerView={1}
                loop={isMultiPage}
                loopedSlides={isMultiPage ? duplicatedCards.length : 0}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onInit={(swiper: any) => { swiperRef.current = swiper }}
                style={{ padding: '0 20px' }}
              >
                {(isMultiPage ? duplicatedCards : cards).map((card, i) => (
                  <SwiperSlide key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '12vw' }}>
                      <div>
                        <h3 style={{ 
                          fontSize: `${card.fontSize?.title || aboutData.fontSize?.mobileCardTitle || aboutData.fontSize?.cardTitle || 28}px`, 
                          fontWeight: '600', 
                          color: aboutData.colors?.mobileCardTitle || aboutData.colors?.cardTitle || aboutData.cardTitleColor || '#000000', 
                          margin: '0 0 20px 0' 
                        }}>
                          {card.title}
                        </h3>
                        <div style={{ 
                          fontSize: `${card.fontSize?.description || aboutData.fontSize?.mobileCardDescription || aboutData.fontSize?.cardDescription || 22}px`, 
                          color: aboutData.colors?.mobileCardDescription || aboutData.colors?.cardDescription || aboutData.cardDescriptionColor || '#000000', 
                          fontWeight: '400', 
                          lineHeight: '1.5' 
                        }}>
                          {card.description.map((line: string, j: number) => (
                            <p key={j} style={{ margin: '0', marginLeft: '0' }}>{line}</p>
                          ))}
                        </div>
                      </div>
                      {activeTab === '솔루션' && (
                        <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '8px' }}>
                          <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: "#00A3E0",
                              color: "#ffffff",
                              borderRadius: "20px",
                              padding: "8px 20px",
                              fontSize: "1rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              border: "none",
                              cursor: "pointer",
                              transition: "background-color 0.2s ease-in-out",
                              display: "inline-block",
                            }}
                          >
                            자세히 보기
                          </a>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
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
                  onClick={() => {
                    setCurrentSlide(i);
                    swiperRef.current?.slideToLoop(i);
                  }}
                  style={{
                    width: i === (currentSlide % cards.length) ? '24px' : '8px',
                    height: '8px',
                    borderRadius: i === (currentSlide % cards.length) ? '4px' : '50%',
                    backgroundColor: i === (currentSlide % cards.length) ? '#00A3E0' : '#D1D5DB',
                    border: 'none',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <>

            {/* 탭 컴포넌트 */}
            <AboutTab 
              tabs={aboutData.tabs.map(tab => tab.name)}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              fontSize={aboutData.fontSize?.desktopTabName || aboutData.fontSize?.tabName}
              activeColor={aboutData.desktopTabActiveColor || aboutData.tabActiveColor}
              inactiveColor={aboutData.desktopTabInactiveColor || aboutData.tabInactiveColor}
            />

            {/* ======================================== */}
            {/* 카드 영역 (모든 섹션: Swiper 무한루프) */}
            {/* ======================================== */}
            <div className="flex items-start justify-center" style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-start', gap: '0', justifyContent: 'center', marginLeft: '0', marginRight: '0', maxWidth: '1920px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

              {/* 모든 섹션: 무한 루프 슬라이더 */}
              <div
                className="flex flex-1 justify-center"
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flex: 'none', 
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '1920px',
                  boxSizing: 'border-box'
                }}
              >
                <div 
                  className="overflow-visible"
                  style={{ 
                  width: '100%',
                  maxWidth: '1920px',
                    margin: '0',
                    position: 'relative',
                    left: '0',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                  }}
                >
                <Swiper
                  key={`${activeTab}-${cards.length}`} // 탭 변경 시 Swiper 재초기화
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSwiper={(swiper: any) => {
                    swiperRef.current = swiper;
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInit={(swiper: any) => {
                    swiperRef.current = swiper;
                  }}
                  spaceBetween={20}
                  slidesPerView={3}
                  slidesPerGroup={1}
                  loop={isMultiPage}
                  loopedSlides={isMultiPage ? Math.max(3, cards.length) : 0}
                  pagination={false}
                  navigation={activeTab === '솔루션'}
                  allowTouchMove={true}
                  centeredSlides={false}
                  initialSlide={0}
                  speed={300}
                  resistance={false}
                  resistanceRatio={0}
                  watchSlidesProgress={false}
                  freeMode={false}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    1920: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    }
                  }}
                  className="about-infinite-swiper"
                >
                  {duplicatedCards.map((card, index) => (
                  <SwiperSlide key={`${card.title}-${index}`}>
                    <div
                      style={{
                        opacity: 0,
                        transform: 'translateY(30px) scale(0.9)',
                        animation: `cardAppear 0.6s ease-out ${(index % 3) * 0.15}s forwards`
                      }}
                    >
                      <AboutCard
                        title={card.title}
                        description={card.description}
                        detailLink={activeTab === '솔루션' ? card.link : undefined}
                        linkAsButton={activeTab === '솔루션'}
                        linkText={activeTab === '솔루션' ? "자세히 보기" : undefined}
                        borderRadius="35px"
                        titleColor={aboutData.colors?.desktopCardTitle || aboutData.colors?.cardTitle || aboutData.cardTitleColor || "#000000"}
                        descriptionColor={aboutData.colors?.desktopCardDescription || aboutData.colors?.cardDescription || aboutData.cardDescriptionColor || "#6B7280"}
                        backgroundColor={aboutData.cardBackgroundColor || "#ffffff"}
                        width={isMobile ? "380px" : "420px"}
                        minHeight={isMobile ? "200px" : "200px"}
                        titleFontSize={card.fontSize?.title || aboutData.fontSize?.desktopCardTitle || aboutData.fontSize?.cardTitle}
                        descriptionFontSize={card.fontSize?.description || aboutData.fontSize?.desktopCardDescription || aboutData.fontSize?.cardDescription}
                        hoverEffect={aboutData.cardHoverEffect}
                      />
                    </div>
                  </SwiperSlide>
                  ))}
                </Swiper>
                
                  {/* Swiper 스타일 - 모든 섹션 공통 */}
                  <style>{`
                    .about-infinite-swiper {
                      width: 100% !important;
                      overflow: visible !important;
                      margin: 0 auto !important;
                    }
                    .about-infinite-swiper .swiper-wrapper {
                      overflow: visible !important;
                    }
                    /* 모바일에서만 고정 폭 적용 */
                    @media (max-width: 768px) {
                      .about-infinite-swiper .swiper-slide {
                        width: 380px !important;
                        flex-shrink: 0 !important;
                      }
                    }
                    .about-infinite-swiper .swiper-slide > div {
                      margin: 10px 0;
                    }
                    .about-infinite-swiper .swiper-slide-duplicate {
                      opacity: 1 !important;
                      display: block !important;
                      visibility: visible !important;
                    }
                  `}</style>
                </div>

                {/* 네비게이션 화살표 버튼 - 솔루션 섹션만 */}
                {isMultiPage && (
                  <>
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
                  </>
                )}
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
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
}