// src/pages/AboutPage.tsx
// ========================================
// ABOUT 페이지 메인 페이지 컴포넌트
// 담당자: About 페이지 팀
// 주요 기능: About 섹션 렌더링
// 수정 사항: 없음 (기본 구조 유지)
// ========================================
// AboutSection 컴포넌트: About 페이지의 메인 섹션 컴포넌트를 가져옵니다.
import AboutSection from '../components/About/AboutSection';

// AboutPage 컴포넌트: 라우터에 의해 호출되는 About 페이지 최상위 컴포넌트입니다.
// AboutSection을 포함하여 페이지의 전체 레이아웃을 렌더링합니다.
export default function AboutPage() {
  return <AboutSection />;
}
