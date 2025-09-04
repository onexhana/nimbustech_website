import { useState, useEffect } from 'react';
import HomeButton from './HomeButton';

export default function HomeSectionMobile() {
  // 타이핑 애니메이션을 위한 상태 관리
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // 현재 타이핑 중인 텍스트 줄 인덱스
  const [currentCharIndex, setCurrentCharIndex] = useState(0); // 현재 줄에서 타이핑된 문자 개수
  const [completedLines, setCompletedLines] = useState<number[]>([]); // 완성된 줄들의 인덱스 배열

  // 타이핑할 텍스트 배열
  const texts = [
    '고객을 빛나게',
    '구성원을 빛나게', 
    '미래를 빛나게',
    'NIMBUS TECH'
  ];

  // 각 텍스트 줄의 색상 설정
  const colors = ['text-black', 'text-black', 'text-black', 'text-[#00A3E0]'];
  
  // 각 텍스트 줄의 폰트 두께 설정 (숫자로 명시적 설정)
  const fontWeights = [
    550, // '고객을 빛나게' 
    550, // '구성원을 빛나게'
    550, // '미래를 빛나게'
    700  // 'NIMBUS TECH'
  ];

  useEffect(() => {
    const typingSpeed = 130; // 타이핑 속도 (밀리초)
    const pauseTime = 700;   // 줄 완성 후 대기 시간 (밀리초)

    const timer = setTimeout(() => {
      if (currentCharIndex < texts[currentLineIndex].length) {
        // 현재 줄의 모든 문자를 아직 타이핑하지 않았다면 다음 문자 추가
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        // 현재 줄 완성 - 완성된 줄 배열에 추가
        setCompletedLines(prev => [...prev, currentLineIndex]);
        
        // 잠시 대기 후 다음 줄로 이동
        setTimeout(() => {
          if (currentLineIndex < texts.length - 1) {
            setCurrentLineIndex(currentLineIndex + 1);
            setCurrentCharIndex(0); // 다음 줄의 문자 인덱스 초기화
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
        className="w-full h-screen bg-white flex items-start justify-center px-4 pt-32"
      >
        <div className="text-center">
          <div>
            {texts.map((text, index) => (
              <div key={index} style={{   
                marginBottom: index < texts.length - 1 ? '1px' : '0',
                marginTop: index === 0 ? '0px' : '0'
              }}>
                <span 
                  className={index === 3 ? `text-[9vw] tracking-tight ${colors[index]}` : `text-[6vw] tracking-tight ${colors[index]}`}
                  style={{ 
                    fontWeight: fontWeights[index], // 각 줄별 폰트 두께 적용
                    ...(index === 3 && { textShadow: '0 0 1px currentColor' }) // NIMBUS TECH에만 텍스트 그림자
                  }}
                >
                  <>
                    {completedLines.includes(index) ? (
                      // 완성된 줄: 전체 텍스트 표시
                      text
                    ) : index === currentLineIndex ? (
                      // 현재 타이핑 중인 줄: 부분 텍스트 + 커서 표시
                      <>
                        {text.substring(0, currentCharIndex)}
                        <span className="animate-pulse">|</span>
                      </>
                    ) : (
                      // 아직 시작하지 않은 줄: 투명한 텍스트로 공간 확보
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
