// src/components/Portfolio/PartnerLogoSlider_Mobile.tsx
import { memo } from "react";
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

const COPIES_PER_HALF = 6;

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
        className="flex items-center min-w-[200%] whitespace-nowrap py-2"
        style={{ 
          columnGap: gap, 
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transform: "translateZ(0)"
        }}
        animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
        transition={{ 
          duration: duration, 
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
               height: `${logoHeight}px`,
               width: 'auto',
               maxWidth: 'none',
               imageRendering: 'auto',
               filter: 'contrast(1.1) saturate(1.05)',
               objectFit: 'contain'
             }}
            loading="lazy"
          />
        ))}
      </motion.div>
      {/* 그라데이션 페이드 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

function PartnerLogoSliderMobile({
  logoHeight = 10,  // 로고 크기 (픽셀 단위로 변경: 8rem → 40px)
  gap = 20,         // 간격 더 좁게
  durationTop = 6, // 속도 더 빠르게
  durationBottom = 8,
  rowSpacing = 15,
  bottomSpacing = 15,
  speed = 4,        // 속도 더 빠르게
  speedTop,
  speedBottom,
}: PartnerLogoSliderMobileProps) {

  const safeFactor = (v: number) => (v > 0 ? v : 1);
  
  const topDuration = durationTop / safeFactor(speedTop ?? speed);
  const bottomDuration = durationBottom / safeFactor(speedBottom ?? speed);

  const rows = [
    { logos: ROW1, duration: topDuration, reverse: false },
    { logos: [...ROW2].reverse(), duration: bottomDuration, reverse: true },
  ];

  return (
    <section aria-label="협력사 로고 슬라이더 (모바일)" className="w-full overflow-hidden">
      <p 
        className="text-center font-bold text-gray-700 mb-8"
        style={{
          fontSize: "23px",
          fontWeight: 600,
          marginTop: "100px",
          marginBottom: "50px",
          lineHeight: "1",
        }}
      >
        님버스테크와 함께 하고 있습니다
      </p>
      {rows.map((row, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : rowSpacing }}>
          <MobileTrack {...row} logoHeight={logoHeight} gap={gap} reverse={row.reverse} />
        </div>
      ))}
      {bottomSpacing > 0 && <div style={{ height: bottomSpacing }} />}
    </section>
  );
}

export default memo(PartnerLogoSliderMobile);
