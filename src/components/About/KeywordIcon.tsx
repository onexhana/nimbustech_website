// src/components/About/KeywordIcon.tsx
// ========================================
// ABOUT 페이지 키워드 아이콘 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: 애니메이션 키워드 아이콘 표시
// 수정 사항: 현재 미사용 (향후 확장 예정)
// ========================================
import { useState } from 'react';

<<<<<<< HEAD
// KeywordIconProps: 키워드, 아이콘, 선택적 설명(description), 크기(size), 색상(color) 옵션을 정의합니다.
=======
>>>>>>> feat/sumin-portfolio
interface KeywordIconProps {
  keyword: string;
  icon: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

<<<<<<< HEAD
// KeywordIcon 컴포넌트: 키워드 아이콘과 텍스트를 hover 애니메이션과 함께 표시합니다.
=======
>>>>>>> feat/sumin-portfolio
export default function KeywordIcon({ 
  keyword, 
  icon, 
  description, 
  size = 'md',
  color = 'blue'
}: KeywordIconProps) {
<<<<<<< HEAD
  // hover 상태 관리: isHovered가 true일 때 아이콘을 확대하고 그림자를 강조합니다.
  const [isHovered, setIsHovered] = useState(false);

  // 사이즈별 TailwindCSS 클래스 매핑
=======
  // ========================================
  // 호버 상태 관리 및 아이콘 렌더링
  // ========================================
  const [isHovered, setIsHovered] = useState(false);

>>>>>>> feat/sumin-portfolio
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg'
  };

<<<<<<< HEAD
  // 색상별 gradient 클래스 매핑
=======
>>>>>>> feat/sumin-portfolio
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

<<<<<<< HEAD
  // 렌더링: 아이콘과 텍스트를 포함하는 컨테이너
  return (
    // 컨테이너: 수직 정렬, hover 이벤트로 상태 변경
=======
  return (
>>>>>>> feat/sumin-portfolio
    <div 
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
<<<<<<< HEAD
      {/* 아이콘 래퍼: 크기와 색상, hover 시 효과 적용 */}
=======
>>>>>>> feat/sumin-portfolio
      <div 
        className={`
          ${sizeClasses[size]} rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}
          flex items-center justify-center text-white font-bold
          transition-all duration-300 transform
          ${isHovered ? 'scale-110 shadow-xl' : 'shadow-lg'}
          group-hover:rotate-12
        `}
        style={{
          boxShadow: isHovered ? '0 15px 30px rgba(59, 130, 246, 0.4)' : '0 8px 20px rgba(59, 130, 246, 0.2)'
        }}
      >
        <span className="text-xl">{icon}</span>
      </div>
<<<<<<< HEAD

      {/* 텍스트 영역: 키워드와 선택적 설명을 표시 */}
=======
      
>>>>>>> feat/sumin-portfolio
      <div className="text-center">
        <span 
          className={`
            font-semibold text-gray-700 transition-colors duration-300
            ${isHovered ? 'text-blue-600' : ''}
          `}
        >
          {keyword}
        </span>
        {description && (
          <p className="text-xs text-gray-500 mt-1 max-w-20 leading-tight">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
