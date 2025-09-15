// 포트폴리오 섹션 컴포넌트
import { useState, useEffect, useRef } from 'react';
import PortfolioCardList from './PortfolioCardList';
import CategoryFilter from './CategoryFilter';
import PartnerLogoSlider from "./PartnerLogoSlider";
import { portfolioProjects, portfolioCategories } from '../../data/portfolioData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [swiperKey, setSwiperKey] = useState(0); // Swiper 강제 재초기화를 위한 키
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  
  const filtered = portfolioProjects.filter((p) =>
    selectedCategory === "일반 / 제조"
      ? (p.category === "일반" || p.category === "제조")
      : p.category === selectedCategory
  );
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    const isSameCategory = selectedCategory === category;
    
    setSelectedCategory(category);
    setCurrentSlide(0);
    
    // 같은 카테고리를 다시 클릭한 경우 Swiper를 강제로 재초기화
    if (isSameCategory) {
      setSwiperKey(prev => prev + 1); // 키를 변경하여 Swiper 재초기화
    }
    
    // 카테고리 변경 시 스와이퍼를 첫 번째 슬라이드로 이동 (다른 카테고리인 경우만)
    if (swiperRef.current && !isSameCategory) {
      setTimeout(() => {
        if (swiperRef.current) {
          if (swiperRef.current.slideToLoop) {
            swiperRef.current.slideToLoop(0, 0); // 0ms 애니메이션으로 즉시 이동
          } else if (swiperRef.current.slideTo) {
            swiperRef.current.slideTo(0, 0);
          }
        }
      }, 50);
    }
  };

  return (
    <div className="w-full">
      {/* 포트폴리오 메인 섹션 */}
      <div className="pt-[120px] pl-16 pr-12 pb-24 bg-white">
        {/* Portfolio 페이지 제목 */}
        <div className="max-w-7xl mx-auto">
          {/* 메인 타이틀 */}
          {isMobile ? (
            <div style={{
              marginLeft: '20px',
              marginRight: '20px',
              marginBottom: '60px',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#000000',
                lineHeight: '1.3',
                letterSpacing: '-1px'
              }}>
                고객 성공의 발자취
              </h2>
              <p style={{
                fontSize: '19px',
                fontWeight: '400',
                color: '#000000',
                lineHeight: '1.5',
                letterSpacing: '-0.5px'
              }}>
                함께한 프로젝트, 그것이 님버스테크입니다.
              </p>
            </div>
          ) : (
            <>
              {/* 검은 실선 - 데스크톱만 */}
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
                marginBottom: '80px',
                color: '#1f2937',
                lineHeight: '1.2',
                letterSpacing: '-3.5px',
                marginLeft: '50px'
              }}>
                Portfolio
              </h2>
            </>
          )}
        </div>
        
        {/* 모바일과 데스크톱 레이아웃 분기 */}
        {isMobile ? (
          <>
            {/* 모바일 카테고리 버튼들 */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}>
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  style={{
                    backgroundColor: selectedCategory === category ? '#00A3E0' : 'white',
                    color: selectedCategory === category ? 'white' : '#00A3E0',
                    border: '1px solid #00A3E0',
                    borderRadius: '20px',
                    width: '24%',
                    padding: '8px 0',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 모바일용 포트폴리오 카드 스와이퍼 */}
            <div style={{
              marginLeft: '20px',
              marginRight: '20px',
              marginBottom: '20px'
            }}>
              <Swiper
                key={`${selectedCategory}-${swiperKey}`} // 카테고리 변경 시 또는 같은 카테고리 재클릭 시 Swiper 재초기화
                ref={swiperRef}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                onSlideChange={(swiper: any) => {
                  console.log(`슬라이드 변경: ${swiper.activeIndex}`);
                  setCurrentSlide(swiper.activeIndex);
                }}
                style={{
                  paddingBottom: '20px'
                }}
              >
                {filtered.map((project, index) => (
                  <SwiperSlide key={index}>
                    <div style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '24px',
                      padding: '20px',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '22px',
                          fontWeight: '700',
                          color: '#00A3E0',
                          marginBottom: '8px',
                          textAlign: 'center'
                        }}>
                          {project.title}
                        </h3>
                        <div style={{
                          fontSize: '16px',
                          color: '#000000',
                          fontWeight: '600',
                          lineHeight: '1.5',
                          textAlign: 'center',
                          marginBottom: '16px',
                          minHeight: '50px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          {project.description.split('\n').map((line, i) => (
                            <p key={i} style={{ marginBottom: '-15px' }}>{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      {/* 이미지 영역 */}
                      {project.image && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '16px'
                        }}>
                          <div style={{
                            width: '280px',
                            height: '150px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            backgroundColor: '#f3f4f6'
                          }}>
                            <img 
                              src={project.image} 
                              alt={project.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </>
        ) : (
          /* 데스크톱 레이아웃 */
          <div className="flex gap-16 items-start" style={{ marginLeft: '64px', marginTop: '-0px' }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex flex-col h-full items-start" style={{ marginLeft: '200px' }}>
              <div className="w-full">
                <PortfolioCardList key={`${selectedCategory}-${swiperKey}`} projects={filtered} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 파트너 로고 슬라이더 */}
      <div style={{ marginTop: "0px" }}>
        <PartnerLogoSlider />
      </div>
    </div>
  );
}

