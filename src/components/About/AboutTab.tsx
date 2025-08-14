// src/components/About/AboutTab.tsx
// ========================================
// ABOUT 페이지 탭 네비게이션 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: 탭 전환, 호버 효과
// 수정 사항: 탭 스타일링, 활성 상태 표시
// ========================================
import { useState } from 'react';

interface AboutTabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AboutTab({ tabs, activeTab, onTabChange }: AboutTabProps) {
  // ========================================
  // 탭 호버 상태 관리
  // ========================================
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '40px',
      marginLeft: '50px'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab}

          style={{
            backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent',
            color: activeTab === tab ? '#ffffff' : '#374151',
            border: 'none',
            fontSize: '22px',
            fontWeight: '650',
            padding: '8px 24px',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={() => setHoveredTab(tab)}
          onMouseLeave={() => setHoveredTab(null)}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
