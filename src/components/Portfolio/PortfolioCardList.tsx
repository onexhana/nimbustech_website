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