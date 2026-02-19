// src/components/Contact/InquiryForm.tsx
// Web3Forms 연동 고객 문의 폼

import { useState } from 'react';
import { sendInquiry } from '../../api/contact';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.agree) {
      setSubmitError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendInquiry({
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        agree: formData.agree,
      });
      setSubmitSuccess(true);
      setFormData({ name: '', company: '', email: '', phone: '', message: '', agree: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : '전송에 실패했습니다.';
      setSubmitError(msg + ' (F12 콘솔에서 자세한 오류 확인 가능)');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold text-[#00A3E0]">문의가 접수되었습니다.</p>
        <p className="mt-2 text-gray-600">빠른 시일 내에 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-black mb-6">고객사 문의</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="이름"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            회사 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            placeholder="회사"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="이메일"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="연락처"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            문의사항 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="문의사항을 적어주세요."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none resize-y"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agree}
              onChange={(e) => setFormData((prev) => ({ ...prev, agree: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-[#00A3E0] focus:ring-[#00A3E0]"
            />
            <span className="text-gray-800">
              개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#00A3E0] text-white font-bold text-base rounded-md hover:bg-[#008fc4] disabled:opacity-60"
        >
          {isSubmitting ? '전송 중...' : '제출하기'}
        </button>
      </form>
    </div>
  );
}
