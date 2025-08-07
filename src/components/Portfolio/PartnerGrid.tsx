// components/Portfolio/PartnerGrid.tsx

import React from "react";

// 🔹 협력사 로고 경로 배열 (public 폴더 기준)
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

      {/* 🔹 로고 목록: flex-wrap으로 반응형 가로 정렬 */}
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-4 max-w-6xl mx-auto">
        {/* 🔁 각 로고 이미지 렌더링 */}
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo} // 이미지 경로
            alt={`partner-${idx}`} // 접근성 대응용 alt 텍스트
            className="h-10 sm:h-12 w-auto object-contain"
            // 🔸 h-10: 기본 높이 (모바일 기준)
            // 🔸 sm:h-12: 중간 이상에서 살짝 더 큼
            // 🔸 object-contain: 이미지 비율 유지하며 맞춤
          />
        ))}
      </div>
    </div>
  );
};

export default PartnerGrid;
