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

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수 (브레이크포인트 없이 연속 변화)
  const getResponsiveFontSize = (baseSizes: number[]) => {
    // 1920px 기준으로 비율 계산, 최소 35%, 최대 100%
    const ratio = screenWidth / 1920;
    const clampedRatio = Math.max(0.35, Math.min(1.0, ratio));
    return baseSizes.map(size => Math.round(size * clampedRatio));
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
  const responsiveSizes = getResponsiveFontSize(desktopSizes);

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
        className="w-full bg-white flex items-start justify-end px-4"
        style={{ 
          paddingTop: '90px', 
          // 모든 구간에서 연속 변화: 창이 줄수록 더 작게
          // 최소 8px, 비율 2.5vw, 최대 48px
          paddingBottom: 'clamp(8px, 2.5vw, 48px)',
          // 높이도 더 공격적으로 축소: 최소 360px, 비율 45vh, 최대 740px
          minHeight: 'clamp(360px, 45vh, 740px)'
        }}
      >
        <div className="max-w-[1920px] w-full mx-auto text-right" style={{ marginRight: '32px' }}>
          <div>
            {texts.map((text, index) => {
              // 화면 크기에 따른 텍스트 간격 계산
              const getResponsiveMargin = () => {
                if (isMobile) {
                  return screenWidth < 480 ? '20px' : '25px'; // 모바일에서는 더 큰 간격
                } else {
                  return screenWidth < 1200 ? '30px' : '40px'; // 데스크톱에서는 화면 크기에 따라 조정
                }
              };
              
              return (
                <div key={index} style={{   
                  marginBottom: index < texts.length - 1 ? getResponsiveMargin() : '0',
                  marginTop: index === 0 ? '0px' : '0'
                }}>
                  <span 
                    className="tracking-tight"
                    style={{ 
                      color: colors[index],
                      fontWeight: fontWeights[index],
                      fontSize: `${responsiveSizes[index]}px`,
                      lineHeight: '1.2', // 텍스트 겹침 방지를 위한 line-height 추가
                      display: 'block', // 블록 요소로 만들어 간격 확보
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
