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
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth < 768); // 768px 미만을 모바일로 간주
      setScreenWidth(currentWidth);
      
      // 디버깅용 로그 (값이 변경될 때만 출력)
      const prevWidth = screenWidth;
      if (Math.abs(currentWidth - prevWidth) > 10) {
        console.log('HomeSection - 화면 크기 변경:', currentWidth, 'isMobile:', currentWidth < 768);
      }
    };

    // 초기 로딩 시 즉시 실행
    checkMobile();
    
    // 리사이즈 이벤트 리스너 추가 (디바운싱 적용)
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150); // 150ms 디바운싱
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // 브라우저 확대/축소 감지를 위한 추가 이벤트들
    window.addEventListener('orientationchange', checkMobile);
    
    // 브라우저 확대 비율 변경 감지 (Chrome, Edge 등)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedResize);
    }
    
    // 주기적으로 화면 크기 체크 (확대/축소 변경 감지용) - 3초마다 체크
    const intervalCheck = setInterval(checkMobile, 3000);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', checkMobile);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', debouncedResize);
      }
      clearTimeout(resizeTimeout);
      clearInterval(intervalCheck);
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
          paddingTop: isMobile ? '100px' : '150px', 
          // 모든 구간에서 연속 변화: 창이 줄수록 더 작게
          // 최소 8px, 비율 2.5vw, 최대 48px
          paddingBottom: 'clamp(8px, 2.5vw, 48px)',
          // 높이도 더 공격적으로 축소: 최소 360px, 비율 45vh, 최대 740px
          minHeight: isMobile ? '280px' : 'clamp(360px, 45vh, 740px)'
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
