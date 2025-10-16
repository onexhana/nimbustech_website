import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHomeData } from "../../context/HomeContext";

interface ButtonItem {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  imagePath: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
  descriptionFontSize?: number;
}

interface InfiniteTextSliderProps {
  text: string;
  fontSize?: number;
  textColor?: string;
  duration?: number;
  gap?: number;
  coloredWords?: { [word: string]: string };
  fontWeight?: string | number;
  fontWeights?: { [word: string]: string | number };
}

// ✅ 끊김 없는 무한 텍스트 슬라이더
function InfiniteTextSlider({
  text,
  fontSize = 48,
  textColor = "#c2c2c2",
  duration = 20,
  gap = 100,
  coloredWords = {},
  fontWeight = 300,
  fontWeights = {},
}: InfiniteTextSliderProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수
  const getResponsiveFontSize = (baseSize: number) => {
    // 1920px 기준으로 비례 계산
    const ratio = screenWidth / 1920;
    const minSize = 0.5; // 최소 50%
    const maxSize = 1.2; // 최대 120%
    const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
    
    return Math.round(baseSize * clampedRatio);
  };

  // 반응형 폰트 크기 계산
  const responsiveFontSize = getResponsiveFontSize(fontSize);

  // 텍스트를 충분히 복사해서 끊김 없는 무한 루프 구현
  const repeatedText = Array(6).fill(text);

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
        }}
        animate={{ x: ["0%", "-500%"] }} // 6개 중 1개씩 이동으로 끊김 없는 반복
        transition={{
          duration: duration*5,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {repeatedText.map((txt, i) => (
          <span
            key={i}
            className="flex-none"
            style={{
              fontSize: `${responsiveFontSize}px`,
              lineHeight: "1.2",
              color: textColor,
              fontWeight: fontWeight,
            }}
          >
            {renderColoredText(txt)}
          </span>
        ))}
      </motion.div>

      {/* 좌우 페이드 효과 */}
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
    imagePath: "/popup_image/Mission&Vision.jpg",
    titleFontSize: 30,
    subtitleFontSize: 40,
    descriptionFontSize: 20,
  },
  {
    title: "Core Values",
    subtitle: "핵심가치",
    description: "고객과 함께 성장하는\n신뢰·책임·전문성의 가치",
    link: "/#about",
    imagePath: "/popup_image/Core Values.png",
    titleFontSize: 30,
    subtitleFontSize: 40,
    descriptionFontSize: 20,
  },
  {
    title: "Way of Working",
    subtitle: "일하는 방식",
    description: '모든 일의 궁극적인 목적은\n"고객창출" 곧 "고객성공"이다!',
    link: "/#about",
    imagePath: "/popup_image/Way of Working.jpg",
    titleFontSize: 30,
    subtitleFontSize: 40,
    descriptionFontSize: 20,
  },
  {
    title: "Employee Benefits",
    subtitle: "복지 혜택",
    description:
      "최고의 열정과 패기를 갖춘 인재들과\n함께 일하고 성장하는 기업",
    link: "/#about",
    imagePath: "/popup_image/Employee Benefits.jpg",
    titleFontSize: 30,
    subtitleFontSize: 40,
    descriptionFontSize: 20,
  },
];

