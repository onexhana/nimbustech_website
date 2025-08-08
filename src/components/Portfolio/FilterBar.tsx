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
    <nav aria-label="산업군 필터" className="w-full">
      {/* 버튼 그룹 래퍼: 좌측 영역에서 더 좁게 제한 (시안: 약 180px) */}
      <ul className="list-none m-0 p-0 flex flex-col gap-y-2 max-w-[180px] w-[180px]">
        {/* 🔁 각 카테고리를 반복 출력 */}
        {categories.map((c) => {
          const active = c === selected; // 현재 선택된 카테고리인지 여부

          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => onSelect(c)}
                className={[
                  // 크기 및 모양
                  "w-full h-[44px] rounded-full px-4",
                  // 타이포
                  "text-[16px] font-bold",
                  // 포커스 접근성
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]/30",
                  // 상태별 스타일
                  active
                    ? "bg-white text-[#00AEEF] border-2 border-[#00AEEF]"
                    : "bg-[#00AEEF] text-white border-2 border-[#00AEEF]",
                ].join(" ")}
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
