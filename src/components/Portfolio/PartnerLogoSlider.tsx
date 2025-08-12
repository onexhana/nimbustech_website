// src/components/Portfolio/PartnerLogoSlider.tsx
import { memo } from "react";
import { motion } from "framer-motion";

type Logo = { src: string; alt: string };

/**
 * 파트너 로고 슬라이더 설정값
 * - 숫자 단위는 px/초 기준입니다.
 */
type PartnerLogoSliderProps = {
  /** 각 로고 높이(px). 기본 24 */
  logoHeight?: number;
  /** 로고 간 가로 간격(px). 기본 16 */
  gap?: number;
  /** 윗줄 1회 진행 시간(초). 값이 클수록 느려짐. 기본 28 */
  durationTop?: number;
  /** 아랫줄 1회 진행 시간(초). 값이 클수록 느려짐. 기본 32 */
  durationBottom?: number;
  /** 두 줄 사이의 세로 간격(px). 기본 16 */
  rowSpacing?: number;
  /** 두 번째 줄 하단 여백(px). 기본 0 */
  bottomSpacing?: number;
  /** 공통 배속. 1은 기본, 2는 2배 빠르게, 0.5는 절반 속도 */
  speed?: number;
  /** 윗줄 배속(미지정 시 speed 사용) */
  speedTop?: number;
  /** 아랫줄 배속(미지정 시 speed 사용) */
  speedBottom?: number;
};

/** 화면을 충분히 채우기 위해 한 절반(half)에 logos를 몇 번 반복할지 지정 */
const COPIES_PER_HALF = 4;

//로고 예시 나중에 바꿔야함
const ROW1: Logo[] = [
  { src: "/LogoSlider_example/free-icon-amazon-pay.png", alt: "Amazon Pay" },
  { src: "/LogoSlider_example/free-icon-github-logo.png", alt: "GitHub" },
  { src: "/LogoSlider_example/free-icon-google.png", alt: "Google" },
  { src: "/LogoSlider_example/free-icon-instagram.png", alt: "Instagram" }, 
  { src: "/LogoSlider_example/free-icon-netflix.png", alt: "Netflix" }, //로고 예시 나중에 바꿔야함
];

const ROW2: Logo[] = [
  { src: "/LogoSlider_example/free-icon-tik-tok.png", alt: "TikTok" },
  { src: "/LogoSlider_example/free-icon-visa.png", alt: "Visa" },
  { src: "/LogoSlider_example/free-icon-windows.png", alt: "Windows" },
  { src: "/LogoSlider_example/free-icon-youtube.png", alt: "YouTube" },
  { src: "/LogoSlider_example/free-icon-amazon-pay.png", alt: "Amazon Pay" }, //로고 예시 나중에 바꿔야함
];

function Track({
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
  // 한 절반을 충분히 복제해 화면을 채운 뒤 동일한 절반을 한 번 더 이어 붙여 -50% 지점에서 매끄럽게 루프
  const repeatedHalfLogos: Logo[] = Array.from({ length: COPIES_PER_HALF }).flatMap(
    () => logos,
  );
  const rollingSequence = [...repeatedHalfLogos, ...repeatedHalfLogos];
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center min-w-[200%] whitespace-nowrap py-2"
        // 간격(px)과 성능 최적화
        style={{ columnGap: gap, willChange: "transform" }}
        // 0% → -50% (또는 반대)로만 이동 후 즉시 처음 위치로 점프하여 끊김 없이 무한 반복
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      >
        {rollingSequence.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="w-auto flex-none object-contain opacity-80 hover:opacity-100 transition"
            style={{ height: logoHeight }}
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

function PartnerLogoSlider({
  logoHeight = 80,
  gap = 80,
  durationTop = 20,
  durationBottom = 20,
  rowSpacing = 30,
  bottomSpacing = 30,
  speed = 1,
  speedTop,
  speedBottom,
}: PartnerLogoSliderProps) {
  // 배속 적용: 값이 클수록 더 빠르게 진행. 0 또는 음수 입력 보호
  const getSafeFactor = (value: number) => (value > 0 ? value : 1);
  const topFactor = getSafeFactor(speedTop ?? speed);
  const bottomFactor = getSafeFactor(speedBottom ?? speed);
  const topDuration = durationTop / topFactor;
  const bottomDuration = durationBottom / bottomFactor;
  return (
    <section aria-label="협력사 로고 슬라이더" className="w-full">
      {/* 시안 문구 */}
      <p
        style={{
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "bold",
          color: "#374151",
          marginBottom: "40px",
        }}
        >
        님버스테크와 함께 하고 있습니다
    </p>

      {/* 윗줄: 우 → 좌 */}
      <Track logos={ROW1} duration={topDuration} logoHeight={logoHeight} gap={gap} />

      {/* 아랫줄: 좌 → 우 */}
      <div style={{ marginTop: rowSpacing }}>
        <Track
          logos={ROW2}
          duration={bottomDuration}
          reverse
          logoHeight={logoHeight}
          gap={gap}
        />
      </div>
      {bottomSpacing > 0 && (
        <div style={{ height: bottomSpacing }} />
      )}
    </section>
  );
}

export default memo(PartnerLogoSlider);
