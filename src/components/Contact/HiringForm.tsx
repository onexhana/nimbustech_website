// src/components/Contact/HiringForm.tsx
// React import removed (React 17+ JSX Transform 사용)
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export default function HiringForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    resume: '',
    message: '',
    agree: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '이름은 필수 입력입니다.';
    if (!formData.phone.trim()) newErrors.phone = '연락처는 필수 입력입니다.';
    if (!formData.email.trim()) newErrors.email = '이메일은 필수 입력입니다.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = '유효한 이메일을 입력하세요.';
    if (!formData.resume.trim()) newErrors.resume = '이력서를 입력하세요.';
    if (!formData.message.trim()) newErrors.message = '문의사항을 입력하세요.';
    if (!formData.agree) newErrors.agree = '개인정보 수집에 동의해주세요.';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('HiringForm 제출 데이터:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return <div className="p-8 text-center text-blue-600">인재채용 문의가 성공적으로 접수되었습니다. 감사합니다!</div>;
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="hiring-name" className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input
              id="hiring-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="hiring-phone" className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
            <input
              id="hiring-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="hiring-email" className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              id="hiring-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="hiring-resume" className="block text-sm font-medium text-gray-700 mb-2">이력서</label>
            <input
              id="hiring-resume"
              name="resume"
              type="text"
              value={formData.resume}
              onChange={handleChange}
              className="w-full bg-gray-200 border-0 rounded-none p-3 h-12"
            />
            {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="hiring-message" className="block text-sm font-medium text-gray-700 mb-2">문의사항</label>
          <textarea
            id="hiring-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-200 border-0 rounded-none p-3"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <div className="flex items-center mb-6">
          <input
            id="hiring-agree"
            name="agree"
            type="checkbox"
            checked={formData.agree}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 mr-2"
          />
          <label htmlFor="hiring-agree" className="text-sm text-gray-700">개인정보 수집에 동의합니다</label>
        </div>
        {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
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
