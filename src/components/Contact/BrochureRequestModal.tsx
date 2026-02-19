// src/components/Contact/BrochureRequestModal.tsx
// 회사소개서 다운로드 요청 팝업 - 정보 입력 후 이메일로 전달

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { sendBrochureRequest } from '../../api/contact';
import type { BrochureRequestData } from '../../types/contact';

interface BrochureRequestModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const BROCHURE_OPTIONS = [
  { id: 'company', label: '회사소개서', value: '회사소개서' },
];

export default function BrochureRequestModal({ onClose, onSuccess }: BrochureRequestModalProps) {
  const [formData, setFormData] = useState({
    brochureType: ['회사소개서'] as string[],
    email: '',
    name: '',
    phone: '',
    company: '',
    position: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleBrochureToggle = (value: string) => {
    setFormData((prev) => {
      const next = prev.brochureType.includes(value)
        ? prev.brochureType.filter((v) => v !== value)
        : [...prev.brochureType, value];
      return { ...prev, brochureType: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.agreePrivacy) {
      setSubmitError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (formData.brochureType.length === 0) {
      setSubmitError('소개서를 하나 이상 선택해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError('이메일을 입력해주세요.');
      return;
    }
    if (!formData.name.trim()) {
      setSubmitError('이름을 입력해주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError('전화번호를 입력해주세요.');
      return;
    }
    if (!formData.company.trim()) {
      setSubmitError('회사명을 입력해주세요.');
      return;
    }
    if (!formData.position.trim()) {
      setSubmitError('포지션을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data: BrochureRequestData = {
        brochureType: formData.brochureType,
        email: formData.email.trim(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        position: formData.position.trim(),
        agreePrivacy: formData.agreePrivacy,
      };
      await sendBrochureRequest(data);
      onSuccess?.();
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 컨텐츠 */}
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <h2
            id="brochure-modal-title"
            className="text-xl md:text-2xl font-bold text-black mb-6"
          >
            님버스테크 소개서 신청하기
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 소개서 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                확인하고 싶으신 소개서를 선택해주세요 (중복 선택) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {BROCHURE_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.brochureType.includes(opt.value)}
                      onChange={() => handleBrochureToggle(opt.value)}
                      className="w-4 h-4 rounded border-gray-300 text-[#00A3E0] focus:ring-[#00A3E0]"
                    />
                    <span className="text-gray-800">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">소개서는 이메일로 전달드리니 꼭 정확한 이메일을 기입해주세요.</p>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                required
              />
            </div>

            {/* 이름 / 전화번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                  required
                />
              </div>
            </div>

            {/* 회사명 / 포지션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="(주)회사명"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  포지션 <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">회사 내 본인의 직위, 직책을 입력해주세요. ex) 세일즈 매니저</p>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                  placeholder="직위/직책"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                  required
                />
              </div>
            </div>

            {/* 개인정보 동의 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                개인정보 수집 및 이용 동의 (필수) <span className="text-red-500">*</span>
              </label>
              <a
                href="/footer_pdf/개인정보 처리방침_v1.0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#00A3E0] hover:underline mb-2"
              >
                개인정보 처리방침 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={() => setFormData((prev) => ({ ...prev, agreePrivacy: true }))}
                  className="w-4 h-4 text-[#00A3E0] focus:ring-[#00A3E0]"
                />
                <span className="text-gray-800">네, 동의합니다.</span>
              </label>
            </div>

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#00A3E0] text-white font-bold text-base md:text-lg rounded-md hover:bg-[#008fc4] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  '전송 중...'
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    회사소개서 다운로드 신청
                  </>
                )}
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
