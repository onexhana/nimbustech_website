// src/components/Portfolio/PartnerLogoSlider.tsx
import { memo, useState, useEffect } from "react";
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

/// 고객사 로고 17개 자동 생성 (고화질)
const ROW1: Logo[] = Array.from({ length: 16 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return { src: `/고객사 & 파트너사_고화질/고객사${num}.png`, alt: `고객사${num}` };
});

// 파트너사 로고 21개 자동 생성 (고화질 - 모든 파일 PNG)
const ROW2: Logo[] = Array.from({ length: 21 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");  
  return { src: `/고객사 & 파트너사_고화질/파트너사${num}.png`, alt: `파트너사${num}` };
});


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
  // 한 절반을 충분히 복제한 뒤 두 번 이어붙여서 -50% 지점에서 매끄럽게 루프
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
          // 깜빡임 방지: 브라우저 최적화 설정
          backfaceVisibility: "hidden",
          perspective: 1000,
          transform: "translateZ(0)" // GPU 가속 활성화
        }}
        animate={{ x: reverse ? ["-500%", "0%"] : ["0%", "-500%"] }}
        transition={{ 
          duration: duration * 6, 
          repeat: Infinity, 
          ease: "linear",
          // 깜빡임 방지: 부드러운 반복 설정 (새로고침 대신 상태 변경)
          repeatType: "loop",
          // 브라우저 임계값에서 깜빡임 방지
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
              width: 'auto', // 원본 비율에 맞는 너비 자동 계산
              maxWidth: '300px', // 최대 너비만 제한
              imageRendering: 'auto', // 고화질 렌더링 설정
              filter: 'contrast(1.1) saturate(1.05)', // 선명도 향상
              objectFit: 'contain' // 비율 유지하면서 크기 맞춤
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

function PartnerLogoSlider({
  logoHeight = 50,
  gap = 80,
  durationTop = 50,      // 윗줄 1회 이동 시간(초) → 값이 클수록 느려짐
  durationBottom = 50,   // 아랫줄 1회 이동 시간(초) → 값이 클수록 느려짐
  rowSpacing = 55,
  bottomSpacing = 30,
  speed = 1,             // 전체 공통 배속 (1=기본, 2=2배 빠름, 0.5=절반 속도)
  speedTop,               // 윗줄 전용 배속 (미지정 시 speed 사용)
  speedBottom,            // 아랫줄 전용 배속 (미지정 시 speed 사용)
}: PartnerLogoSliderProps) {

  // 모바일 감지
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일과 웹에 따른 크기 설정
  const finalLogoHeight = isMobile ? logoHeight * 0.6 : logoHeight; // 모바일에서 60% 크기
  const finalGap = isMobile ? gap * 0.4 : gap; // 모바일에서 간격을 40%로 더 줄임
  const finalRowSpacing = isMobile ? rowSpacing * 0.7 : rowSpacing; // 모바일에서 줄 간격도 70%

  // 배속 계산 (0 또는 음수 방지)
  const safeFactor = (v: number) => (v > 0 ? v : 1);

  // 최종 윗줄/아랫줄 속도 계산
  // 예: durationTop=20, speed=2 → 20/2 = 10초에 1회 이동
  const topDuration = durationTop / safeFactor(speedTop ?? speed);
  const bottomDuration = durationBottom / safeFactor(speedBottom ?? speed);

  const rows = [
    { logos: ROW1, duration: topDuration },           // 윗줄 (오른쪽 → 왼쪽)
    { logos: ROW2, duration: bottomDuration, reverse: true }, // 아랫줄 (왼쪽 → 오른쪽)
  ];

  return (
    <section aria-label="협력사 로고 슬라이더" className="w-full">
      <p 
        className="text-center text-[35px] font-bold text-gray-700 mb-10"
        style={{
          fontSize: isMobile ? "20px" : "clamp(28px, 3vw, 40px)",  // 모바일에서 더 작은 글씨
          fontWeight: 600,                     // 글씨 두께 (900 → extrabold보다 굵음)
          marginTop: isMobile ? "60px" : "120px",      // 모바일에서 위쪽 여백 줄임
          marginBottom: isMobile ? "40px" : "80px",   // 모바일에서 아래쪽 여백 줄임
          lineHeight: "1.4",      // 가독성을 위해 줄간격
        }}
        >
        님버스테크와 함께 하고 있습니다
      </p>
      {rows.map((row, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : finalRowSpacing }}>
          <Track {...row} logoHeight={finalLogoHeight} gap={finalGap} />
        </div>
      ))}
      {bottomSpacing > 0 && <div style={{ height: isMobile ? bottomSpacing * 0.7 : bottomSpacing }} />}
    </section>
  );
}

export default memo(PartnerLogoSlider);
