// src/components/Portfolio/PartnerLogoSlider_Web.tsx
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

type Logo = { src: string; alt: string };

type PartnerLogoSliderWebProps = {
  logoHeight?: number;
  gap?: number;
  durationTop?: number;
  durationBottom?: number;
  rowSpacing?: number;
  bottomSpacing?: number;
  speed?: number;
  speedTop?: number;
  speedBottom?: number;
};

const COPIES_PER_HALF = 4;

// 고객사 로고 16개 - localStorage에서 읽어오거나 기본값 사용
const getCustomerLogos = (): Logo[] => {
  try {
    const savedLogos = localStorage.getItem('customerLogos');
    if (savedLogos) {
      const paths = JSON.parse(savedLogos);
      return paths.map((path: string, i: number) => ({
        src: path,
        alt: `고객사${String(i + 1).padStart(2, "0")}`
      }));
    }
  } catch (error) {
    console.error('고객사 로고 데이터 로딩 실패:', error);
  }
  
  // 기본값 반환
  return Array.from({ length: 16 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return { src: `/고객사 & 파트너사_고화질/고객사${num}.png`, alt: `고객사${num}` };
  });
};

// 파트너사 로고 21개 - localStorage에서 읽어오거나 기본값 사용
const getPartnerLogos = (): Logo[] => {
  try {
    const savedLogos = localStorage.getItem('partnerLogos');
    if (savedLogos) {
      const paths = JSON.parse(savedLogos);
      return paths.map((path: string, i: number) => ({
        src: path,
        alt: `파트너사${String(i + 1).padStart(2, "0")}`
      }));
    }
  } catch (error) {
    console.error('파트너사 로고 데이터 로딩 실패:', error);
  }
  
  // 기본값 반환
  return Array.from({ length: 21 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");  
    return { src: `/고객사 & 파트너사_고화질/파트너사${num}.png`, alt: `파트너사${num}` };
  });
};

function PartnerLogoSliderWeb({
  logoHeight = 50,
  gap = 80,
  durationTop = 50,
  durationBottom = 50,
  rowSpacing = 55,
  bottomSpacing = 30,
  speed = 1,
  speedTop,
  speedBottom,
}: PartnerLogoSliderWebProps) {
  
  const [customerLogos, setCustomerLogos] = useState<Logo[]>(getCustomerLogos());
  const [partnerLogos, setPartnerLogos] = useState<Logo[]>(getPartnerLogos());
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [settings, setSettings] = useState({
    speed: 50,
    textColor: "#374151",
    textSize: 40
  });

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수
  const getResponsiveFontSize = (baseSize: number) => {
    // 데스크톱: 1920px 기준으로 비례 계산
    const ratio = screenWidth / 1920;
    const minSize = 0.6; // 최소 60%
    const maxSize = 1.2; // 최대 120%
    const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
    
    return Math.round(baseSize * clampedRatio);
  };

  // 모바일 직전 구간(<= 767px)에선 로고 최소 크기 보장 (보이는 섹션에서 사용될 수 있음)
  const getResponsiveLogoHeight = (base: number) => {
    if (screenWidth < 768) {
      return Math.round(Math.max(base, 28));
    }
    return base;
  };

  // localStorage 변경 감지 및 화면 크기 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setCustomerLogos(getCustomerLogos());
      setPartnerLogos(getPartnerLogos());
      
      // 로고슬라이드 설정 로드
      const savedSettings = localStorage.getItem('logoSliderSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings.web);
        } catch (error) {
          console.error('로고슬라이드 설정 로드 실패:', error);
        }
      }
    };

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 마운트 시에도 다시 읽기
    setCustomerLogos(getCustomerLogos());
    setPartnerLogos(getPartnerLogos());
    
    // 로고슬라이드 설정 로드
    const savedSettings = localStorage.getItem('logoSliderSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings.web);
      } catch (error) {
        console.error('로고슬라이드 설정 로드 실패:', error);
      }
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const safeFactor = (v: number) => (v > 0 ? v : 1);
  
  const topDuration = settings.speed / safeFactor(speedTop ?? speed);
  const bottomDuration = settings.speed / safeFactor(speedBottom ?? speed);

  const rows = [
    { logos: customerLogos, duration: topDuration },
    { logos: partnerLogos, duration: bottomDuration, reverse: true },
  ];

  // 반응형 텍스트 크기 계산
  const responsiveTextSize = getResponsiveFontSize(settings.textSize);

  return (
    <section aria-label="협력사 로고 슬라이더 (웹)" className="w-full">
      <p 
        className="text-center mb-10"
        style={{
          fontSize: `${responsiveTextSize}px`,
          color: settings.textColor,
          fontWeight: 600,
          marginTop: "120px",
          marginBottom: "80px",
          lineHeight: "1.4",
        }}
      >
        님버스테크와 함께 하고 있습니다
      </p>
      {rows.map((row, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : rowSpacing }}>
          <WebTrack {...row} logoHeight={logoHeight} gap={gap} />
        </div>
      ))}
      {bottomSpacing > 0 && <div style={{ height: bottomSpacing }} />}
    </section>
  );
}

