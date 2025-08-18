// src/components/About/AboutCard.tsx
// ========================================
// ABOUT 페이지 개별 카드 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: 서비스 소개 카드, 호버 애니메이션
// 수정 사항: 카드 크기 조정, 그림자 효과, 호버 모션
// ========================================

<<<<<<< HEAD
// AboutCard 컴포넌트 props 타입 정의: 카드 제목(title)과 내용(description 배열)을 전달받습니다.
interface AboutCardProps {
  title: string;
  description: string[];
  /** 솔루션 섹션 전용 상세 보기 링크 */
  detailLink?: string;
}

export default function AboutCard({ title, description, detailLink }: AboutCardProps) {
=======
interface AboutCardProps {
  title: string;
  description: string[];
}

export default function AboutCard({ title, description }: AboutCardProps) {
>>>>>>> feat/sumin-portfolio
  // ========================================
  // 카드 렌더링 (호버 효과, 크기 조정 포함)
  // ========================================
  return (
    <div
<<<<<<< HEAD
      // 카드 컨테이너: 배경색, 그림자, 크기, 패딩 및 호버 트랜지션 설정
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
      style={{
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: detailLink ? 'space-between' : 'flex-start',
=======
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
      style={{
        backgroundColor: '#f9fafb',
>>>>>>> feat/sumin-portfolio
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
<<<<<<< HEAD
        height: '360px',
        width: '480px',
        maxWidth: '480px',
=======
        minHeight: '200px',
        width: '380px', // 시안처럼 고정 크기로 더 작게
        maxWidth: '280px',
>>>>>>> feat/sumin-portfolio
        flexShrink: 0,
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
<<<<<<< HEAD
        // 카드가 호버되면 위로 이동하고 그림자를 강화합니다.
=======
>>>>>>> feat/sumin-portfolio
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
<<<<<<< HEAD
        // 호버 해제 시 원래 위치와 그림자로 복원합니다.
=======
>>>>>>> feat/sumin-portfolio
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
    >
      <h3 
        className="font-semibold text-blue-600 mb-4 text-base leading-tight" 
        style={{ 
<<<<<<< HEAD
          color: '#2563eb',
          fontSize: '34px',
          fontWeight: '550',
          marginTop: '24px',
          marginLeft: '15px',
          marginBottom: detailLink ? '106px' : '116px' 
=======
          color: '#2563eb', 
          fontWeight: '600', 
          marginBottom: '56px' 
>>>>>>> feat/sumin-portfolio
        }}
      >
        {title}
      </h3>
      
<<<<<<< HEAD
      <div className="text-sm text-gray-700 space-y-1" 
      style={{ color: '#374151', fontSize: '22px', fontWeight: '550'}}>
        {/* description 배열을 순회하여 각 줄을 렌더링합니다. */}
=======
      <div className="text-sm text-gray-700 space-y-1" style={{ color: '#374151', fontSize: '12px', fontWeight: '600' }}>
>>>>>>> feat/sumin-portfolio
        {description.map((line, i) => (
          <div 
            key={i} 
            className="leading-relaxed" 
            style={{ 
<<<<<<< HEAD
              marginBottom: '12px', 
              marginLeft: '15px',
=======
              marginBottom: '2px', 
>>>>>>> feat/sumin-portfolio
              lineHeight: '1.4' 
            }}
          >
            {line}
          </div>
        ))}
      </div>
<<<<<<< HEAD
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
=======
>>>>>>> feat/sumin-portfolio
    </div>
  );
}
