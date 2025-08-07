import React from "react";

interface Props {
  selected: "client" | "recruit" | null;
  setSelected: (value: "client" | "recruit") => void;
}

const ContactUserTypeSelector: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-col items-end gap-3">
      <button
        onClick={() => setSelected("client")}
        className={`w-full md:w-60 px-6 py-3 rounded-full border text-sm font-semibold transition
          ${selected === "client" ? "bg-[#0168b7] text-white" : "bg-white text-[#0168b7]"}
          border-[#0168b7] hover:bg-[#0168b7]/10`}
      >
        고객사 문의
      </button>
      <button
        onClick={() => setSelected("recruit")}
        className={`w-full md:w-60 px-6 py-3 rounded-full border text-sm font-semibold transition
          ${selected === "recruit" ? "bg-[#0168b7] text-white" : "bg-white text-[#0168b7]"}
          border-[#0168b7] hover:bg-[#0168b7]/10`}
      >
        인재 채용 지원
      </button>
    </div>
  );
};

export default ContactUserTypeSelector;
