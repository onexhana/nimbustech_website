// src/components/Contact/InquiryForm.tsx
import { useState } from 'react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    agree: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '이름은 필수 입력입니다.';
    if (!formData.company.trim()) newErrors.company = '회사명은 필수 입력입니다.';
    if (!formData.email.trim()) newErrors.email = '이메일은 필수 입력입니다.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = '유효한 이메일을 입력하세요.';
    if (!formData.phone.trim()) newErrors.phone = '연락처는 필수 입력입니다.';
    if (!formData.message.trim()) newErrors.message = '문의사항을 입력하세요.';
    if (!formData.agree) newErrors.agree = '개인정보 수집에 동의해주세요.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('InquiryForm 제출 데이터:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return <div className="p-8 text-center text-blue-600">문의가 성공적으로 접수되었습니다. 감사합니다!</div>;
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름, 회사명 */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input
              id="inquiry-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="inquiry-company" className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
            <input
              id="inquiry-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>
        </div>
        {/* 이메일, 연락처 */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="inquiry-email" className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="inquiry-phone" className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
        {/* 문의사항 */}
        <div>
          <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-2">문의사항</label>
          <textarea
            id="inquiry-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-200 border-0 rounded-none p-3"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        {/* 동의 체크 */}
        <div className="flex items-center mb-6">
          <input
            id="inquiry-agree"
            name="agree"
            type="checkbox"
            checked={formData.agree}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 mr-2"
          />
          <label htmlFor="inquiry-agree" className="text-sm text-gray-700">개인정보 수집에 동의합니다</label>
        </div>
        {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
        {/* 제출 버튼 */}
        <button
          type="submit"
          className="relative w-full py-4 border border-gray-300 text-blue-500 text-lg font-medium bg-white hover:bg-gray-50"
          style={{ borderRadius: '0px' }}
        >
          신청하기
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%) rotate(90deg)',
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '12px solid #00A3E0'
          }} />
        </button>
      </form>
    </div>
  );
}
