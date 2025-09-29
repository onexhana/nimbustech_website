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

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setCustomerLogos(getCustomerLogos());
      setPartnerLogos(getPartnerLogos());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // 컴포넌트 마운트 시에도 다시 읽기
    setCustomerLogos(getCustomerLogos());
    setPartnerLogos(getPartnerLogos());
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const safeFactor = (v: number) => (v > 0 ? v : 1);
  
  const topDuration = durationTop / safeFactor(speedTop ?? speed);
  const bottomDuration = durationBottom / safeFactor(speedBottom ?? speed);

  const rows = [
    { logos: customerLogos, duration: topDuration },
    { logos: partnerLogos, duration: bottomDuration, reverse: true },
  ];

  return (
    <section aria-label="협력사 로고 슬라이더 (웹)" className="w-full">
      <p 
        className="text-center text-gray-700 mb-10"
        style={{
          fontSize: "clamp(28px, 3vw, 40px)",
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
        {rollingSequence.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="w-auto flex-none object-contain opacity-80 hover:opacity-100 transition"
            style={{ 
              height: logoHeight,
              width: 'auto',
              maxWidth: '300px',
              imageRendering: 'auto',
              filter: 'contrast(1.1) saturate(1.05)',
              objectFit: 'contain'
            }}
            loading="lazy"
          />
        ))}
      </motion.div>
      {/* 그라데이션 페이드 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}


export default memo(PartnerLogoSliderWeb);
