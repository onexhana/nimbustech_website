// src/pages/ContactPage.tsx
<<<<<<< HEAD
import ContactSection from '../components/Contact/ContactSection';

export default function ContactPage() {
  return <ContactSection />;
}
=======
import React, { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // 나중에 API 연동
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">문의하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="company"
          placeholder="회사명"
          value={form.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="문의 내용"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <span>개인정보 수집에 동의합니다.</span>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
>>>>>>> feat/sumin-portfolio
