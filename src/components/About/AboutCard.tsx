// src/components/About/AboutCard.tsx
// ========================================
// ABOUT 페이지 개별 카드 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: 서비스 소개 카드, 호버 애니메이션
// 수정 사항: 카드 크기 유동화, 동일 높이 유지, 그림자 효과, 호버 모션
// ========================================

interface AboutCardProps {
  title: string;
  description: string[];
  /** 솔루션 섹션 전용 상세 보기 링크 */
  detailLink?: string;
}

export default function AboutCard({ title, description, detailLink }: AboutCardProps) {
  return (
    <div
      className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 cursor-pointer flex flex-col"
      style={{
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        minHeight: "20vw",
        width: "25vw",
        maxWidth: "25vw",
        flexShrink: 0,      // ✅ 강제로 줄어들지 않도록
        display: "flex",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      }}
    >
      {/* 제목 */}
      <h3
        className="font-semibold text-blue-600 leading-tight"
        style={{
          color: "#00A3E0",
          fontSize: "2vw",
          fontWeight: "600",
          margin: "16px 0 24px 8px",
        }}
      >
        {title}
      </h3>

      {/* 설명 */}
      <div
        className="text-gray-700 space-y-2 flex-1 overflow-hidden"
        style={{
          color: "#374151",
          fontSize: "1.2vw",
          fontWeight: "500",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {description.map((line, i) => (
          <div
            key={i}
            className="leading-relaxed truncate"
            style={{
              marginBottom: "8px",
              marginLeft: "8px",
              lineHeight: "1.5",
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* 상세 링크 */}
      {detailLink && (
        <div style={{ marginTop: "16px", marginLeft: "8px" }}>
          <a
            href={detailLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00A3E0",
              fontWeight: "600",
              fontSize: "1vw",
              textDecoration: "none",
            }}
          >
            자세히 보기 →
          </a>
        </div>
      )}
    </div>
  );
}
