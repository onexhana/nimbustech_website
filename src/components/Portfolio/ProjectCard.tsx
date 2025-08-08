// components/Portfolio/ProjectCard.tsx

import React, { useMemo, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

const PROJECT_IMAGE_BASES: Record<string, string> = {
  "스타트업 A사의 사용자 맞춤형 서비스 플랫폼 개발": "/images/portfolio/gonggong1.png",
  "국방 빅데이터 시스템 설계": "/images/portfolio/gonggong2.png",
  "AI 보험 자동화 시스템 구축": "/images/portfolio/gonggong1.png",
  "제조업체 스마트 팩토리 전환": "/images/portfolio/gonggong2.png",
  "유통업체 디지털 전환 프로젝트": "/images/portfolio/gonggong1.png",
  "헬스케어 플랫폼 개발": "/images/portfolio/gonggong2.png",
};

const CANDIDATE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".JPG",
  ".JPEG",
  ".PNG",
  ".WEBP",
] as const;

const FALLBACK = "https://via.placeholder.com/600x360?text=Portfolio+Image";

// 레이아웃: 세로 카드 (상단 텍스트, 하단 우측 이미지)
const ProjectCard = ({ title, description, imageUrl, category }: ProjectCardProps) => {
  const basePath = useMemo(() => {
    if (imageUrl) return imageUrl;
    return PROJECT_IMAGE_BASES[title] || "";
  }, [imageUrl, title]);

  const isFullPathWithExt = useMemo(() => /\.[a-zA-Z0-9]+$/.test(basePath), [basePath]);

  const [extIndex, setExtIndex] = useState(0);
  const computedSrc = useMemo(() => {
    if (!basePath) return FALLBACK;
    if (isFullPathWithExt) return basePath;
    const candidate = `${basePath}${CANDIDATE_EXTENSIONS[Math.min(extIndex, CANDIDATE_EXTENSIONS.length - 1)]}`;
    return candidate;
  }, [basePath, extIndex, isFullPathWithExt]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!isFullPathWithExt && extIndex < CANDIDATE_EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
      return;
    }
    const t = e.currentTarget;
    if (t.src !== FALLBACK) t.src = FALLBACK;
  };

  return (
    <article className="flex justify-between items-center gap-6 p-6 bg-white rounded-xl shadow-sm border-b border-gray-200 min-h-[180px]">
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-2 max-w-[70%] min-w-0">
        {category && (
          <div className="text-sm text-blue-500 font-semibold">{category}</div>
        )}
        <h3 className="text-lg font-bold text-blue-700 leading-tight break-words">
          {title}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed break-words">
          {description}
        </p>
      </div>

      {/* 이미지 영역 */}
      <img
        src={computedSrc}
        alt={title}
        onError={handleError}
        className="w-[100px] h-[100px] object-contain"
      />
    </article>
  );
};

export default ProjectCard;
