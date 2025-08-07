import React from "react";

// 🔹 협력사 로고 이미지 경로 (public 기준)
const logos = [
  "/images/partners/logo1.png",
  "/images/partners/logo2.png",
  "/images/partners/logo3.png",
  "/images/partners/logo4.png",
  "/images/partners/logo5.png",
  "/images/partners/logo6.png",
];

// 🔸 협력사 로고 슬라이더 (양방향 자동 롤링)
const PartnerSlider = () => {
  return (
    <div className="space-y-6 overflow-hidden py-8 h-[120px] bg-[#f9fafb] rounded-xl border border-gray-200">
      {/* 
        🔹 전체 슬라이더 박스 
        - space-y-6: 상하 슬라이드 간 간격
        - overflow-hidden: 슬라이드 영역 밖 이미지 숨김
        - h-[120px]: 고정 높이 (각 줄 60px)
        - 배경/테두리/둥근 모서리 등 시안 반영
      */}

      {/* 🔹 상단 슬라이드 (오른쪽 → 왼쪽 방향 이동) */}
      <div className="flex animate-slide-left gap-12 px-6 min-h-[60px] hover:[animation-play-state:paused]">
        {/* 🔁 원본 로고 한 세트 */}
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            alt={`partner-${idx}`}
            className="h-12 w-auto object-contain"
          />
        ))}
        {/* 🔁 반복 이미지 (무한 루프용) */}
        {logos.map((logo, idx) => (
          <img
            key={`dup1-${idx}`}
            src={logo}
            alt={`partner-dup-${idx}`}
            className="h-12 w-auto object-contain"
          />
        ))}
      </div>

      {/* 🔹 하단 슬라이드 (왼쪽 → 오른쪽 방향 이동) */}
      <div className="flex animate-slide-right gap-12 px-6 min-h-[60px] hover:[animation-play-state:paused]">
        {/* 🔁 원본 로고 */}
        {logos.map((logo, idx) => (
          <img
            key={`2-${idx}`}
            src={logo}
            alt={`partner2-${idx}`}
            className="h-12 w-auto object-contain"
          />
        ))}
        {/* 🔁 반복 로고 */}
        {logos.map((logo, idx) => (
          <img
            key={`dup2-${idx}`}
            src={logo}
            alt={`partner2-dup-${idx}`}
            className="h-12 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnerSlider;