// 줄바꿈 처리
function renderTextWithBreaks(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function HomeButton() {
  const { homeData } = useHomeData();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const checkMobile = () => {
      // 단순하고 예측 가능한 브레이크포인트(768px)로 복귀
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수 (타이핑 효과와 동일)
  const getResponsiveFontSize = (baseSize: number) => {
    // 1920px 기준으로 비례 계산
    const ratio = screenWidth / 1920;
    const minSize = 0.5; // 최소 50%
    const maxSize = 1.2; // 최대 120%
    const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
    
    return Math.round(baseSize * clampedRatio);
  };

  // ESC 키 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedIdx !== null) {
        setSelectedIdx(null);
      }
    };
    if (selectedIdx !== null) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx]);

  const handleCloseModal = () => setSelectedIdx(null);

  // 화면 크기에 따른 부드러운 마진 계산 함수
  const getResponsiveMarginTop = () => {
    // 화면 크기에 따라 조정하되, 최소한의 안전한 공간은 보장
    if (screenWidth >= 1920) {
      return 40; // 큰 화면: 40px
    } else if (screenWidth >= 1200) {
      return 35; // 중간 화면: 35px
    } else if (screenWidth >= 768) {
      return 30; // 작은 화면: 30px (최소 안전 공간)
    } else {
      return 30; // 모바일: 30px (최소 안전 공간 유지)
    }
  };

  const renderModal = () => {
    if (selectedIdx === null) return null;
    const selectedButton = homeData.buttonData[selectedIdx];
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999998,
        }}
        onClick={() => handleCloseModal()}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            maxWidth: "1024px",
            width: "100%",
            margin: "16px",
            maxHeight: "575px",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 10,
              backgroundColor: "white",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            aria-label="모달 닫기"
          >
            ✕
          </button>
          <div style={{ width: "100%" }}>
            <img
              src={homeData.buttonData[selectedIdx].imagePath}
              alt={selectedButton.subtitle}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxHeight: "85vh",
              }}
              onError={(e) => {
                console.error('이미지 로딩 실패:', homeData.buttonData[selectedIdx].imagePath);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('이미지 로딩 성공:', homeData.buttonData[selectedIdx].imagePath);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderModal()}
      <div className="w-full bg-white">
        <div className={`grid grid-cols-4 max-[767px]:grid-cols-2 border-t border-gray-200`}>
          {homeData.buttonData.map((btn, idx) => {
            const isSelected = selectedIdx === idx;
            const hoverColor = homeData.buttonStyles?.hoverColor || "#00A3E0";
            // 반응형 폰트 크기 적용
            // 모바일/데스크톱 구분 없이 연속 변화하도록 데스크톱 기준값만 사용
            const baseTitleSize = homeData.buttonStyles?.titleSizes?.desktop || 20;
            const baseSubtitleSize = homeData.buttonStyles?.subtitleSizes?.desktop || 40;
            const baseDescriptionSize = homeData.buttonStyles?.descriptionSizes?.desktop || 20;
            
            // 반응형 폰트 크기 계산
            const titleSize = getResponsiveFontSize(baseTitleSize);
            const subtitleSize = getResponsiveFontSize(baseSubtitleSize);
            const descriptionSize = getResponsiveFontSize(baseDescriptionSize);
            
            return (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`${isMobile ? 'aspect-square' : 'aspect-square'} w-full flex flex-col cursor-pointer justify-center p-8 text-center transition-colors border-b border-gray-200 group ${
                  isMobile 
                    ? (idx % 2 !== 1 ? "border-r" : "") // 모바일: 홀수 인덱스에만 오른쪽 경계선
                    : (idx !== homeData.buttonData.length - 1 ? "border-r" : "") // 데스크톱: 마지막이 아닌 경우
                } ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <div className="mb-2">
                  <h3
                    className="transition-colors group-hover:text-blue-600"
                    style={{ 
                      fontSize: `${titleSize}px`,
                      fontWeight: 450,
                      color: isSelected ? hoverColor : "#000000"
                    }}
                  >
                    {renderTextWithBreaks(btn.title)}
                  </h3>
                  <p
                    className="mt-1 transition-colors group-hover:text-blue-600"
                    style={{ 
                      fontSize: `${subtitleSize}px`,
                      fontWeight: 710,
                      color: isSelected ? hoverColor : "#000000"
                    }}
                  >
                    {renderTextWithBreaks(btn.subtitle)}
                  </p>
                </div>
                <p
                  className="mt-2 leading-tight transition-colors group-hover:text-blue-600"
                  style={{ 
                    fontSize: `${descriptionSize}px`,
                    color: isSelected ? hoverColor : "#6b7280"
                  }}
                >
                  {renderTextWithBreaks(btn.description)}
                </p>
              </div>
            );
          })}
        </div>

        {/* 무한 텍스트 슬라이더 */}
        <div className="w-full bg-gray-100" style={{ paddingTop: 'clamp(24px, 4vw, 64px)', paddingBottom: 'clamp(40px, 6vw, 96px)', marginTop: 'clamp(12px, 2.5vw, 24px)' }}>
          <InfiniteTextSlider
            text={homeData.sliderText || "LEADING CUSTOMER SUCCESS"}
            fontSize={getResponsiveFontSize(homeData.sliderTextSizes?.desktop || 110)}
            textColor={homeData.sliderTextColors?.defaultColor || "#c2c2c2"}
            duration={25}
            gap={50}
            fontWeight={300}
            coloredWords={homeData.sliderTextColors?.coloredWords || {
              "LEADING": "#b8e9ff",
              "CUSTOMER": "#18a8f1",
              "SUCCESS": "#b8e9ff"
            }}
            fontWeights={{
              LEADING: 700,
              CUSTOMER: 700,
              SUCCESS: 700,
            }}
          />
        </div>

        {/* 호버 효과를 위한 CSS */}
        <style>{`
          .group:hover h3,
          .group:hover p {
            color: ${homeData.buttonStyles?.hoverColor || "#00A3E0"} !important;
          }
        `}</style>
      </div>
    </>
  );
}