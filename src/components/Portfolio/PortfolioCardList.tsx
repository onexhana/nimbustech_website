import React from "react";
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
  return (
    <div>
      <div
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
    </div>
  );
};

export default PortfolioCardList;