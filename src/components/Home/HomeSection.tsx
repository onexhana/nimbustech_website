import { useState, useEffect } from 'react';
import HomeButton from './HomeButton';
import HomeButtonMobile from './HomeButton_mobile';
import { useHomeData } from '../../context/HomeContext';

export default function HomeSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { homeData } = useHomeData();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만을 모바일로 간주
      setScreenWidth(window.innerWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수
  const getResponsiveFontSize = (baseSizes: number[], isMobileView: boolean) => {
    if (isMobileView) {
      // 모바일: 768px 기준으로 비례 계산
      const ratio = screenWidth / 768;
      const minSize = 0.7; // 최소 70%
      const maxSize = 1.0; // 최대 100%
      const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
      
      return baseSizes.map(size => Math.round(size * clampedRatio));
    } else {
      // 데스크톱: 1920px 기준으로 비례 계산
      const ratio = screenWidth / 1920;
      const minSize = 0.6; // 최소 60%
      const maxSize = 1.0; // 최대 100%
      const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
      
      return baseSizes.map(size => Math.round(size * clampedRatio));
    }
  };

  // 타이핑 애니메이션을 위한 상태 관리
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  // 타이핑할 텍스트 배열 (Context에서 가져오기)
  const texts = homeData.typingTexts;

  // Context에서 스타일 설정 가져오기 (안전하게 접근)
  const typingTextStyles = homeData.typingTextStyles || {
    colors: ['#000000', '#000000', '#000000', '#00A3E0'],
    fontWeights: [500, 500, 500, 700],
    desktopSizes: [100, 100, 100, 120],
    mobileSizes: [35, 35, 35, 48]
  };
  const { colors, fontWeights, desktopSizes, mobileSizes } = typingTextStyles;

  // 반응형 폰트 크기 계산
  const responsiveDesktopSizes = getResponsiveFontSize(desktopSizes, false);
  const responsiveMobileSizes = getResponsiveFontSize(mobileSizes, true);

  useEffect(() => {
    const typingSpeed = homeData.typingSpeed?.speed || 130;
    const pauseTime = homeData.typingSpeed?.pauseTime || 700;

    const timer = setTimeout(() => {
      if (currentCharIndex < texts[currentLineIndex].length) {
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        setCompletedLines(prev => [...prev, currentLineIndex]);
        
        setTimeout(() => {
          if (currentLineIndex < texts.length - 1) {
            setCurrentLineIndex(currentLineIndex + 1);
            setCurrentCharIndex(0);
          }
        }, pauseTime);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, currentLineIndex]);

  return (
    <>
      <section
        id="home"
        className="w-full h-screen bg-white flex items-start justify-end px-4"
        style={{ paddingTop: '100px' }}
      >
        <div className="text-right" style={{ marginRight: '32px' }}>
          <div>
            {texts.map((text, index) => (
              <div key={index} style={{   
                marginBottom: index < texts.length - 1 ? '1px' : '0',
                marginTop: index === 0 ? '0px' : '0'
              }}>
                <span 
                  className="tracking-tight"
                  style={{ 
                    color: colors[index],
                    fontWeight: fontWeights[index],
                    fontSize: isMobile ? `${responsiveMobileSizes[index]}px` : `${responsiveDesktopSizes[index]}px`,
                    ...(index === 3 && { textShadow: '0 0 1px currentColor' })
                  }}
                >    
                  <>
                    {completedLines.includes(index) ? (
                      text
                    ) : index === currentLineIndex ? (
                      <>
                        {text.substring(0, currentCharIndex)}
                        <span className="animate-pulse">|</span>
                      </>
                    ) : (
                      <span style={{ opacity: 0 }}>{text}</span>
                    )}
                  </>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isMobile ? (
        <HomeButtonMobile
          topOffset="-0vh"
          marginTopSpacing="-60vh"
          marginBottomSpacing="2rem"
        />
      ) : (
        <HomeButton />
      )}
    </>
  );
}
