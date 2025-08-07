import { useState, useEffect } from 'react';

export default function HomeSection() {
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
    <section
      id="home"
      className="w-full h-screen bg-white flex items-center justify-end pr-6 md:pr-20"
    >
      <div className="text-right">
        <div className="space-y-8">
          {texts.map((text, index) => (
            <div key={index} className="min-h-[20vh]">
              <span className={`text-[6vw] md:text-[8vw] lg:text-[10vw] xl:text-[12vw] font-extrabold tracking-tight ${colors[index]}`}>
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
                  // 아직 시작하지 않은 줄: 빈 공간 유지
                  ''
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}