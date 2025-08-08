// components/Portfolio/PortfolioCardList.tsx

import React from "react";

// 🔹 Swiper (슬라이더 라이브러리) 관련 모듈 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper"; // ⬅️ 내비게이션/페이지네이션 모듈
import "swiper/css"; // 기본 스타일
import "swiper/css/navigation";
import "swiper/css/pagination";

// 🔸 프로젝트 카드 UI 컴포넌트
import ProjectCard from "@/components/Portfolio/ProjectCard";

// 🔹 프로젝트 객체 타입 정의
type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;    // 이미지 URL (옵션)
  category: string;  // 산업군 필터용
};

// 🔸 props 타입 정의
type Props = {
  category: string;     // 현재 선택된 카테고리
  projects: Project[];  // 필터링된 프로젝트 리스트
};

// 🔸 포트폴리오 카드 리스트 (Swiper로 슬라이드 구성)
const PortfolioCardList = ({ category, projects }: Props) => {
  return (
    <div className="w-full">
      <Swiper
        // 🔹 슬라이더에 사용할 기능 모듈 지정
        modules={[Navigation, Pagination]}
        spaceBetween={24} // 슬라이드 간 간격
        slidesPerView={1.15} // 모바일 기본 보여지는 수

        // 🔹 반응형 설정 (브레이크포인트별 슬라이드 수 조정)
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}

        navigation // 좌우 화살표 사용
        pagination={{ clickable: true }} // 페이지네이션 클릭 가능
      >
        {/* 🔁 프로젝트 리스트 순회하며 슬라이드 렌더링 */}
        {projects.map((p) => (
          <SwiperSlide key={p.id}>
            {/* ✅ 실제 카드 UI */}
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

export default PortfolioCardList;
