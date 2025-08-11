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
    return <div style={{
      // 내부 여백 (전체 컨테이너 패딩)
      padding: '32px',
      // 텍스트 가운데 정렬
      textAlign: 'center',
      // 텍스트 색상 (파란색 계열)
      color: '#3182ce'
    }}>문의가 성공적으로 접수되었습니다. 감사합니다!</div>;
  }

  return (
    <div style={{
      // 내부 여백 (컨테이너 패딩)
      padding: '32px'
    }}>
      <form onSubmit={handleSubmit} style={{
        // 레이아웃: 수직 정렬형 flex 컨테이너
        display: 'flex',
        // 수직 방향 정렬
        flexDirection: 'column',
        // 폼 요소 간 세로 간격
        gap: '24px'
      }}>
        {/* 이름, 회사명 */}
        <div style={{
          // 2열 그리드 레이아웃
          display: 'grid',
          // 각 열의 비율
          gridTemplateColumns: 'repeat(2, 1fr)',
          // 칸 간 간격
          gap: '70px'
        }}>
          <div>
            <label htmlFor="inquiry-name" style={{
              // 블록 레벨 요소로 표시하여 줄바꿈
              display: 'block',
              // 폰트 크기 설정
              fontSize: '0.875rem',
              // 폰트 두께
              fontWeight: 500,
              // 라벨 색상 (회색 계열)
              color: '#4a5568',
              // 라벨 아래쪽 여백
              marginBottom: '0.5rem'
            }}>이름</label>
            <input
              id="inquiry-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              style={{
                // 너비 100%로 가득 채우기
                width: '100%',
                // 입력 배경색 (밝은 회색)
                backgroundColor: '#edf2f7',
                // 테두리 제거
                border: 'none',
                // 모서리 둥글기 없음
                borderRadius: '0px',
                // 내부 여백
                padding: '0.75rem',
                // 고정 높이
                height: '1.5rem'
              }}
            />
            {errors.name && <p style={{
              // 에러 메시지 색상 (빨간색)
              color: '#f56565',
              // 폰트 크기
              fontSize: '0.875rem',
              // 위쪽 여백
              marginTop: '0.25rem'
            }}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="inquiry-company" style={{
              // 블록 레벨 요소
              display: 'block',
              // 폰트 크기
              fontSize: '0.875rem',
              // 폰트 두께
              fontWeight: 500,
              // 라벨 색상
              color: '#4a5568',
              // 아래쪽 여백
              marginBottom: '0.5rem'
            }}>회사명</label>
            <input
              id="inquiry-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              style={{
                // 너비 100%
                width: '100%',
                // 배경색
                backgroundColor: '#edf2f7',
                // 테두리 제거
                border: 'none',
                // 모서리 반경 없음
                borderRadius: '0px',
                // 내부 여백
                padding: '0.75rem',
                // 높이 고정
                height: '1.5rem'
              }}
            />
            {errors.company && <p style={{
              // 에러 텍스트 색상
              color: '#f56565',
              // 폰트 크기
              fontSize: '0.875rem',
              // 위쪽 여백
              marginTop: '0.25rem'
            }}>{errors.company}</p>}
          </div>
        </div>
        {/* 이메일, 연락처 */}
        <div style={{
          // 2열 그리드 레이아웃
          display: 'grid',
          // 열 비율 설정
          gridTemplateColumns: 'repeat(2, 1fr)',
          // 아이템 간 간격
          gap: '70px'
        }}>
          <div>
            <label htmlFor="inquiry-email" style={{
              // 블록으로 표시
              display: 'block',
              // 폰트 크기
              fontSize: '0.875rem',
              // 두께
              fontWeight: 500,
              // 색상
              color: '#4a5568',
              // 밑 마진
              marginBottom: '0.5rem'
            }}>이메일</label>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                // 너비 100%
                width: '100%',
                // 배경색
                backgroundColor: '#edf2f7',
                // 테두리 제거
                border: 'none',
                // 반경 없음
                borderRadius: '0px',
                // 패딩
                padding: '0.75rem',
                // 높이
                height: '1.5rem'
              }}
            />
            {errors.email && <p style={{
              // 에러 색상
              color: '#f56565',
              // 크기
              fontSize: '0.875rem',
              // 마진
              marginTop: '0.25rem'
            }}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="inquiry-phone" style={{
              // 블록 표시
              display: 'block',
              // 폰트 크기
              fontSize: '0.875rem',
              // 두께
              fontWeight: 500,
              // 색상
              color: '#4a5568',
              // 마진
              marginBottom: '0.5rem'
            }}>연락처</label>
            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              style={{
                // 너비 100%
                width: '100%',
                // 배경색
                backgroundColor: '#edf2f7',
                // 테두리 없음
                border: 'none',
                // 반경 없음
                borderRadius: '0px',
                // 패딩
                padding: '0.75rem',
                // 높이
                height: '1.5rem'
              }}
            />
            {errors.phone && <p style={{
              // 에러 색상
              color: '#f56565',
              // 크기
              fontSize: '0.875rem',
              // 마진
              marginTop: '0.25rem'
            }}>{errors.phone}</p>}
          </div>
        </div>
        {/* 문의사항 */}
        <div>
          <label htmlFor="inquiry-message" style={{
            // 블록 표시
            display: 'block',
            // 크기
            fontSize: '0.875rem',
            // 두께
            fontWeight: 500,
            // 색상
            color: '#4a5568',
            // 마진
            marginBottom: '0.5rem'
          }}>문의사항</label>
          <textarea
            id="inquiry-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={{
              // 너비 100%
              width: '100%',
              // 배경색
              backgroundColor: '#edf2f7',
              // 테두리 없음
              border: 'none',
              // 반경 없음
              borderRadius: '0px',
              // 패딩
              padding: '0.75rem',
              // 높이
              height: '1.5rem'
              
            }}
          />
          {errors.message && <p style={{
            // 에러 색상
            color: '#f56565',
            // 크기
            fontSize: '0.875rem',
            // 마진
            marginTop: '0.25rem'
          }}>{errors.message}</p>}
        </div>
        {/* 동의 체크 */}
        <div style={{
          // 수평 축 아이템 정렬용 컨테이너
          display: 'flex',
          // 수직 정렬
          alignItems: 'center',
          // 아래 여백
          marginBottom: '24px'
        }}>
          <input id="inquiry-agree" name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} style={{
            // 체크박스 크기 설정
            width: '1rem',
            height: '1rem',
            // 오른쪽 여백
            marginRight: '0.5rem'
          }} />
          <label htmlFor="inquiry-agree" style={{
            // 라벨 크기
            fontSize: '0.875rem',
            // 색상
            color: '#4a5568'
          }}>개인정보 수집에 동의합니다</label>
        </div>
        {errors.agree && <p style={{
          // 에러 색상
          color: '#f56565',
          // 크기
          fontSize: '0.875rem',
          // 위 마진
          marginTop: '0.25rem'
        }}>{errors.agree}</p>}
        {/* 제출 버튼 */}
        <button
          type="submit"
          style={{
            // 버튼 위치: 상대 위치
            position: 'relative',
            // 너비 100%
            width: '100%',
            // 세로 패딩
            padding: '1rem 0',
            // 테두리 스타일
            border: '1px solid #e2e8f0',
            // 텍스트 색상
            color: '#3182ce',
            // 폰트 크기
            fontSize: '1.125rem',
            // 글자 두께
            fontWeight: 500,
            // 배경색
            backgroundColor: '#ffffff',
            // 반경 없음
            borderRadius: '0px'
          }}
        >
          신청하기
          <div style={{
            // 화살표 위치: 절대 위치 설정
            position: 'absolute',
            // 수직 중앙 정렬
            top: '50%',
            // 오른쪽 여백
            right: '16px',
            // 위치와 회전 조정
            transform: 'translateY(-50%) rotate(90deg)',
            // 삼각형 너비
            width: 0,
            // 삼각형 높이
            height: 0,
            // 투명 상단 테두리
            borderTop: '8px solid transparent',
            // 투명 하단 테두리
            borderBottom: '8px solid transparent',
            // 왼쪽 테두리로 화살표 색상 설정
            borderLeft: '12px solid #00A3E0'
          }} />
        </button>
      </form>
    </div>
  );
}
