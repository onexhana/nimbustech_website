// pages/ContactPage.tsx
import React, { useState } from "react";
import ContactUserTypeSelector from "@/components/Contact/ContactUserTypeSelector";
import ContactModal from "@/components/Contact/ContactModal";

const ContactPage = () => {
  const [selected, setSelected] = useState<"client" | "recruit" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type: "client" | "recruit") => {
    setSelected(type);
    setIsOpen(true); // ← 버튼 클릭 시 모달 열기
  };

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
      {/* 좌측 조직 키워드 */}
      <div className="space-y-6 text-sm max-w-md">
        <div>
          <h3 className="text-[#0168b7] font-bold text-lg">TRUST</h3>
          <p>구성원 간의 신뢰, 고객과의 신뢰를 기반으로 모든 협력과 서비스를 책임 있게 수행합니다.</p>
        </div>
        <div>
          <h3 className="text-[#0168b7] font-bold text-lg">OWNERSHIP</h3>
          <p>각자의 역할에 책임을 가지고 임하며, 스스로 문제를 해결하는 리더로 성장합니다.</p>
        </div>
        <div>
          <h3 className="text-[#0168b7] font-bold text-lg">GROWTH</h3>
          <p>기술, AI, 프로젝트 경험을 통해 개인의 조력이 넓게 반영되는 문화를 만들어갑니다.</p>
        </div>
      </div>

      {/* 우측 사용자 유형 선택 버튼 */}
      <ContactUserTypeSelector selected={selected} setSelected={handleSelect} />

      {/* 모달 */}
      {selected && (
        <ContactModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type={selected}
        />
      )}
    </section>
  );
};

export default ContactPage;
