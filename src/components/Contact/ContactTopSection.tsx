import { FC } from "react";

interface Props {
  selected: "client" | "recruit" | null;
  setSelected: (value: "client" | "recruit") => void;
}

const ContactTopSection: FC<Props> = ({ selected, setSelected }) => {
  const keywords = [
    {
      title: "TRUST",
      description: "구성원 간의 신뢰, 고객과의 신뢰를 기반으로\n모든 협력과 서비스를 책임 있게 수행합니다.",
    },
    {
      title: "OWNERSHIP",
      description: "각자의 역할에 책임을 가지고 임하며,\n스스로 문제를 해결하는 리더로 성장합니다.",
    },
    {
      title: "GROWTH",
      description: "기술, AI, 프로젝트 경험을 통해\n개인의 조력이 넓게 반영되는 문화를 만들어갑니다.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left: 키워드 목록 */}
      <div className="space-y-6">
        {keywords.map((kw) => (
          <div key={kw.title}>
            <h3 className="text-[#0168b7] font-bold text-lg">{kw.title}</h3>
            <p className="text-sm whitespace-pre-line text-gray-800">{kw.description}</p>
          </div>
        ))}
      </div>

      {/* Right: 사용자 유형 선택 버튼 */}
      <div className="space-y-4">
        <button
          onClick={() => setSelected("client")}
          className={`w-full text-white font-bold py-3 rounded-tr-md rounded-bl-md transition-all
            ${selected === "client" ? "bg-[#0168b7]" : "bg-gray-400 hover:bg-gray-500"}`}
        >
          고객사 직원
        </button>
        <button
          onClick={() => setSelected("recruit")}
          className={`w-full text-white font-bold py-3 rounded-tr-md rounded-bl-md transition-all
            ${selected === "recruit" ? "bg-[#0168b7]" : "bg-gray-400 hover:bg-gray-500"}`}
        >
          인재 채용
        </button>
      </div>
    </div>
  );
};

export default ContactTopSection;
