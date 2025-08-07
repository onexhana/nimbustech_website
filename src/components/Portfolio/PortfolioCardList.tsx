import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper"; // ✅ 수정됨
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={24}
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      navigation
      pagination={{ clickable: true }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition h-full">
            <h3 className="text-lg font-semibold text-[#0168b7]">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {project.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PortfolioCardList;