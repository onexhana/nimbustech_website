// src/components/About/AboutTab.tsx
import { useState } from 'react';

interface AboutTabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AboutTab({ tabs, activeTab, onTabChange }: AboutTabProps) {
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
