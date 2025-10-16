// src/components/Portfolio/PartnerLogoSlider_Mobile.tsx
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

type Logo = { src: string; alt: string };

type PartnerLogoSliderMobileProps = {
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

const COPIES_PER_HALF = 3; // 복사본 수를 줄여서 전체 너비 감소

// 고객사 로고 16개 자동 생성 (고화질)
const ROW1: Logo[] = Array.from({ length: 16 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return { src: `/고객사 & 파트너사_고화질/고객사${num}.png`, alt: `고객사${num}` };
});

// 파트너사 로고 21개 자동 생성 (고화질 - 모든 파일 PNG)
const ROW2: Logo[] = Array.from({ length: 21 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");  
  return { src: `/고객사 & 파트너사_고화질/파트너사${num}.png`, alt: `파트너사${num}` };
});

function MobileTrack({
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
        className="flex items-center whitespace-nowrap py-2"
        style={{ 
          columnGap: gap, 
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transform: "translateZ(0)",
          height: `${logoHeight + 16}px`, // 고정 높이 설정
          overflow: "hidden",
          width: "max-content" // 내용에 맞게 너비 설정
        }}
        animate={{ x: reverse ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ 
          duration: duration, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop",
          type: "tween"
        }}
      >
        {rollingSequence.map((logo, i) => {
          // 모바일용 개별 로고별 최적 컨테이너 크기 계산
          const getOptimalSize = (logoName) => {
            // 축소할 로고들 (더 작게)
            if (logoName.includes('조달청')) {
              return { width: logoHeight * 1.0, height: logoHeight }; // 조달청: 더 축소
            }
            if (logoName.includes('어빌리티') || logoName.includes('ABILITY')) {
              return { width: logoHeight * 1.0, height: logoHeight }; // 어빌리티시스템즈: 더 축소
            }
            if (logoName.includes('Aable') || logoName.includes('에이블')) {
              return { width: logoHeight * 1.0, height: logoHeight }; // Aable: 더 축소
            }
            if (logoName.includes('U.AI') || logoName.includes('U AI')) {
              return { width: logoHeight * 1.0, height: logoHeight }; // U.AI: 더 축소
            }
            
            // 확대할 로고들
            if (logoName.includes('대신정보통신')) {
              return { width: logoHeight * 2.2, height: logoHeight }; // 대신정보통신: 확대
            }
            
            // DB 로고들 (동일한 크기로 맞춤)
            if (logoName.includes('DB')) {
              return { width: logoHeight * 1.6, height: logoHeight }; // DB생명, DB손해보험: 동일 크기
            }
            
            // 기본값 (AJ렌탈 기준)
            return { width: logoHeight * 1.8, height: logoHeight };
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
                loading="eager"
              />
            </div>
          );
        })}
      </motion.div>
      {/* 그라데이션 페이드 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

function PartnerLogoSliderMobile({
  logoHeight = 17,  // 로고 크기를 1/3로 줄임 (기존 대비)
  gap = 20,         // 간격 더 좁게
  rowSpacing = 15,
  bottomSpacing = 15,
}: PartnerLogoSliderMobileProps) {
  // 모바일에서는 강제로 작은 크기 사용
  const mobileLogoHeight = 20;
  console.log('PartnerLogoSliderMobile 렌더링됨 - 원래 logoHeight:', logoHeight, '실제 사용:', mobileLogoHeight);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [settings, setSettings] = useState({
    speed: 300,
    textColor: "#374151",
    textSize: 23
  });

  // 화면 크기에 따른 부드러운 폰트 크기 계산 함수
  const getResponsiveFontSize = (baseSize: number) => {
    // 모바일: 768px 기준으로 비례 계산
    const ratio = screenWidth / 768;
    const minSize = 0.6; // 최소 60%
    const maxSize = 1.2; // 최대 120%
    const clampedRatio = Math.max(minSize, Math.min(maxSize, ratio));
    
    return Math.round(baseSize * clampedRatio);
  };

  // localStorage 변경 감지 및 화면 크기 감지
  useEffect(() => {
    const handleStorageChange = () => {
      // 로고슬라이드 설정 로드
      const savedSettings = localStorage.getItem('logoSliderSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings.mobile);
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
    
    // 로고슬라이드 설정 로드
    const savedSettings = localStorage.getItem('logoSliderSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings.mobile);
      } catch (error) {
        console.error('로고슬라이드 설정 로드 실패:', error);
      }
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 모바일에서는 설정에서 속도 가져오기
  const topDuration = settings.speed;
  const bottomDuration = settings.speed;

  const rows = [
    { logos: ROW1, duration: topDuration, reverse: false },
    { logos: [...ROW2].reverse(), duration: bottomDuration, reverse: true },
  ];

  // 반응형 텍스트 크기 계산
  const responsiveTextSize = getResponsiveFontSize(settings.textSize);

  return (
    <section aria-label="협력사 로고 슬라이더 (모바일)" className="w-full overflow-hidden">
      <p 
        className="text-center font-bold mb-8"
        style={{
          fontSize: `${responsiveTextSize}px`,
          color: settings.textColor,
          fontWeight: 600,
          marginTop: "50px",
          marginBottom: "50px",
          lineHeight: "1",
        }}
      >
        님버스테크와 함께 하고 있습니다
      </p>
      {rows.map((row, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : rowSpacing }}>
          <MobileTrack {...row} logoHeight={mobileLogoHeight} gap={gap} reverse={row.reverse} />
        </div>
      ))}
      {bottomSpacing > 0 && <div style={{ height: bottomSpacing }} />}
    </section>
  );
}

export default memo(PartnerLogoSliderMobile);
