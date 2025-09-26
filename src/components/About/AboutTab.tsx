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
}

export default function AboutTab({ tabs, activeTab, onTabChange, fontSize }: AboutTabProps) {
  // hoveredTab 상태는 호버 효과 확장을 위해 남겨두었습니다.
  // @ts-expect-error unused local variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '40px',
      marginLeft: '50px'
    }}>
      {/* tabs 배열을 순회하여 각 탭 버튼을 렌더링합니다. */}
      {tabs.map((tab) => (
        <button
          key={tab}
          // 버튼 스타일: activeTab과 hoveredTab에 따라 배경색과 글자색을 변경합니다.
          style={{
            backgroundColor: activeTab === tab ? '#00A3E0' : 'transparent',
            color: activeTab === tab ? '#ffffff' : '#374151',
            border: 'none',
            fontSize: `${fontSize || 22}px`,
            fontWeight: '650',
            padding: '8px 24px',
            borderRadius: '25px',
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
      ))}
    </div>
  );
}
