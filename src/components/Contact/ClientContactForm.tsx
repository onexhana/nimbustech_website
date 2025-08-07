import React, { useState } from "react";

const ClientContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("제출 데이터:", form);
    // 이후 API 연동 추가 예정
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="company"
          placeholder="회사명"
          value={form.company}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <textarea
        name="message"
        placeholder="문의사항"
        value={form.message}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full h-28 resize-none"
      />

      <label className="flex items-center gap-2 text-sm mt-2">
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
        />
        개인정보 수집에 동의합니다.
      </label>

      {/* ✅ 오른쪽 정렬된 신청 버튼 */}
      <div className="w-full flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#0168b7] text-white px-6 py-2 rounded hover:bg-[#005999] transition"
        >
          신청하기
        </button>
      </div>
    </form>
  );
};

export default ClientContactForm;
