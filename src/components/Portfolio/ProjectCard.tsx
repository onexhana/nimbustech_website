// components/Portfolio/ProjectCard.tsx

import React from "react";

// 🔹 카드에 전달되는 props 타입 정의
interface ProjectCardProps {
  title: string;        // 프로젝트 제목
  description: string;  // 프로젝트 설명
  imageUrl?: string;    // 이미지 경로 (없으면 fallback 사용)
}

// 🔸 이미지가 없거나 에러일 때 대체 이미지
const FALLBACK = "https://via.placeholder.com/300x160?text=Portfolio";

// 🔸 개별 프로젝트 카드 UI 컴포넌트
const ProjectCard = ({ title, description, imageUrl }: ProjectCardProps) => {
  // 🔹 이미지 로딩 실패 시 fallback 이미지로 대체
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const t = e.currentTarget;
    if (t.src !== FALLBACK) t.src = FALLBACK;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 h-full hover:shadow-xl transition">
      {/* 🔹 썸네일 이미지 */}
      <img
        src={imageUrl || FALLBACK} // 이미지 없을 경우 fallback 사용
        alt={title} // 접근성 대응
        onError={handleError} // 이미지 로딩 에러 처리
        className="w-full h-40 object-cover rounded-xl mb-4"
        // w-full: 카드 너비 채움
        // h-40: 고정 높이
        // object-cover: 이미지 비율 유지
        // rounded-xl: 모서리 둥글게
        // mb-4: 아래 여백
      />

      {/* 🔹 제목 텍스트 */}
      <h4 className="text-base font-semibold text-[#0168b7] mb-1 leading-tight">
        {title}
      </h4>

      {/* 🔹 설명 텍스트 */}
      <p className="text-sm text-gray-600 leading-snug">{description}</p>
    </div>
  );
};

export default ProjectCard;
