// src/components/About/AboutCardNoEffect.tsx
// ========================================
// ABOUT 페이지 개별 카드 컴포넌트 (효과 비활성화 버전)
// 담당자: About 페이지 팀
// 주요 기능: 서비스 소개 카드 (호버 애니메이션 비활성화)
// ========================================

interface AboutCardProps {
  title: string;
  description: string[];
  /** 솔루션 섹션 전용 상세 보기 링크 */
  detailLink?: string;
}

export default function AboutCardNoEffect({ title, description, detailLink }: AboutCardProps) {
  return (
    <div
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
      style={{
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: detailLink ? 'space-between' : 'flex-start',
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        height: '360px',
        width: '480px',
        maxWidth: '480px',
        flexShrink: 0,
        /* transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' - 호버 transition 제거 */
        cursor: 'default'
      }}
       onMouseEnter={(e) => {
         e.currentTarget.style.transform = 'translateY(-8px)';
         e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
       }}
       onMouseLeave={(e) => {
         e.currentTarget.style.transform = 'translateY(0)';
         e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
       }}
    >
      {/* 카드 컨테이너: 배경색, 그림자, 크기, 패딩 설정 (호버 효과 비활성화) */}
      {/* onMouseEnter 및 onMouseLeave 핸들러를 주석 처리하여 효과를 비활성화합니다. */}
      <h3 
        className="font-semibold text-blue-600 mb-4 text-base leading-tight" 
        style={{ 
          color: '#2563eb',
          fontSize: '34px',
          fontWeight: '550',
          marginTop: '24px',
          marginLeft: '15px',
          marginBottom: detailLink ? '106px' : '116px' 
        }}
      >
        {title}
      </h3>
      
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ color: '#374151', fontSize: '22px', fontWeight: '550'}}
      >
        {description.map((line, i) => (
          <div
            key={i}
            className="leading-relaxed"
            style={{
              marginBottom: '12px',
              marginLeft: '15px',
              lineHeight: '1.4'
            }}
          >
            {line}
          </div>
        ))}
      </div>
      {detailLink && (
        <div style={{ marginTop: '16px', marginLeft: '15px' }}>
          <a
            href={detailLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}
          >
            자세히 보기 →
          </a>
        </div>
      )}
    </div>
  );
}
