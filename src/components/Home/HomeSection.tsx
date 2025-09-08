import { useState, useEffect } from 'react';
import HomeButton from './HomeButton';
import HomeButtonMobile from './HomeButton_mobile';

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
  const fontWeights = [500, 500, 500, 700];

  // 모바일용 폰트 크기 설정
  const mobileFontSizes = [
    '30px',   // '고객을 빛나게'
    '30px',   // '구성원을 빛나게' 
    '30px',   // '미래를 빛나게'
    '40px'    // 'NIMBUS TECH'
  ];

  // 웹용 폰트 크기 설정
  const webFontSizes = [
    '100px',   // '고객을 빛나게'
    '100px',   // '구성원을 빛나게' 
    '100px',   // '미래를 빛나게'
    '120px'    // 'NIMBUS TECH'
  ];

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
                  className={`tracking-tight ${colors[index]}`}
                  style={{ 
                    fontWeight: fontWeights[index],
                    fontSize: isMobile ? mobileFontSizes[index] : webFontSizes[index],
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
      {isMobile ? <HomeButtonMobile /> : <HomeButton />}
    </>
  );
}
