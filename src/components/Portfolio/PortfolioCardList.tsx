import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PortfolioCard from "./PortfolioCard";

// Swiper 스타일 import
import "swiper/swiper-bundle.css";

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
  const swiperRef = useRef<any>(null);
  
  // 카드가 없는 경우 처리
  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        표시할 포트폴리오가 없습니다.
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-8">
        {/* 카드 3개 컨테이너 */}
        <div className="flex-1 min-w-0" style={{ maxWidth: 'calc(380px * 3 + 32px * 2)' }}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={32}
            slidesPerView={3}
            slidesPerGroup={1}
            loop={projects.length > 3}
            pagination={false}
            navigation={false}
            allowTouchMove={true}
            freeMode={false}
            centeredSlides={false}
            className="portfolio-swiper w-full"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <PortfolioCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  image={project.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 우측 화살표 버튼 */}
        {projects.length > 3 && (
          <button
            aria-label="다음 카드"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-12 h-12 rounded-full bg-white border-2 border-[#00A3E0] text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white shadow-lg transition-all duration-200 flex items-center justify-center shrink-0"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioCardList;