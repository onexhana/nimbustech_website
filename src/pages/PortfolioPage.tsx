import { useState, useEffect } from 'react';
import PortfolioCardList from '../components/Portfolio/PortfolioCardList';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import CategoryFilter from '../components/Portfolio/CategoryFilter';
import { portfolioProjects, portfolioCategories } from '../data/portfolioData';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  const filtered = portfolioProjects.filter((p) => p.category === selectedCategory);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlide(0);
  };

  return (
    <>
      <section className="pt-[100px] pl-16 pr-12 pb-24 bg-white">
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
                    padding: '8px 20px',
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

            {/* 모바일용 포트폴리오 카드 컨테이너 */}
            <div style={{
              backgroundColor: '#E6F7FF',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              marginLeft: '20px',
              marginRight: '20px'
            }}>
              {/* 현재 슬라이드의 카드만 표시 */}
              {filtered.length > 0 && (
                <>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#00A3E0',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    {filtered[currentSlide].title}
                  </h3>
                  <div style={{
                    fontSize: '16px',
                    color: '#333',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}>
                    {filtered[currentSlide].description.split('\n').map((line, i) => (
                      <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
                    ))}
                  </div>
                  
                  {/* 이미지 영역 */}
                  {filtered[currentSlide].image && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '16px'
                    }}>
                      <img 
                        src={filtered[currentSlide].image} 
                        alt={filtered[currentSlide].title}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 모바일용 슬라이더 인디케이터 */}
            {filtered.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px'
              }}>
                {Array.from({ length: filtered.length }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      width: i === currentSlide ? '30px' : '10px',
                      height: '10px',
                      borderRadius: i === currentSlide ? '5px' : '50%',
                      backgroundColor: i === currentSlide ? '#00A3E0' : '#D1D5DB',
                      border: 'none',
                      padding: 0,
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`슬라이드 ${i + 1}`}
                  />
                ))}
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