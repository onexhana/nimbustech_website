import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ButtonItem {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  imagePath: string;
  titleFontSize?: number;    // px 단위
  subtitleFontSize?: number; // px 단위  
  descriptionFontSize?: number; // px 단위
}

// 무한 슬라이더 컴포넌트 props 타입
interface InfiniteTextSliderProps {
  text: string;
  fontSize?: number; // px 단위로 변경
  textColor?: string;
  duration?: number;
  gap?: number;
  coloredWords?: { [word: string]: string }; // 특정 단어별 색상 지정
  fontWeight?: string | number; // 기본 글씨 두께
  fontWeights?: { [word: string]: string | number }; // 특정 단어별 글씨 두께
}

// 무한 텍스트 슬라이더 컴포넌트
function InfiniteTextSlider({ 
  text, 
  fontSize = 48, // px 단위 기본값
  textColor = "text-gray-300", 
  duration = 20,
  gap = 100,
  coloredWords = {},
  fontWeight = 300,
  fontWeights = {}
}: InfiniteTextSliderProps) {
  // 텍스트를 여러 번 복제하여 무한 스크롤 효과 생성
  const repeatedText = Array(6).fill(text);

  // 텍스트를 단어별로 분할하고 색상/두께를 적용하는 함수
  const renderColoredText = (txt: string) => {
    // coloredWords와 fontWeights가 모두 비어있으면 기존 방식으로 렌더링
    if (Object.keys(coloredWords).length === 0 && Object.keys(fontWeights).length === 0) {
      return txt.split('\n').map((line: string, lineIndex: number, array: string[]) => (
        <span key={lineIndex}>
          {line}
          {lineIndex < array.length - 1 && <br />}
        </span>
      ));
    }

    // 단어별로 색상과 두께 적용
    let processedText = txt;
    const wordElements: React.ReactNode[] = [];
    
    // 모든 특별한 단어들을 수집 (색상이나 두께가 지정된 단어들)
    const specialWords = new Set([...Object.keys(coloredWords), ...Object.keys(fontWeights)]);
    
    // 각 특별한 단어를 찾아서 마킹
    specialWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      processedText = processedText.replace(regex, `||${word}||SPECIAL||`);
    });

    // 처리된 텍스트를 파싱하여 JSX 요소로 변환
    const parts = processedText.split('||');
    for (let i = 0; i < parts.length; i += 3) {
      const beforeText = parts[i];
      const specialWord = parts[i + 1];
      const marker = parts[i + 2];

      // 일반 텍스트 추가
      if (beforeText) {
        wordElements.push(
          <span 
            key={`text-${i}`} 
            style={{ 
              color: textColor.startsWith('#') || textColor.startsWith('rgb') ? textColor : undefined,
              fontWeight: fontWeight
            }}
          >
            {beforeText}
          </span>
        );
      }

      // 특별한 단어 (색상이나 두께가 적용된 단어) 추가
      if (specialWord && marker === 'SPECIAL') {
        const wordColor = coloredWords[specialWord] || (textColor.startsWith('#') || textColor.startsWith('rgb') ? textColor : undefined);
        const wordWeight = fontWeights[specialWord] || fontWeight;
        
        wordElements.push(
          <span 
            key={`special-${i}`} 
            style={{ 
              color: wordColor,
              fontWeight: wordWeight
            }}
          >
            {specialWord}
          </span>
        );
      }
    }

    return wordElements;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap"
        style={{ 
          columnGap: gap,
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transform: "translateZ(0)"
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop",
          type: "tween"
        }}
      >
        {repeatedText.map((txt, i) => {
          return (
            <span
              key={i}
              className="flex-none"
              style={{ 
                fontSize: `${fontSize}px`,
                lineHeight: '1.2',
                ...(Object.keys(coloredWords).length === 0 && Object.keys(fontWeights).length === 0 ? { 
                  color: textColor.startsWith('#') || textColor.startsWith('rgb') ? textColor : undefined,
                  fontWeight: fontWeight
                } : {})
              }}
            >
              {renderColoredText(txt)}
            </span>
          );
        })}
      </motion.div>
      {/* 그라데이션 페이드 효과 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-100 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-100 to-transparent" />
    </div>
  );
}

const buttons: ButtonItem[] = [
  {
    title: "Mission&Vision",
    subtitle: "미션&비전",
    description: "우리의 존재 이유와\n향하는 미래를 담습니다.",
    link: "/#about",
    imagePath: "/popup_image_mobile/Mission&Vision_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
  {
    title: "Core Values",
    subtitle: "핵심가치",
    description: "고객과 함께 성장하는\n신뢰·책임·전문성의 가치",
    link: "/#about",
    imagePath: "/popup_image_mobile/Core%20Values_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
  {
    title: "Way of Working",
    subtitle: "일하는 방식",
    description: '모든 일의 궁극적인 목적은\n"고객창출" 곧 "고객성공"이다!',
    link: "/#about",
    imagePath: "/popup_image_mobile/Way%20of%20Working_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
  {
    title: "Employee Benefits",
    subtitle: "복지 혜택",
    description: "최고의 열정과 패기를\n갖춘 인재들과 함께\n일하고 성장하는 기업",
    link: "/#about",
    imagePath: "/popup_image_mobile/Employee%20Benefits_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
];

// 줄바꿈 처리 함수
function renderTextWithBreaks(text: string) {
  return text.split('\n').map((line: string, lineIndex: number, array: string[]) => (
    <span key={lineIndex}>
      {line}
      {lineIndex < array.length - 1 && <br />}
    </span>
  ));
}

export default function HomeButtonMobile() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedIdx !== null) {
        setSelectedIdx(null);
      }
    };

    if (selectedIdx !== null) {
      document.addEventListener('keydown', handleEscKey);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIdx]);

  const handleCloseModal = () => {
    setSelectedIdx(null);
  };

  const handleButtonClick = (idx: number) => {
    setSelectedIdx(idx);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderModal = () => {
    if (selectedIdx === null) return null;
    const idx = selectedIdx;
    const selectedButton = buttons[idx];
    
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999998,
          padding: '16px'
        }}
        onClick={handleBackdropClick}
      >
        <div 
          style={{
            position: 'relative',
            backgroundColor: 'transparent', // 배경을 투명하게
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            width: '90vw',
            height: '80vh',
            maxWidth: '400px',
            maxHeight: '600px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* X 버튼 */}
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 10,
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            aria-label="모달 닫기"
          >
            ✕
          </button>
          
          {/* 이미지 컨테이너 - 고정 비율로 모든 기종에서 동일하게 */}
          <div style={{ 
            width: '100%', 
            height: '100%',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0'
          }}>
            <img
              src={selectedButton.imagePath}
              alt={selectedButton.subtitle}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', // 이미지가 잘리지 않도록 contain으로 변경
                display: 'block',
                borderRadius: '8px' // 모달과 동일한 둥근 모서리
              }}
              onLoad={() => {}}
              onError={() => {}}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderModal()}
      <div className="w-full bg-white" style={{ marginTop: '-540px', position: 'relative' }}>
        {/* 모바일용 2x2 그리드 - 동일한 크기로 분할 */}
        <div className="border border-gray-300" style={{ width: '390px', height: '440px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gridTemplateRows: '1fr 1fr', 
            width: '100%', 
            height: '100%' 
          }}>
          {buttons.map((btn, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleButtonClick(idx)}
                className={`flex flex-col cursor-pointer justify-center items-center transition-colors border-gray-300 group ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  padding: '20px 16px',
                  borderRight: idx % 2 === 0 ? '1px solid #d1d5db' : 'none',
                  borderBottom: idx < 2 ? '1px solid #d1d5db' : 'none',
                  boxSizing: 'border-box'
                }}
              >
                <div className="text-center">
                  <h3
                    className={`font-semibold transition-colors ${
                      isSelected
                        ? "text-[#00A3E0]"
                        : "text-[#4a5568] group-hover:text-[#00A3E0]"
                    }`}
                    style={{ fontSize: '18px', marginBottom: '8px' }}
                  >
                    {renderTextWithBreaks(btn.title)}
                  </h3>
                  <p
                    className={`font-bold transition-colors ${
                      isSelected
                        ? "text-[#00A3E0]"
                        : "text-black group-hover:text-[#00A3E0]"
                    }`}
                    style={{ fontSize: '24px', marginBottom: '12px' }}
                  >
                    {renderTextWithBreaks(btn.subtitle)}
                  </p>
                  <p
                    className={`transition-colors text-center ${
                      isSelected
                        ? "text-[#00A3E0]"
                        : "text-gray-600 group-hover:text-[#00A3E0]"
                    }`}
                    style={{ 
                      fontSize: '12px', 
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                      wordBreak: 'keep-all'
                    }}
                  >
                    {renderTextWithBreaks(btn.description)}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
        </div>
        {/* 모바일용 무한 텍스트 슬라이더 */}
        <div className="w-full py-12 bg-gray-100" style={{ marginTop: '30px' }}> 
          <InfiniteTextSlider 
            text="LEADINGCUSTOMERSUCESS"
            fontSize={60}
            textColor="#c2c2c2"
            duration={25}
            gap={10}
            fontWeight={300}
            coloredWords={{
              "LEADING": "#b8e9ff",
              "CUSTOMER": "#18a8f1",
              "SUCESS": "#b8e9ff"
            }}
            fontWeights={{
              "LEADING": 700,
              "CUSTOMER": 700,
              "SUCESS": 700
            }}
          />
        </div>

        {/* 호버 효과를 위한 CSS */}
        <style jsx>{`
          .group:hover h3,
          .group:hover p {
            color: #00A3E0 !important;
          }
        `}</style>
      </div>
    </>
  );
}
