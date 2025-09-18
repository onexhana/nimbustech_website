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
        {rollingSequence.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="flex-none object-contain opacity-80 hover:opacity-100 transition"
             style={{ 
               height: `${logoHeight}px !important`,
               width: 'auto',
               maxWidth: 'none',
               maxHeight: `${logoHeight}px`,
               minHeight: `${logoHeight}px`,
               imageRendering: 'auto',
               filter: 'contrast(1.1) saturate(1.05)',
               objectFit: 'contain',
               verticalAlign: 'middle',
               display: 'inline-block'
             }}
            loading="eager"
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
  logoHeight = 17,  // 로고 크기를 1/3로 줄임 (기존 대비)
  gap = 20,         // 간격 더 좁게
  rowSpacing = 15,
  bottomSpacing = 15,
}: PartnerLogoSliderMobileProps) {
  // 모바일에서는 강제로 작은 크기 사용
  const mobileLogoHeight = 20;
  console.log('PartnerLogoSliderMobile 렌더링됨 - 원래 logoHeight:', logoHeight, '실제 사용:', mobileLogoHeight);

  // 모바일에서는 고정된 느린 속도 사용 (부모 props 무시)
  const topDuration = 300; // 모바일 전용 매우 느린 속도
  const bottomDuration = 300; // 모바일 전용 매우 느린 속도

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
