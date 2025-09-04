import { useState, useEffect } from 'react';
import HomeButton from './HomeButton';
import HomeSectionMobile from './HomeSection_mobile';

export default function HomeSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만을 모바일로 간주
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 모바일이면 모바일 전용 컴포넌트 렌더링
  if (isMobile) {
    return <HomeSectionMobile />;
  }

  // 웹 버전 렌더링 (기존 코드 그대로)
  return <HomeSectionWeb />;
}

// 웹 전용 컴포넌트
function HomeSectionWeb() {
  // 타이핑 애니메이션을 위한 상태 관리
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  // 타이핑할 텍스트 배열
  const texts = [
    '고객을 빛나게',
    '구성원을 빛나게', 
    '미래를 빛나게',
    'NIMBUS TECH'
  ];

  // 각 텍스트 줄의 색상 설정
  const colors = ['text-black', 'text-black', 'text-black', 'text-[#00A3E0]'];
  
  // 각 텍스트 줄의 폰트 두께 설정
  const fontWeights = [550, 550, 550, 700];

  useEffect(() => {
    const typingSpeed = 130;
    const pauseTime = 700;

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
        className="w-full h-screen bg-white flex items-center justify-end pr-6 md:pr-20"
      >
        <div className="text-right" style={{ marginRight: '70px' }}>
          <div>
            {texts.map((text, index) => (
              <div key={index} style={{   
                marginBottom: index < texts.length - 1 ? '1px' : '0',
                marginTop: index === 0 ? '120px' : '0'
              }}>
                <span 
                  className={index === 3 ? `tracking-tight ${colors[index]}` : `text-[6vw] md:text-[8vw] lg:text-[10vw] xl:text-[12vw] tracking-tight ${colors[index]}`}
                  style={index === 3 ? { 
                    fontWeight: fontWeights[index],
                    textShadow: '0 0 1px currentColor',
                    fontSize: '160px' // 웹에서는 고정 크기
                  } : { 
                    fontWeight: fontWeights[index]
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
      <HomeButton />
    </>
  );
}