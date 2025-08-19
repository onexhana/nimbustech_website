/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 PRETENDARD 폰트 설정 - Tailwind CSS 전용
      // font-sans 클래스 사용 시 Pretendard 폰트가 적용됨
      // fallback 폰트들로 크로스 플랫폼 호환성 보장
      fontFamily: {
        'sans': [
          'Pretendard Variable', // 가변 폰트 (우선순위 1)
          'Pretendard',          // 일반 폰트 (우선순위 2)
          '-apple-system',       // macOS 시스템 폰트
          'BlinkMacSystemFont',  // macOS 웹킷 폰트
          'system-ui',           // 시스템 기본 폰트
          'Roboto',              // Android 기본 폰트
          'Helvetica Neue',      // macOS/iOS 폰트
          'Segoe UI',            // Windows 기본 폰트
          'Apple SD Gothic Neo', // macOS 한글 폰트
          'Noto Sans KR',        // Google 한글 폰트
          'Malgun Gothic',       // Windows 한글 폰트
          'Apple Color Emoji',   // 이모지 지원
          'Segoe UI Emoji',      // Windows 이모지
          'Segoe UI Symbol',     // Windows 심볼
          'sans-serif'           // 최종 fallback
        ],
      },
    },
  },
  plugins: [],
};