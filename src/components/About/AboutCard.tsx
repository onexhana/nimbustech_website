// src/components/About/AboutCard.tsx
// import { useState } from 'react'; // Removed as not needed after simplification

interface AboutCardProps {
  title: string;
  description: string[];
  // isActive?: boolean; // Kept for potential future use, but not actively used for animation
  // delay?: number; // Kept for potential future use
}

export default function AboutCard({ title, description }: AboutCardProps) {
  return (
    <div
      className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1"
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        flex: '1',
        minHeight: '160px',
        width: 'calc(33.333% - 10.67px)', // 3개 카드가 가로로 나란히 배치되도록
        flexShrink: 0
      }}
    >
      <h3 
        className="font-semibold text-blue-600 mb-4 text-base leading-tight" 
        style={{ 
          color: '#2563eb', 
          fontWeight: '600', 
          marginBottom: '12px' 
        }}
      >
        {title}
      </h3>
      
      <div className="text-sm text-gray-700 space-y-1" style={{ color: '#374151', fontSize: '13px' }}>
        {description.map((line, i) => (
          <div 
            key={i} 
            className="leading-relaxed" 
            style={{ 
              marginBottom: '2px', 
              lineHeight: '1.4' 
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
