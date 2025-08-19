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

  // 무제한 반복을 위해 프로젝트를 여러 번 복제 (정말 끝없이!)
  const duplicatedProjects = Array(10).fill(projects).flat();

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-8">
        {/* 카드 3개 컨테이너 */}
        <div className="flex-1 min-w-0" style={{ width: 'calc(380px * 3 + 32px * 2)', overflow: 'hidden' }}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={32}
            slidesPerView={3}
            slidesPerGroup={1}
            loop={true}
            loopedSlides={Math.min(duplicatedProjects.length, 50)}
            pagination={false}
            navigation={false}
            allowTouchMove={true}
            centeredSlides={false}
            speed={300}
            resistance={false}
            resistanceRatio={0}
            watchSlidesProgress={false}
            freeMode={false}
            className="portfolio-swiper"
          >
            {duplicatedProjects.map((project, index) => (
              <SwiperSlide key={`${project.id}-${index}`}>
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
          
          {/* Swiper 강제 설정을 위한 스타일 */}
          <style>{`
            .portfolio-swiper {
              width: calc(380px * 3 + 32px * 2) !important;
              overflow: visible !important;
            }
            .portfolio-swiper .swiper-wrapper {
              overflow: visible !important;
            }
            .portfolio-swiper .swiper-slide {
              width: 380px !important;
              flex-shrink: 0 !important;
            }
            .portfolio-swiper .swiper-slide > div {
              margin: 10px 5px;
            }
            /* 무한 루프 보장 */
            .portfolio-swiper .swiper-slide-duplicate {
              opacity: 1 !important;
              display: block !important;
              visibility: visible !important;
            }
          `}</style>
        </div>

        {/* 우측 화살표 버튼 */}
        {projects.length > 1 && (
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