import { useMemo, useRef } from "react";
import PortfolioCard from "./PortfolioCard";

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
};

type Props = {
  projects: Project[];
};

const PortfolioCardList = ({ projects }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const cardWidthPx = useMemo(() => 420, []); // 카드 폭(px) - 카드 크기에 맞춰 조정
  const gapPx = useMemo(() => 62, []); // 카드 간격(px) - style의 gap과 일치

  const handleNext = () => {
    if (!scrollRef.current) return;
    console.log("Next button clicked");
    const scrollAmount = cardWidthPx + gapPx;
    console.log("Scroll amount:", scrollAmount);
    console.log("Current scroll position:", scrollRef.current.scrollLeft);
    console.log("Container width:", scrollRef.current.clientWidth);
    console.log("Total scroll width:", scrollRef.current.scrollWidth);
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    console.log("Prev button clicked");
    const scrollAmount = cardWidthPx + gapPx;
    console.log("Scroll amount:", -scrollAmount);
    console.log("Current scroll position:", scrollRef.current.scrollLeft);
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory pr-2"
        style={{ 
          scrollBehavior: "smooth", 
          scrollbarWidth: "none",
          gap: "62px" // 카드 간격 설정
        }}
      >
        {/* 웹킷 스크롤바 숨김 */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        {projects.map((project) => (
          <div
            key={project.id}
            className="snap-start shrink-0"
          >
            <PortfolioCard 
              id={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              image={project.image}
            />
          </div>
        ))}
      </div>

      {/* < 화살표 버튼 하나만 */}
      <button
        type="button"
        aria-label="previous"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlePrev();
        }}
        className="flex items-center justify-center absolute -left-20 top-1/2 -translate-y-1/2 w-20 h-20 bg-transparent border-none cursor-pointer z-20"
      >
        <span className="font-black text-gray-600 hover:text-gray-800 transition-colors duration-200" style={{ fontSize: '3rem' }}>&lt;</span>
      </button>
    </div>
  );
};

export default PortfolioCardList;