import { useState, useEffect } from 'react';

export default function HomeSection() {
<<<<<<< HEAD
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  const texts = [
    '고객을 빛나게',
    '구성원을 빛나게', 
    '미래를 빛나게',
    'NIMBUS TECH'
  ];

  const colors = ['text-black', 'text-black', 'text-black', 'text-[#00A3E0]'];

  useEffect(() => {
    const typingSpeed = 130;
    const pauseTime = 700;

    const timer = setTimeout(() => {
      if (currentCharIndex < texts[currentLineIndex].length) {
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        // 현재 줄 완성
        setCompletedLines(prev => [...prev, currentLineIndex]);
        
        // 잠시 대기 후 다음 줄로
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
=======
  const messages = ['고객을 빛나게', '구성원을 빛나게', '미래를 빛나게', 'NIMBUS TECH'];
  const [displayLines, setDisplayLines] = useState<string[]>(['', '', '', '']);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < messages.length) {
      if (currentCharIndex < messages[currentLineIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayLines((prev) => {
            const newLines = [...prev];
            newLines[currentLineIndex] = messages[currentLineIndex].slice(0, currentCharIndex + 1);
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 120);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 800);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentCharIndex, currentLineIndex, messages]);
>>>>>>> origin/feat/sumin-portfolio-contact

  return (
    <section
      id="home"
<<<<<<< HEAD
      className="w-full h-screen bg-white flex items-center justify-end pr-6 md:pr-20"
    >
      <div className="text-right">
        <div className="space-y-8">
          {texts.map((text, index) => (
            <div key={index} className="min-h-[20vh]">
              <span className={`text-[6vw] md:text-[8vw] lg:text-[10vw] xl:text-[12vw] font-extrabold tracking-tight ${colors[index]}`}>
                {completedLines.includes(index) ? (
                  // 완성된 줄
                  text
                ) : index === currentLineIndex ? (
                  // 현재 타이핑 중인 줄
                  <>
                    {text.substring(0, currentCharIndex)}
                    <span className="animate-pulse">|</span>
                  </>
                ) : (
                  // 아직 시작하지 않은 줄
                  ''
                )}
              </span>
            </div>
          ))}
=======
      className="w-full h-screen flex items-end justify-end bg-white pb-20 pr-10 md:pb-32 md:pr-20"
    >
      <div className="text-right">
        <div className="space-y-2 md:space-y-4">
          {displayLines.map((line, index) => {
            const showCursor =
              index === currentLineIndex &&
              currentCharIndex < messages[currentLineIndex].length;

            return (
              <div key={index} className="min-h-[1.2em]">
                <span
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold ${
                    index === 3 ? 'text-blue-400' : 'text-black'
                  }`}
                >
                  {line}
                  {showCursor && <span className="animate-pulse">|</span>}
                </span>
              </div>
            );
          })}
>>>>>>> origin/feat/sumin-portfolio-contact
        </div>
      </div>
    </section>
  );
}
