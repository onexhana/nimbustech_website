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
  /** 커스텀 모서리 반경 */
  borderRadius?: string;
  /** 커스텀 타이틀 색상 */
  titleColor?: string;
  /** 커스텀 내용 텍스트 색상 */
  descriptionColor?: string;
  /** 커스텀 배경 색상 */
  backgroundColor?: string;
  /** 버튼 형태 링크 렌더링 여부 */
  linkAsButton?: boolean;
  /** 버튼에 표시할 텍스트 */
  linkText?: string;
  /** 커스텀 카드 폭 (예: "20vw") */
  width?: string;
  /** 커스텀 카드 최소 높이 (예: "16vw") */
  minHeight?: string;
}

export default function AboutCard({ title, description, detailLink, borderRadius, titleColor, descriptionColor, backgroundColor, width, minHeight, linkAsButton, linkText }: AboutCardProps) {
  return (
    <div
      className="bg-gray-100 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 cursor-pointer flex flex-col"
      style={{
        backgroundColor: backgroundColor || "#f3f4f6",
        borderRadius: borderRadius || "8px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        minHeight: minHeight || "20vw",
        width: width || "25vw",
        maxWidth: width || "25vw",
        flexShrink: 0,      // ✅ 강제로 줄어들지 않도록
        display: "flex",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.backgroundColor = "#00A3E0";
        
        // 제목 색상을 흰색으로 변경
        const title = e.currentTarget.querySelector('h3');
        if (title) title.style.color = "white";
        
        // 설명 텍스트 색상을 흰색으로 변경
        const descriptions = e.currentTarget.querySelectorAll('.text-gray-700 div');
        descriptions.forEach(desc => (desc as HTMLElement).style.color = "white");
        
        // 링크 색상을 흰색으로 변경
        const link = e.currentTarget.querySelector('a');
        if (link) link.style.color = "white";
        // 버튼을 흰색 배경, 파란 텍스트로 변경
        const buttonLink = e.currentTarget.querySelector('a');
        if (buttonLink) {
          (buttonLink as HTMLElement).style.backgroundColor = "#ffffff";
          (buttonLink as HTMLElement).style.color = "#00A3E0";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.backgroundColor = backgroundColor || "#f3f4f6";
        // 제목 색상을 원래대로 복원
        const title = e.currentTarget.querySelector('h3');
        if (title) title.style.color = titleColor || "#00A3E0";
        // 설명 텍스트 색상을 원래대로 복원
        const descriptions = e.currentTarget.querySelectorAll('.text-gray-700 div');
        descriptions.forEach(desc => (desc as HTMLElement).style.color = descriptionColor || "#374151");
        // 버튼 링크 색상 및 배경 복원
        const buttonLink = e.currentTarget.querySelector('a');
        if (buttonLink) {
          if (linkAsButton) {
            (buttonLink as HTMLElement).style.color = "#ffffff";
            (buttonLink as HTMLElement).style.backgroundColor = "#00A3E0";
          } else {
            (buttonLink as HTMLElement).style.color = "#00A3E0";
          }
        }
      }}
    >
      {/* 제목 */}
      <h3
        className="font-semibold text-blue-600 leading-tight"
        style={{
          color: titleColor || "#00A3E0",
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
          color: descriptionColor || "#374151",
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
          {linkAsButton ? (
            <a
              href={detailLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#00A3E0",
                color: "#ffffff",
                borderRadius: "20px",
                padding: "8px 20px",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
                display: "inline-block",
              }}
            >
              {linkText || "자세히 보기"}
            </a>
          ) : (
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
              {linkText || "자세히 보기 →"}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
