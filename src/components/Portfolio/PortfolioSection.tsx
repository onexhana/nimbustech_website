// 포트폴리오 섹션 컴포넌트
import { useState, useEffect, useRef } from 'react';
import PortfolioCardList from './PortfolioCardList';
import CategoryFilter from './CategoryFilter';
import PartnerLogoSlider from "./PartnerLogoSlider";
import { usePortfolioData } from '../../context/PortfolioContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function PortfolioSection() {
  const { portfolioData } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [swiperKey, setSwiperKey] = useState(0); // Swiper 강제 재초기화를 위한 키
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  
  const filtered = portfolioData.projects.filter((p) => p.category === selectedCategory);
  
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
              <div style={{
                marginLeft: '50px',
                marginBottom: '80px'
              }}>
                <h2 style={{
                  fontSize: '50px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#000000',
                  lineHeight: '1.3',
                  letterSpacing: '-2px'
                }}>
                  고객 성공의 발자취
                </h2>
                <p style={{
                  fontSize: '30px',
                  fontWeight: '500',
                  color: '#000000',
                  lineHeight: '1.5',
                  letterSpacing: '-0.5px'
                }}>
                  함께한 프로젝트, 그것이 님버스테크입니다.
                </p>
              </div>
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
              {portfolioData.categories.map((category) => (
                <button
                  key={category}
                  style={{
                    backgroundColor: selectedCategory === category ? '#00A3E0' : 'white',
                    color: selectedCategory === category ? 'white' : '#00A3E0',
                    border: '1px solid #00A3E0',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    fontSize: `${portfolioData.fontSize?.category?.mobile || 14}px`,
                    fontWeight: portfolioData.fontWeight?.category?.mobile || 600,
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
                          fontSize: `${portfolioData.fontSize?.title?.mobile || 22}px`,
                          fontWeight: portfolioData.fontWeight?.title?.mobile || 700,
                          color: portfolioData.fontColor?.title?.mobile || '#00A3E0',
                          marginTop: '5px',
                          marginBottom: '-10px',
                          textAlign: 'center'
                        }}>
                          {project.title}
                        </h3>
                        <div style={{
                          fontSize: `${portfolioData.fontSize?.description?.mobile || 16}px`,
                          color: portfolioData.fontColor?.description?.mobile || '#000000', 
                          fontWeight: portfolioData.fontWeight?.description?.mobile || 600,
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
                            width: `${portfolioData.imageSize?.mobile?.width || 280}px`,
                            height: `${portfolioData.imageSize?.mobile?.height || 150}px`,
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
          <div className="flex items-start" style={{ 
            marginLeft: '64px', 
            marginTop: '-0px',
            gap: window.innerWidth <= 1366 ? '24px' : '64px' // 템플릿 크기(1366px 이하)에서만 간격 줄임
          }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex flex-col h-full items-start" style={{ 
              marginLeft: window.innerWidth <= 1366 ? '60px' : '200px' // 템플릿 크기(1366px 이하)에서만 추가 간격도 줄임
            }}>
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

