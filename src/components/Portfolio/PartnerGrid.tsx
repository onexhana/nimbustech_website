// components/Portfolio/PartnerGrid.tsx

import React from "react";

// 🔹 협력사 로고 경로 배열 (1~6번으로 반복)
const logos = [
  "/images/partners/logo1.png",
  "/images/partners/logo2.png",
  "/images/partners/logo3.png",
  "/images/partners/logo4.png",
  "/images/partners/logo5.png",
  "/images/partners/logo6.png",
];

// 🔸 협력사 로고 그리드 컴포넌트
const PartnerGrid = () => {
  return (
    <div className="py-16 bg-white text-center">
      {/* 🔹 제목: 시안 기준 색상/폰트/여백 */}
      <h3 className="text-xl sm:text-2xl font-semibold text-[#0168b7] mb-12">
        님버스테크와 함께 하고 있습니다
      </h3>

      {/* 🔹 로고 슬라이더 컨테이너 */}
      <div className="overflow-hidden">
        {/* 🔹 윗줄 - 오른쪽으로 슬라이드 */}
        <div className="flex animate-slide-right mb-8">
          {/* 🔹 첫 번째 세트 */}
          {logos.map((logo, idx) => (
            <div key={`top-1-${idx}`} className="flex-shrink-0 mx-8">
              <img
                src={logo}
                alt={`partner-${idx + 1}`}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          ))}
          {/* 🔹 두 번째 세트 (무한 반복용) */}
          {logos.map((logo, idx) => (
            <div key={`top-2-${idx}`} className="flex-shrink-0 mx-8">
              <img
                src={logo}
                alt={`partner-${idx + 1}`}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* 🔹 아랫줄 - 왼쪽으로 슬라이드 */}
        <div className="flex animate-slide-left">
          {/* 🔹 첫 번째 세트 */}
          {logos.map((logo, idx) => (
            <div key={`bottom-1-${idx}`} className="flex-shrink-0 mx-8">
              <img
                src={logo}
                alt={`partner-${idx + 1}`}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          ))}
          {/* 🔹 두 번째 세트 (무한 반복용) */}
          {logos.map((logo, idx) => (
            <div key={`bottom-2-${idx}`} className="flex-shrink-0 mx-8">
              <img
                src={logo}
                alt={`partner-${idx + 1}`}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerGrid;
