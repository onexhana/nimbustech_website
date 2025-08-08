// components/Portfolio/ProjectCardSlider.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProjectCard from "@/components/Portfolio/ProjectCard";

export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
};

type Props = {
  projects: Project[];
};

const ProjectCardSlider = ({ projects }: Props) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {projects.map((p) => (
          <SwiperSlide key={p.id}>
            <ProjectCard
              title={p.title}
              description={p.description}
              imageUrl={p.image}
              category={p.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectCardSlider;

