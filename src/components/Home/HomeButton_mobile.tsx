import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHomeData } from "../../context/HomeContext";

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
  duration = 2,
  gap = 100,
  coloredWords = {},
  fontWeight = 300,
  fontWeights = {}
}: InfiniteTextSliderProps) {
  // 텍스트를 3개 복사해서 끊김 없는 무한 루프 구현
  const repeatedText = Array(3).fill(text);

  // 단어 색상/두께 처리
  const renderColoredText = (txt: string) => {
    return txt.split(" ").map((word, idx) => {
      const color = coloredWords[word] || textColor;
      const weight = fontWeights[word] || fontWeight;
      return (
        <span key={idx} style={{ color, fontWeight: weight }}>
          {word}&nbsp;
        </span>
      );
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap"
        style={{ 
          columnGap: gap,
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          WebkitPerspective: "1000px"
        }}
        animate={{ x: ["0%", "-500%"] }} // 3개 중 1개씩 이동으로 끊김 없는 반복
        transition={{ 
          duration: duration*5,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
          type: "tween",
          times: [0, 1]
        }}
      >
        {repeatedText.map((txt, i) => {
          return (
            <span
              key={i}
              className="flex-none"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: "1.2",
                color: textColor,
                fontWeight: fontWeight,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
                willChange: "transform"
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
    imagePath: "/popup_image_mobile/Core Values_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
  {
    title: "Way of Working",
    subtitle: "일하는 방식",
    description: '모든 일의 궁극적인 목적은\n"고객창출" 곧 "고객성공"이다!',
    link: "/#about",
    imagePath: "/popup_image_mobile/Way of Working_mobile.png",
    titleFontSize: 20,
    subtitleFontSize: 28,
    descriptionFontSize: 14,
  },
  {
    title: "Employee Benefits",
    subtitle: "복지 혜택",
    description: "최고의 열정과 패기를\n갖춘 인재들과 함께\n일하고 성장하는 기업",
    link: "/#about",
    imagePath: "/popup_image_mobile/Employee Benefits_mobile.png",
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

interface HomeButtonMobileProps {
  topOffset?: string; // e.g. '-40vh'
  marginTopSpacing?: string; // e.g. '2rem'
  marginBottomSpacing?: string; // e.g. '2rem'
}
// Add spacing props for flexible positioning
export default function HomeButtonMobile({ topOffset = '-40vh', marginTopSpacing = '2rem', marginBottomSpacing = '2rem' }: HomeButtonMobileProps) {
  const { homeData } = useHomeData();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  // localStorage에서 모바일 이미지 경로 읽기
  const getMobileImagePaths = () => {
    const defaultPaths = [
      "/popup_image_mobile/Mission&Vision_mobile.png",
      "/popup_image_mobile/Core Values_mobile.png",
      "/popup_image_mobile/Way of Working_mobile.png",
      "/popup_image_mobile/Employee Benefits_mobile.png"
    ];
    
    try {
      const savedPaths = localStorage.getItem('mobileImagePaths');
      return savedPaths ? JSON.parse(savedPaths) : defaultPaths;
    } catch {
      return defaultPaths;
    }
  };
  
  const [mobileImagePaths, setMobileImagePaths] = useState(getMobileImagePaths());

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setMobileImagePaths(getMobileImagePaths());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // 컴포넌트 마운트 시에도 다시 읽기
    setMobileImagePaths(getMobileImagePaths());
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
    const selectedButton = homeData.buttonData[idx];
    
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
          
          {/* 이미지 컨테이너 - 고정 비율로 모든 기종에서 동일하게 */}
          <div 
          style={{
            width: '100%', 
            height: '100%',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            position: 'relative'
          }}
          onClick={handleCloseModal}>
            
            <img
              src={mobileImagePaths[selectedIdx]}
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
      <div className="w-full bg-white border-t border-gray-300" style={{ position: 'relative', top: topOffset, marginTop: marginTopSpacing, marginBottom: marginBottomSpacing }}>
        {/* 모바일용 2x2 그리드 - 동일한 크기로 분할 */}
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {/* 내부 세로 구분선 (상단 두 카드 사이) */}
          <div style={{ position: 'absolute', top: 0, left: '50%', bottom: '50%', borderLeft: '1px solid #d1d5db' }} />
          {/* 내부 세로 구분선 (하단 두 카드 사이) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', bottom: 0, borderLeft: '1px solid #d1d5db' }} />
          {/* 내부 가로 구분선 (중간) - 반응형으로 수정 */}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #d1d5db' }} />
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gridTemplateRows: '1fr 1fr', 
            width: '100%', 
            maxWidth: '1000px',
            height: '100%' 
          }}>
          {homeData.buttonData.map((btn, idx) => {
            const isSelected = selectedIdx === idx;
            const hoverColor = homeData.buttonStyles?.hoverColor || "#00A3E0";
            const titleSize = homeData.buttonStyles?.titleSizes?.mobile || 20;
            const subtitleSize = homeData.buttonStyles?.subtitleSizes?.mobile || 28;
            const descriptionSize = homeData.buttonStyles?.descriptionSizes?.mobile || 14;
            
            return (
              <div
                key={idx}
                onClick={() => handleButtonClick(idx)}
                className={`flex flex-col cursor-pointer justify-center items-center transition-colors border-gray-300 group ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  padding: '20px 16px',
                  boxSizing: 'border-box'
                }}
              >
                <div className="text-center">
                  <h3
                    className="transition-colors group-hover:text-blue-600"
                    style={{ 
                      fontSize: `${titleSize}px`, 
                      fontWeight: 450,
                      marginBottom: '8px',
                      color: isSelected ? hoverColor : "#4a5568"
                    }}
                  >
                    {renderTextWithBreaks(btn.title)}
                  </h3>
                  <p
                    className="transition-colors group-hover:text-blue-600"
                    style={{ 
                      fontSize: `${subtitleSize}px`, 
                      fontWeight: 710,
                      marginBottom: '12px',
                      color: isSelected ? hoverColor : "#000000"
                    }}
                  >
                    {renderTextWithBreaks(btn.subtitle)}
                  </p>
                  <p
                    className="transition-colors text-center group-hover:text-blue-600"
                    style={{ 
                      fontSize: `${descriptionSize}px`, 
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                      wordBreak: 'keep-all',
                      color: isSelected ? hoverColor : "#6b7280"
                    }}
                  >
                    {renderTextWithBreaks(btn.description)}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
          {/* 내부 하단 가로 구분선 - 반응형으로 수정 */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #000000' }} />
        </div>
        {/* 모바일용 무한 텍스트 슬라이더 */}
        <div className="w-full py-12 bg-gray-100" style={{ marginTop: '30px', marginBottom: '120px' }}> 
          <InfiniteTextSlider 
            text={homeData.sliderText || "LEADING CUSTOMER SUCCESS"}
            fontSize={homeData.sliderTextSizes?.mobile || 60}
            textColor={homeData.sliderTextColors?.defaultColor || "#c2c2c2"}
            duration={15}
            gap={10}
            fontWeight={300}
            coloredWords={homeData.sliderTextColors?.coloredWords || {
              "LEADING": "#b8e9ff",
              "CUSTOMER": "#18a8f1",
              "SUCCESS": "#b8e9ff"
            }}
            fontWeights={{
              "LEADING": 700,
              "CUSTOMER": 700,
              "SUCCESS": 700
            }}
          />
        </div>

        {/* 호버 효과를 위한 CSS */}
        <style>{`
          .group:hover h3,
          .group:hover p {
            color: ${homeData.buttonStyles?.hoverColor || "#00A3E0"} !important;
          }
          
          /* X 버튼 색상 통일 */
          button[aria-label="모달 닫기"] {
            color: #333333 !important;
          }
          
          button[aria-label="모달 닫기"]:hover {
            color: #000000 !important;
          }
        `}</style>
      </div>
    </>
  );
}
