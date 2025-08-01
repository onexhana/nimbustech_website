import { useState, useEffect } from 'react';

export default function HomeSection() {
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

  return (
    <section
      id="home"
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
        </div>
      </div>
    </section>
  );
}
