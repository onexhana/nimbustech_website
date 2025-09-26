import { useState, useEffect } from 'react';
import { useHomeData } from '../../context/HomeContext';

// 미니 타이핑 텍스트 컴포넌트
function MiniTypingText() {
  const { homeData } = useHomeData();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  const texts = homeData.typingTexts;
  const typingTextStyles = homeData.typingTextStyles || {
    colors: ['#000000', '#000000', '#000000', '#00A3E0'],
    fontWeights: [500, 500, 500, 700],
    desktopSizes: [100, 100, 100, 120],
    mobileSizes: [35, 35, 35, 48]
  };
  const { colors, fontWeights, desktopSizes } = typingTextStyles;

  useEffect(() => {
    const typingSpeed = 200;
    const pauseTime = 500;

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
  }, [currentCharIndex, currentLineIndex, texts]);

  return (
    <div className="text-right" style={{ padding: '16px' }}>
      {texts.map((text, index) => (
        <div key={index} style={{ marginBottom: '4px' }}>
          <span 
            style={{ 
              color: colors[index],
              fontWeight: fontWeights[index],
              fontSize: `${Math.max(12, desktopSizes[index] * 0.2)}px`,
              ...(index === 3 && { textShadow: '0 0 1px currentColor' })
            }}
          >    
            {completedLines.includes(index) ? (
              text
            ) : index === currentLineIndex ? (
              <>
                {text.substring(0, currentCharIndex)}
                <span style={{ opacity: 0.7 }}>|</span>
              </>
            ) : (
              <span style={{ opacity: 0 }}>{text}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// 미니 버튼 컴포넌트
function MiniButtons() {
  const { homeData } = useHomeData();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const hoverColor = homeData.buttonStyles?.hoverColor || "#00A3E0";
  const titleSize = Math.max(8, (homeData.buttonStyles?.titleSizes?.desktop || 30) * 0.3);
  const subtitleSize = Math.max(10, (homeData.buttonStyles?.subtitleSizes?.desktop || 40) * 0.25);
  const descriptionSize = Math.max(6, (homeData.buttonStyles?.descriptionSizes?.desktop || 20) * 0.3);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      borderTop: '1px solid #e5e7eb',
      fontSize: '4px'
    }}>
      {homeData.buttonData.map((btn, idx) => {
        const isSelected = selectedIdx === idx;
        
        return (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            style={{
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px',
              textAlign: 'center',
              borderRight: idx !== homeData.buttonData.length - 1 ? '1px solid #e5e7eb' : 'none',
              borderBottom: '1px solid #e5e7eb',
              background: isSelected ? '#f3f4f6' : 'white',
              cursor: 'pointer'
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <div
                style={{ 
                  fontSize: `${titleSize}px`,
                  fontWeight: 'bold',
                  color: isSelected ? hoverColor : "#00A3E0",
                  marginBottom: '2px',
                  lineHeight: '1.2'
                }}
              >
                {btn.title.replace(/\n/g, ' ')}
              </div>
              <div
                style={{ 
                  fontSize: `${subtitleSize}px`,
                  fontWeight: 'bold',
                  color: isSelected ? hoverColor : "#000000",
                  marginBottom: '2px',
                  lineHeight: '1.2'
                }}
              >
                {btn.subtitle.replace(/\n/g, ' ')}
              </div>
            </div>
            <div
              style={{ 
                fontSize: `${descriptionSize}px`,
                color: isSelected ? hoverColor : "#6b7280",
                lineHeight: '1.3'
              }}
            >
              {btn.description.length > 40 ? btn.description.substring(0, 40) + '...' : btn.description.replace(/\n/g, ' ')}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 미니 슬라이더 컴포넌트
function MiniSlider() {
  const { homeData } = useHomeData();
  
  const renderColoredText = (txt: string) => {
    const coloredWords = homeData.sliderTextColors?.coloredWords || {};
    const defaultColor = homeData.sliderTextColors?.defaultColor || "#c2c2c2";
    
    return txt.split(" ").map((word, idx) => {
      const color = coloredWords[word] || defaultColor;
      return (
        <span key={idx} style={{ color, fontWeight: 'bold' }}>
          {word}&nbsp;
        </span>
      );
    });
  };

  const text = homeData.sliderText || "LEADING CUSTOMER SUCCESS";
  const fontSize = Math.max(12, (homeData.sliderTextSizes?.desktop || 110) * 0.12);
  const repeatedText = Array(3).fill(text);

  return (
    <div style={{ 
      padding: '12px 0', 
      background: '#f1f5f9',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div 
        style={{
          display: 'flex',
          gap: '20px',
          whiteSpace: 'nowrap',
          animation: 'miniSlide 15s linear infinite'
        }}
      >
        {repeatedText.map((txt, i) => (
          <span
            key={i}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: "1.2",
              fontWeight: 300,
            }}
          >
            {renderColoredText(txt)}
          </span>
        ))}
      </div>
      
      {/* 좌우 그라데이션 페이드 효과 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '30px',
        height: '100%',
        background: 'linear-gradient(to right, rgba(241, 245, 249, 0.9), transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '30px',
        height: '100%',
        background: 'linear-gradient(to left, rgba(241, 245, 249, 0.9), transparent)',
        pointerEvents: 'none'
      }} />
      
      <style>{`
        @keyframes miniSlide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-300%); }
        }
      `}</style>
    </div>
  );
}

// 메인 미니 미리보기 컴포넌트
export default function MiniPreview() {
  return (
    <div style={{ 
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      height: '400px',
      position: 'relative'
    }}>
      {/* 상단 네비게이션 바 */}
      <div style={{
        height: '40px',
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
      }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          color: '#00A3E0' 
        }}>
          NIMBUS TECH
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          fontSize: '10px', 
          color: '#00A3E0' 
        }}>
          <span>Home</span>
          <span>About</span>
          <span>Portfolio</span>
          <span>Contact</span>
        </div>
      </div>

      {/* 홈 섹션 */}
      <div style={{ 
        height: '180px',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '20px'
      }}>
        <MiniTypingText />
      </div>
      
      {/* 버튼 섹션 */}
      <div style={{ height: '140px' }}>
        <MiniButtons />
      </div>
      
      {/* 슬라이더 섹션 */}
      <div style={{ height: '40px' }}>
        <MiniSlider />
      </div>
    </div>
  );
}
