// src/components/Contact/BrochureDownloadModal.tsx
// 회사소개서 다운로드 전 개인정보 입력 팝업

import { useState, useCallback } from 'react';
import type { BrochureDownloadData } from '../../types/contact';
import { sendBrochureRequest } from '../../api/contact';

const BROCHURE_PDF_PATH = '/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 제출 성공 후 다운로드 트리거용 (모달 닫기 + PDF 열기) */
  onSuccess?: () => void;
}

export default function BrochureDownloadModal({ isOpen, onClose, onSuccess }: BrochureDownloadModalProps) {
  const [form, setForm] = useState<BrochureDownloadData>({
    name: '',
    company: '',
    email: '',
    contact: '',
    inquiry: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BrochureDownloadData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const next: Partial<Record<keyof BrochureDownloadData, string>> = {};
    if (!form.name?.trim()) next.name = '이름을 입력해 주세요.';
    if (!form.company?.trim()) next.company = '회사를 입력해 주세요.';
    if (!form.email?.trim()) next.email = '이메일을 입력해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = '올바른 이메일을 입력해 주세요.';
    if (!form.inquiry?.trim()) next.inquiry = '문의사항을 입력해 주세요.';
    if (!form.contact?.trim()) next.contact = '연락처를 입력해 주세요.';
    if (!form.agree) next.agree = '개인정보 수집 및 이용에 동의해 주세요.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    try {
      await sendBrochureRequest(form);
      onSuccess?.();
      window.open(BROCHURE_PDF_PATH, '_blank');
      onClose();
      setForm({ name: '', company: '', email: '', contact: '', inquiry: '', agree: false });
    } catch {
      // 백엔드 미구현 시에도 다운로드는 허용
      onSuccess?.();
      window.open(BROCHURE_PDF_PATH, '_blank');
      onClose();
      setForm({ name: '', company: '', email: '', contact: '', inquiry: '', agree: false });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof BrochureDownloadData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        role="presentation"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
        }}
      />
      {/* 모달 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          zIndex: 2001,
          padding: '32px 28px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="brochure-modal-title" className="sr-only">
          회사소개서 다운로드 시 개인정보 입력
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px', marginBottom: '16px' }}>
            <div>
              <label htmlFor="brochure-name" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                이름 <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="brochure-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="이름"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${errors.name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.name && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="brochure-company" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                회사 <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="brochure-company"
                type="text"
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="회사"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${errors.company ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.company && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="brochure-email" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                이메일 <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="brochure-email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="이메일"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${errors.email ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.email && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="brochure-contact" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                연락처 <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="brochure-contact"
                type="tel"
                value={form.contact ?? ''}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="연락처"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${errors.contact ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.contact && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.contact}</p>}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="brochure-inquiry" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              문의사항 <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="brochure-inquiry"
              value={form.inquiry}
              onChange={(e) => handleChange('inquiry', e.target.value)}
              placeholder="문의사항을 적어주세요."
              rows={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${errors.inquiry ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
            {errors.inquiry && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.inquiry}</p>}
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              개인정보 수집 및 이용 동의 <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => handleChange('agree', e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#00A3E0' }}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>동의합니다</span>
            </label>
            {errors.agree && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{errors.agree}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.8 : 1,
            }}
          >
            {submitting ? '제출 중...' : '제출하기'}
          </button>
        </form>
      </div>
    </>
  );
}
