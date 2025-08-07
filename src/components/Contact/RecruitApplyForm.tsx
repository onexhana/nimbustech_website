import React, { useState } from "react";

const RecruitApplyForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    resume: null as File | null,
    message: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked, files } = e.target as any;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // TODO: API 연동
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {/* 이름 / 연락처 */}
      <div className="flex gap-2">
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
        />
      </div>

      {/* 이메일 / 이력서 */}
      <div className="flex gap-2 items-center">
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
        />
        <div className="w-1/2 flex items-center gap-2">
          <label className="whitespace-nowrap">이력서</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="flex-1 text-sm"
          />
        </div>
      </div>

      {/* 문의사항 */}
      <textarea
        name="message"
        placeholder="문의사항"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-2 rounded h-20 resize-none"
      />

      {/* 개인정보 수집 동의 */}
      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
        />
        <span>동의합니다</span>
      </label>

      {/* 신청 버튼 */}
      <button
        type="submit"
        className="w-full border border-[#0168b7] text-[#0168b7] font-bold py-2 rounded hover:bg-[#0168b7] hover:text-white transition"
      >
        신청하기
      </button>
    </form>
  );
};

export default RecruitApplyForm;