function WebTrack({
  logos,
  duration = 28,
  reverse = false,
  logoHeight,
  gap,
}: {
  logos: Logo[];
  duration?: number;
  reverse?: boolean;
  logoHeight: number;
  gap: number;
}) {
  const rollingSequence = Array(COPIES_PER_HALF * 2)
    .fill(logos)
    .flat();

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center min-w-[200%] whitespace-nowrap py-2"
        style={{ 
          columnGap: gap, 
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transform: "translateZ(0)"
        }}
        animate={{ x: reverse ? ["-200%", "0%"] : ["0%", "-200%"] }}
        transition={{ 
          duration: duration * 5, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop",
          type: "tween"
        }}
      >
        {rollingSequence.map((logo, i) => {
          // 개별 로고별 최적 컨테이너 크기 계산
          const getOptimalSize = (logoName: string) => {
            // 축소할 로고들 (더 작게)
            if (logoName.includes('조달청')) {
              return { width: logoHeight * 1.2, height: logoHeight }; // 조달청: 더 축소
            }
            if (logoName.includes('어빌리티') || logoName.includes('ABILITY')) {
              return { width: logoHeight * 1.2, height: logoHeight }; // 어빌리티시스템즈: 더 축소
            }
            if (logoName.includes('Aable') || logoName.includes('에이블')) {
              return { width: logoHeight * 1.2, height: logoHeight }; // Aable: 더 축소
            }
            if (logoName.includes('U.AI') || logoName.includes('U AI')) {
              return { width: logoHeight * 1.2, height: logoHeight }; // U.AI: 더 축소
            }
            
            // 확대할 로고들
            if (logoName.includes('대신정보통신')) {
              return { width: logoHeight * 2.8, height: logoHeight }; // 대신정보통신: 확대
            }
            
            // DB 로고들 (동일한 크기로 맞춤)
            if (logoName.includes('DB')) {
              return { width: logoHeight * 2.0, height: logoHeight }; // DB생명, DB손해보험: 동일 크기
            }
            
            // 기본값 (AJ렌탈 기준)
            return { width: logoHeight * 2.2, height: logoHeight };
          };

          const containerSize = getOptimalSize(logo.alt);

          return (
            <div
              key={`${logo.alt}-${i}`}
              className="flex-none flex items-center justify-center"
              style={{
                width: containerSize.width,
                height: containerSize.height,
                minWidth: containerSize.width,
                minHeight: containerSize.height
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain opacity-80 hover:opacity-100 transition"
                style={{ 
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  imageRendering: 'auto',
                  filter: 'contrast(1.1) saturate(1.05)',
                  objectFit: 'contain'
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </motion.div>
      {/* 그라데이션 페이드 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}


export default memo(PartnerLogoSliderWeb);
