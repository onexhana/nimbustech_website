/** @type {import('tailwindcss').Config} */
// 🔹 Tailwind 설정 파일 (CommonJS 형식)
module.exports = {
  // 🔸 Tailwind가 적용될 템플릿 파일 경로 지정
  // - index.html 및 src 폴더 하위의 .ts, .tsx, .js, .jsx 파일 포함
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

  theme: {
    extend: {
      // 🔹 커스텀 애니메이션 등록
      animation: {
        // 🔸 오른쪽 → 왼쪽으로 이동 (상단 슬라이드용)
        "slide-left": "slideLeft 30s linear infinite",

        // 🔸 왼쪽 → 오른쪽으로 이동 (하단 슬라이드용)
        "slide-right": "slideRight 30s linear infinite",
      },

      // 🔹 직접 정의한 keyframes (프레임별 동작)
      keyframes: {
        // 👉 slideLeft: 왼쪽으로 이동
        slideLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },

        // 👉 slideRight: 오른쪽으로 이동
        slideRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
    },
  },

  // 🔸 Tailwind 플러그인 사용 시 등록 (현재 없음)
  plugins: [],
};
