// 포트폴리오 섹션 컴포넌트
import { useState, useEffect } from 'react';
import PortfolioCardList from './PortfolioCardList';
import CategoryFilter from './CategoryFilter';
import PartnerLogoSlider from "./PartnerLogoSlider";
import { portfolioProjects, portfolioCategories } from '../../data/portfolioData';

export default function PortfolioSection() {
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
    <div className="w-full">
      {/* 포트폴리오 메인 섹션 */}
      <div className="pt-[120px] pl-16 pr-12 pb-24 bg-white">
        {/* Portfolio 페이지 제목 */}
        <div className="max-w-7xl mx-auto">
          {/* 검은 실선 */}
          <div style={{
            width: '110px',
            height: '3px',
            backgroundColor: '#000000',
            marginLeft: '50px',
            marginBottom: '20px'
          }}></div>
          
          {/* 메인 타이틀 */}
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
          <div className="flex gap-16 items-start" style={{ marginLeft: '64px', marginTop: '-0px' }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex flex-col h-full items-start" style={{ marginLeft: '200px' }}>
              <div className="w-full">
                <PortfolioCardList projects={filtered} />
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

