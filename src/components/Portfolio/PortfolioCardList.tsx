import { useMemo, useRef } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type Props = {
  projects: Project[];
};

const PortfolioCardList = ({ projects }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const cardWidthPx = useMemo(() => 520, []); // 시안에 근접한 카드 폭(px)
  const gapPx = useMemo(() => 32, []); // 카드 간격(px)

  const handleNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: cardWidthPx + gapPx, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -(cardWidthPx + gapPx), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-12 overflow-x-auto snap-x snap-mandatory pr-2"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {/* 웹킷 스크롤바 숨김 */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        {projects.map((project) => (
          <div
            key={project.id}
            className="snap-start shrink-0"
            style={{ width: `${cardWidthPx}px` }}
          >
            <div className="bg-white p-8 rounded-[28px] shadow-lg hover:shadow-xl transition h-full overflow-hidden">
              <h3 className="text-[28px] font-extrabold text-[#0168b7] tracking-tight">
                {project.title}
              </h3>
              <p className="text-[15px] text-gray-700 mt-3 leading-relaxed">
                {project.description}
              </p>
              {/* 이미지/콘텐츠 영역은 실제 데이터에 맞춰 교체 */}
              <div className="mt-6 h-56 bg-gray-100 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 이동 버튼 */}
      <button
        aria-label="previous"
        onClick={handlePrev}
        className="hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50"
      >
        ‹
      </button>
      <button
        aria-label="next"
        onClick={handleNext}
        className="hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50"
      >
        ›
      </button>
    </div>
  );
};

export default PortfolioCardList;