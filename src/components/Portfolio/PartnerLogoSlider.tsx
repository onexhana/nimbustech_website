// src/components/Portfolio/PartnerLogoSlider.tsx
import { memo } from "react";
import { motion } from "framer-motion";

type Logo = { src: string; alt: string };

type PartnerLogoSliderProps = {
  /** 로고 높이(px). 기본 24 */
  logoHeight?: number;
  /** 로고 사이 간격(px). 기본 16 */
  gap?: number;
  /** 윗줄 애니메이션 시간(초). 값이 클수록 느려짐. 기본 28 */
  durationTop?: number;
  /** 아랫줄 애니메이션 시간(초). 값이 클수록 느려짐. 기본 32 */
  durationBottom?: number;
};


const ROW1: Logo[] = [
  { src: "/LogoSlider_example/free-icon-amazon-pay.png", alt: "Amazon Pay" },
  { src: "/LogoSlider_example/free-icon-github-logo.png", alt: "GitHub" },
  { src: "/LogoSlider_example/free-icon-google.png", alt: "Google" },
  { src: "/LogoSlider_example/free-icon-instagram.png", alt: "Instagram" },
  { src: "/LogoSlider_example/free-icon-netflix.png", alt: "Netflix" },
];

const ROW2: Logo[] = [
  { src: "/LogoSlider_example/free-icon-tik-tok.png", alt: "TikTok" },
  { src: "/LogoSlider_example/free-icon-visa.png", alt: "Visa" },
  { src: "/LogoSlider_example/free-icon-windows.png", alt: "Windows" },
  { src: "/LogoSlider_example/free-icon-youtube.png", alt: "YouTube" },
  { src: "/LogoSlider_example/free-icon-amazon-pay.png", alt: "Amazon Pay" }, // 반복 예시
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
  // 화면을 충분히 채우기 위해 한 "절반(half)"을 여러 번 복제한 뒤 동일한 절반을 다시 한 번 이어붙입니다.
  // 이렇게 하면 전체 트랙이 정확히 2개의 동일한 절반으로 구성되어 -50% 지점에서 매끄럽게 루프됩니다.
  const COPIES_PER_HALF = 4; // 한 절반에 logos를 몇 번 반복할지 (필요시 조절)
  const half: Logo[] = Array.from({ length: COPIES_PER_HALF })
    .flatMap(() => logos);
  const sequence = [...half, ...half];
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
        {sequence.map((logo, i) => (
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
  logoHeight = 84,
  gap =80,
  durationTop = 38,
  durationBottom = 32,
}: PartnerLogoSliderProps) {
  return (
    <section aria-label="협력사 로고 슬라이더" className="w-full">
      {/* 시안 문구 */}
      <p
        style={{
            textAlign: "center",  fontSize: "25px",  fontWeight: "bold",
            color: "#374151",  marginBottom: "20px", 
        }}
        >
        님버스테크와 함께 하고 있습니다
    </p>

      {/* 윗줄: 우 → 좌 */}
      <Track logos={ROW1} duration={durationTop} logoHeight={logoHeight} gap={gap} />

      {/* 아랫줄: 좌 → 우 */}
      <div className="mt-1">
        <Track
          logos={ROW2}
          duration={durationBottom}
          reverse
          logoHeight={logoHeight}
          gap={gap}
        />
      </div>
    </section>
  );
}

export default memo(PartnerLogoSlider);
