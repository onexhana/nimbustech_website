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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className="flex items-center">
        {/* 카드 컨테이너 - 화면 너비에 따라 동적 조정 */}
        <div className="portfolio-container overflow-hidden portfolio-dynamic-width">
          <Swiper
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onInit={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={32}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 32,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1800: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
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
          
          {/* Swiper 동적 크기 설정을 위한 스타일 */}
          <style>{`
            /* 화면 너비별 동적 컨테이너 크기 */
            .portfolio-dynamic-width {
              width: calc(380px * 2 + 32px * 1 + 70px) !important; /* 기본: 2개 카드 + 화살표 공간 */
              min-width: calc(380px * 2 + 32px * 1 + 70px) !important;
            }
            
            /* 큰 화면(1800px 이상): 3개 카드 */
            @media (min-width: 1800px) {
              .portfolio-dynamic-width {
                width: calc(380px * 3 + 32px * 2 + 70px) !important;
                min-width: calc(380px * 3 + 32px * 2 + 70px) !important;
              }
            }
            
            .portfolio-swiper {
              width: 100% !important;
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
            
            /* 모바일 전용(768px 미만) 오버라이드 */
            @media (max-width: 767.98px) {
              .portfolio-dynamic-width {
                width: calc(100vw - 120px) !important;
                min-width: auto !important;
              }
              .portfolio-swiper .swiper-slide {
                width: 100% !important;
              }
            }
          `}</style>
        </div>

        {/* 우측 화살표 버튼 */}
        {projects.length > 1 && (
          <button
            aria-label="다음 카드"
            onClick={() => swiperRef.current?.slideNext()}
            className="hover:bg-gray-100 transition-all duration-300"
            style={{
              backgroundColor: '#ffffff',
              border: 'none',
              outline: 'none',
              padding: '0',
              fontSize: '28px',
              fontWeight: 700,
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              position: 'relative',
              zIndex: 10
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#1f2937" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioCardList;