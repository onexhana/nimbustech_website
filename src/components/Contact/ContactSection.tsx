// src/components/Contact/ContactSection.tsx
// ========================================
// CONTACT 페이지 메인 섹션 컴포넌트
// 담당자: Contact 페이지 팀
// 주요 기능: Contact 페이지 렌더링
// ========================================

import { useState } from 'react';
import InquiryForm from './InquiryForm';
import HiringForm from './HiringForm';

export default function ContactSection() {
  const [userType, setUserType] = useState<'inquiry' | 'hiring' | null>(null);

  return (
    <div className="w-full px-6 py-12 bg-white" style={{ paddingTop: '120px' }}>
      <div className="max-w-7xl mx-auto">
        {/* 검은 실선 */}
        <div style={{
          width: '110px',
          height: '3px',
          backgroundColor: '#000000',
          marginLeft: '50px',
          marginBottom: '20px'
        }}></div>
        
        {/* 메인 타이틀 */}
        <h2 style={{
          fontSize: '45px',
          fontWeight: '1100',
          marginBottom: '80px',
          color: '#1f2937',
          lineHeight: '1.2',
          letterSpacing: '-3.5px',
          marginLeft: '50px'
        }}>
          Contact
        </h2>

        {/* 컨텐츠 영역 */}
        <div className="flex" style={{ marginLeft: '50px', marginRight: '50px', gap: '100px' }}>
          {/* 좌측 - 가치 섹션들 */}
          <div className="flex-1 space-y-16">
            {/* TRUST 섹션 */}
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '16px',
                letterSpacing: '-1.5px'
              }}>
                TRUST
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                구성원 간의 신뢰, 고객과의 신뢰를 기반으로<br />
                모든 협업과 서비스를 책임 있게 수행합니다.
              </p>
            </div>

            {/* OWNERSHIP 섹션 */}
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '16px',
                letterSpacing: '-1.5px'
              }}>
                OWNERSHIP
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                각자의 역할에 책임을 가지고 임하며,<br />
                스스로 문제를 해결하는 태도를 지향합니다.
              </p>
            </div>

            {/* GROWTH 섹션 */}
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '16px',
                letterSpacing: '-1.5px'
              }}>
                GROWTH
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                기술, AI, 프로젝트 경험을 통해<br />
                개인과 조직이 함께 발전하는 문화를 만들어갑니다.
              </p>
            </div>
          </div>

          {/* 우측 - 버튼 영역 */}
          <div className="flex flex-col gap-8" style={{ minWidth: '300px' }}>
            {/* 고객지원 버튼 */}
            <button
              className="w-full text-white font-bold py-6 px-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: '#00A3E0',
                fontSize: '20px',
                fontWeight: '700',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setUserType('inquiry')}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>고객지원</span>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  transform: 'translateY(-50%)',
                  fontSize: '24px',
                  color: 'white'
                }}
              >
                ➤
              </div>
            </button>

            {/* 인재채용 버튼 */}
            <button
              className="w-full text-white font-bold py-6 px-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: '#6b7280',
                fontSize: '20px',
                fontWeight: '700',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setUserType('hiring')}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>인재채용</span>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  transform: 'translateY(-50%)',
                  fontSize: '24px',
                  color: 'white'
                }}
              >
                ➤
              </div>
            </button>
          </div>
        </div>

        {/* 선택된 유형에 따른 폼 렌더링 */}
        <div className="mt-12">
          {userType === 'inquiry' && <InquiryForm />}
          {userType === 'hiring' && <HiringForm />}
        </div>
      </div>
    </div>
  );
}
