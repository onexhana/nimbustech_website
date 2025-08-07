import React from "react";

// 🔹 컴포넌트에 전달되는 props 정의
type Props = {
  categories: string[];          // 필터로 표시할 카테고리 배열
  selected: string;              // 현재 선택된 카테고리
  onSelect: (cat: string) => void; // 카테고리 선택 시 실행할 함수
};

const FilterBar = ({ categories, selected, onSelect }: Props) => {
  return (
    // 🔹 접근성을 위한 nav + aria-label
    <nav aria-label="산업군 필터">
      {/* 🔹 기본 ul 스타일 제거 (불릿/마진/패딩 제거) + 세로 정렬 */}
      <ul className="list-none m-0 p-0 flex flex-col gap-3">
        {/* 🔁 각 카테고리를 반복 출력 */}
        {categories.map((c) => {
          const active = c === selected; // 현재 선택된 카테고리인지 여부

          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => onSelect(c)} // 🔹 클릭 시 선택 함수 실행
                className={[
                  // ✅ 버튼 기본 스타일
                  "w-[144px] h-10 rounded-full text-sm font-semibold",
                  "border transition-colors duration-150",

                  // ✅ 키보드 접근성용 포커스 스타일
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0168b7]/30",

                  // ✅ 선택된 버튼 vs 기본 버튼 스타일 분기
                  active
                    ? "bg-white text-[#0168b7] border-[#0168b7] shadow-sm"
                    : "bg-[#0168b7] text-white border-[#0168b7] hover:bg-[#0a6fbe]",
                ].join(" ")} // Tailwind 클래스 배열 → 문자열로 결합
              >
                {c}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FilterBar;
