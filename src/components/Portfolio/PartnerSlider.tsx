// components/Portfolio/PartnerSlider.tsx

import React from "react";

const logos = [
  "/images/partners/logo1.png",
  "/images/partners/logo2.png",
  "/images/partners/logo3.png",
  "/images/partners/logo4.png",
  "/images/partners/logo5.png",
  "/images/partners/logo6.png",
];

type Props = { speedMs?: number };

const Row = ({ direction, speedMs = 15000 }: { direction: "left" | "right"; speedMs?: number }) => (
  <div
    className={[
      "flex w-[200%] gap-16", // 전체 길이를 2배로 만들어 무한 루프 자연스럽게
      direction === "left" ? "animate-slide-left" : "animate-slide-right",
      "pause-on-hover",
    ].join(" ")}
    style={{ animationDuration: `${Math.max(8000, speedMs)}ms` }}
  >
    {[...logos, ...logos].map((logo, idx) => (
      <img
        key={`${direction}-${idx}`}
        src={logo}
        alt={`partner-${idx + 1}`}
        className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
      />
    ))}
  </div>
);

const PartnerSlider = ({ speedMs = 15000 }: Props) => {
  return (
    <section className="py-16 bg-white text-center overflow-hidden">
      <h3 className="text-xl sm:text-2xl font-semibold text-[#0168b7] mb-12">님버스테크와 함께 하고 있습니다</h3>
      <div className="overflow-hidden">
        <Row direction="right" speedMs={speedMs} />
        <div className="h-8" />
        <Row direction="left" speedMs={speedMs} />
      </div>
    </section>
  );
};

export default PartnerSlider;
