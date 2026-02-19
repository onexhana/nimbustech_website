import { useState, useEffect, useRef } from 'react';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import CategoryFilter from '../components/Portfolio/CategoryFilter';
import { usePortfolioData } from '../context/PortfolioContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const PortfolioPage = () => {
  const { portfolioData } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState("일반 / 제조");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  
  const filtered = portfolioData.projects.filter((p) => p.category === selectedCategory);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlide(0);
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(0);
    }
  };

  return (
    <>
      <section className="pt-[100px] pl-16 pr-12 pb-24 bg-white max-w-[1920px] mx-auto">
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
              {portfolioData.categories.map((category) => {
                // 관리자에서 설정한 필터 스타일 가져오기
                const getFilterStyle = (categoryName: string) => {
                  const savedFilterStyles = localStorage.getItem('filterStyleSettings');
                  if (savedFilterStyles) {
                    try {
                      const filterStyles = JSON.parse(savedFilterStyles);
                      return filterStyles[categoryName];
                    } catch (error) {
                      console.error('필터 스타일 로드 실패:', error);
                    }
                  }
                  
                  // 기본값 반환 (현재 사이트 색상)
                  return {
                    backgroundColor: "#00A3E0",
                    textColor: "#ffffff",
                    borderColor: "#00A3E0",
                    borderWidth: 1,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 20,
                    padding: "8px 20px",
                    hoverBackgroundColor: "#008CC0",
                    hoverTextColor: "#ffffff"
                  };
                };
                
                const filterStyle = getFilterStyle(category);
                
                return (
                  <button
                    key={category}
                    style={{
                      backgroundColor: selectedCategory === category ? 'white' : filterStyle.backgroundColor,
                      color: selectedCategory === category ? filterStyle.borderColor : filterStyle.textColor,
                      border: `${filterStyle.borderWidth || 1}px solid ${filterStyle.borderColor}`,
                      borderRadius: `${filterStyle.borderRadius || 20}px`,
                      padding: filterStyle.padding || '8px 20px',
                      fontSize: `${filterStyle.fontSize || 14}px`,
                      fontWeight: filterStyle.fontWeight || 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* 모바일용 포트폴리오 카드 스와이퍼 */}
            <div style={{
              marginLeft: '20px',
              marginRight: '20px',
              marginBottom: '20px'
            }}>
              <Swiper
                ref={swiperRef}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
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
                      backgroundColor: '#E6F7FF',
                      borderRadius: '12px',
                      padding: '10px 20px 20px 20px',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        {(() => {
                          // 모바일용 프로젝트 스타일 가져오기
                          const getProjectStyle = (projectId: number) => {
                            const savedFontStyles = localStorage.getItem('fontStyleSettings');
                            let fontStyle = null;
                            
                            if (savedFontStyles) {
                              try {
                                const fontStyles = JSON.parse(savedFontStyles);
                                fontStyle = fontStyles[projectId];
                              } catch (error) {
                                console.error('글씨 스타일 로드 실패:', error);
                              }
                            }
                            
                            return fontStyle || {
                              projectTitle: {
                                mobile: { size: 22, weight: 700, color: "#00A3E0" }
                              },
                              projectDescription: {
                                mobile: { size: 16, weight: 500, color: "#333" }
                              }
                            };
                          };
                          
                          const fontStyle = getProjectStyle(project.id);
                          
                          return (
                            <>
                              <h3 style={{
                                fontSize: `${fontStyle.projectTitle.mobile.size}px`,
                                fontWeight: fontStyle.projectTitle.mobile.weight,
                                color: fontStyle.projectTitle.mobile.color,
                                marginBottom: '-5px',
                                textAlign: 'center'
                              }}>
                                {project.title}
                              </h3>
                              <div style={{
                                fontSize: `${fontStyle.projectDescription.mobile.size}px`,
                                color: fontStyle.projectDescription.mobile.color,
                                fontWeight: fontStyle.projectDescription.mobile.weight,
                                lineHeight: '1.5',
                                textAlign: 'center',
                                marginBottom: '16px',
                                minHeight: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                              }}>
                                {project.description.split('\n').map((line, i) => (
                                  <p key={i} style={{ marginBottom: '4px' }}>{line}</p>
                                ))}
                              </div>
                            </>
                          );
                        })()}
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
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#f0f0f0'
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

            {/* 모바일용 슬라이더 인디케이터 */}
            {filtered.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px'
              }}>
                {Array.from({ length: Math.ceil(filtered.length / 2) }).map((_, i) => {
                  const isActive = Math.floor(currentSlide / 2) === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const targetSlide = i * 2;
                        console.log(`점 ${i} 클릭: ${targetSlide}번 카드로 이동`);
                        
                        setCurrentSlide(targetSlide);
                        
                        if (swiperRef.current) {
                          console.log('Swiper 참조 있음, slideTo 호출');
                          swiperRef.current.slideTo(targetSlide, 300);
                        } else {
                          console.log('Swiper 참조 없음');
                        }
                      }}
                      style={{
                        width: isActive ? '30px' : '10px',
                        height: '10px',
                        borderRadius: isActive ? '5px' : '50%',
                        backgroundColor: isActive ? '#00A3E0' : '#D1D5DB',
                        border: 'none',
                        padding: 0,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      aria-label={`슬라이드 그룹 ${i + 1}`}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* 데스크톱 레이아웃 */
          <div className="flex gap-16 items-start" style={{ marginLeft: '64px' }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex-1 flex flex-col h-full" style={{ marginLeft: '300px' }}> {/* 필터와 카드섹션 사이 여백*/} 
              <h3 className="text-[36px] font-extrabold mb-6 text-black tracking-tight">{selectedCategory}</h3>
              <div className="flex-1">
                <PortfolioCardList projects={filtered} />
              </div>
            </div>
          </div>
        )}
      </section>

      <PortfolioSection />
    </>
  );
};

export default PortfolioPage;