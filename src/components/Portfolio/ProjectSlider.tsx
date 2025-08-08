// components/Portfolio/ProjectSlider.tsx
import React from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
};

type Props = {
  projects: Project[];
};

const ProjectSlider: React.FC<Props> = ({ projects }) => {
  return (
    <div className="w-full overflow-x-auto px-1 snap-x snap-mandatory scroll-smooth scrollbar-hide">
      <div className="flex gap-x-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[280px] rounded-xl bg-white shadow-sm p-4 flex-shrink-0 snap-start"
          >
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-base font-semibold leading-tight">
                {project.title}
              </h3>
              <img
                src={project.image || "/images/portfolio/gonggong1.png"}
                alt={project.title}
                className="h-[120px] w-full object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;


