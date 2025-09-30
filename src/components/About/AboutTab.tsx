// src/components/About/AboutTab.tsx
// ========================================
// ABOUT 페이지 탭 네비게이션 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: 탭 전환, 호버 효과
// 수정 사항: 탭 스타일링, 활성 상태 표시
// ========================================
import { useState } from 'react';

// AboutTab 컴포넌트 props 정의: 탭 라벨 목록(tabs), 현재 활성 탭(activeTab), 탭 변경 콜백(onTabChange)을 전달받습니다.
interface AboutTabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  fontSize?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function AboutTab({ tabs, activeTab, onTabChange, fontSize, activeColor, inactiveColor }: AboutTabProps) {
  // hoveredTab 상태는 호버 효과 확장을 위해 남겨두었습니다.
  // @ts-expect-error unused local variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // 관리자에서 설정한 필터 스타일 가져오기
  const getFilterStyle = (categoryName: string) => {
    const savedFilterStyles = localStorage.getItem('filterStyleSettings');
    if (savedFilterStyles) {
      try {
        const filterStyles = JSON.parse(savedFilterStyles);
        return filterStyles[categoryName];
      } catch (error) {
        console.error('필터 스타일 로드 실패:', error);
      }
    }
    
    // 기본값 반환 (현재 사이트 색상)
      return {
        backgroundColor: "#00A3E0",
        textColor: "#ffffff",
        borderColor: "#00A3E0",
        borderWidth: 1,
        fontSize: 22,
        fontWeight: 650,
        borderRadius: 25,
        padding: "8px 24px",
        hoverBackgroundColor: "#008CC0",
        hoverTextColor: "#ffffff"
      };
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '40px',
      marginLeft: '50px'
    }}>
      {/* tabs 배열을 순회하여 각 탭 버튼을 렌더링합니다. */}
      {tabs.map((tab) => {
        const filterStyle = getFilterStyle(tab);
        
        return (
          <button
            key={tab}
            // 버튼 스타일: 관리자 설정 반영
        style={{
          backgroundColor: activeTab === tab ? 'white' : filterStyle.backgroundColor,
          color: activeTab === tab ? filterStyle.borderColor : filterStyle.textColor,
          border: activeTab === tab ? `${(filterStyle.borderWidth || 1) + 1}px solid ${filterStyle.borderColor}` : `${filterStyle.borderWidth || 1}px solid transparent`,
          fontSize: `${filterStyle.fontSize || 22}px`,
          fontWeight: filterStyle.fontWeight || 650,
          padding: filterStyle.padding || '8px 24px',
          borderRadius: `${filterStyle.borderRadius || 25}px`,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
            // 마우스 진입 시 hoveredTab 상태 업데이트
            onMouseEnter={() => setHoveredTab(tab)}
            // 마우스 이탈 시 hoveredTab 초기화
            onMouseLeave={() => setHoveredTab(null)}
            // 클릭 시 부모 콜백을 호출하여 탭을 전환합니다.
            onClick={() => onTabChange(tab)}
          >
            {/* 탭 라벨을 화면에 표시합니다. */}
            {tab}
          </button>
        );
      })}
    </div>
  );
}
