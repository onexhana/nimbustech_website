// src/constants/aboutKeywords.ts
// ========================================
// ABOUT 페이지 키워드 아이콘 데이터
// 담당자: About 페이지 팀
// 주요 기능: 키워드 아이콘 컴포넌트용 데이터
// 수정 사항: 현재 미사용 (향후 확장 예정)
// ========================================
export interface KeywordData {
  keyword: string;
  icon: string;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

// ========================================
// 탭별 키워드 아이콘 데이터 (현재 미사용)
// ========================================
export const aboutKeywords: Record<string, KeywordData[]> = {
  ITO: [
    { keyword: "전담관리", icon: "👤", description: "전담 매니저 시스템", color: "blue" },
    { keyword: "신뢰구축", icon: "🤝", description: "고객사 신뢰 관계", color: "green" },
    { keyword: "체계적", icon: "📋", description: "프로젝트 관리", color: "purple" }
  ],
  클라우드: [
    { keyword: "G-클라우드", icon: "☁️", description: "공공 클라우드", color: "blue" },
    { keyword: "확장성", icon: "📈", description: "자동 스케일링", color: "green" },
    { keyword: "보안", icon: "🔒", description: "데이터 보호", color: "orange" }
  ],
  RPA: [
    { keyword: "자동화", icon: "🤖", description: "프로세스 자동화", color: "purple" },
    { keyword: "효율성", icon: "⚡", description: "업무 효율 극대화", color: "orange" },
    { keyword: "파트너십", icon: "🤝", description: "삼성SDS 파트너", color: "blue" }
  ],
  솔루션: [
    { keyword: "통합", icon: "🔗", description: "시스템 통합", color: "green" },
    { keyword: "컨설팅", icon: "💡", description: "기술 컨설팅", color: "blue" },
    { keyword: "커스터마이징", icon: "⚙️", description: "맞춤형 솔루션", color: "purple" }
  ]
};
