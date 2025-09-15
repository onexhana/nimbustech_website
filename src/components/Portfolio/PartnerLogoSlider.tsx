// src/components/Portfolio/PartnerLogoSlider.tsx
import { memo, useState, useEffect } from "react";
import PartnerLogoSliderMobile from "./PartnerLogoSlider_Mobile";
import PartnerLogoSliderWeb from "./PartnerLogoSlider_Web";

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

function PartnerLogoSlider({
  logoHeight = 50,
  gap = 80,
  durationTop = 50,
  durationBottom = 50,
  rowSpacing = 55,
  bottomSpacing = 30,
  speed = 1,
  speedTop,
  speedBottom,
}: PartnerLogoSliderProps) {

  // 모바일 감지
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 조건부 렌더링: 모바일과 웹 버전 분리
  if (isMobile) {
    return (
      <PartnerLogoSliderMobile
        logoHeight={logoHeight}
        gap={gap}
        durationTop={durationTop}
        durationBottom={durationBottom}
        rowSpacing={rowSpacing}
        bottomSpacing={bottomSpacing}
        speed={speed}
        speedTop={speedTop}
        speedBottom={speedBottom}
      />
    );
  }

  return (
    <PartnerLogoSliderWeb
      logoHeight={logoHeight}
      gap={gap}
      durationTop={durationTop}
      durationBottom={durationBottom}
      rowSpacing={rowSpacing}
      bottomSpacing={bottomSpacing}
      speed={speed}
      speedTop={speedTop}
      speedBottom={speedBottom}
    />
  );
}

export default memo(PartnerLogoSlider);