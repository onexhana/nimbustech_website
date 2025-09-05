// src/components/Contact/ContactSection.tsx
// ========================================
// CONTACT 페이지 메인 섹션 컴포넌트
// 담당자: Contact 페이지 팀
// 주요 기능: Contact 페이지 렌더링
// ========================================

import { useState, useEffect } from 'react';
import InquiryForm from './InquiryForm';
import HiringForm from './HiringForm';

export default function ContactSection() {
  const [userType, setUserType] = useState<'inquiry' | 'hiring' | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    //contact & footer 사이 여백 100px
    <div className="w-full px-6 bg-white" style={{ position: 'relative', paddingTop: '120px', paddingBottom: isMobile ? '0px' : '100px' }}>
      <div className="max-w-7xl mx-auto">
        {/* 검은 실선 (데스크탑에서만 표시) */}
        {!isMobile && (
          <div style={{
            width: '110px',
            height: '3px',
            backgroundColor: '#000000',
            marginLeft: '50px',
            marginBottom: '20px'
          }} />
        )}
        
        {/* 메인 타이틀 (데스크탑에서만 표시) */}
        {!isMobile && (
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
        )}

        {/* 컨텐츠 영역 */}
        <div
          className={`flex ${isMobile ? 'flex-col gap-8 mx-4' : ''}`}
          style={isMobile ? undefined : { marginLeft: '50px', marginRight: '50px', gap: '100px' }}
        >
          {/* 좌측 - 가치 섹션들 */}
          <div className="flex-1 space-y-16">
            {/* TRUST 섹션 */}
            <div>
              <h3 style={{
                fontSize: '45px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '2px',
                letterSpacing: '-1.5px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                TRUST
              </h3>
              <p style={{
                fontSize: isMobile ? '17px' : '21px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '700',
                marginTop: '2px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                구성원 간의 신뢰, 고객과의 신뢰를 기반으로<br />
                모든 협업과 서비스를 책임 있게 수행합니다.
              </p>
            </div>

            {/* OWNERSHIP 섹션 */}
            <div>
              <h3 style={{
                fontSize: '45px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '2px',
                letterSpacing: '-1.5px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                OWNERSHIP
              </h3>
              <p style={{
                fontSize: isMobile ? '17px' : '21px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '700',
                marginTop: '2px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                각자의 역할에 책임을 가지고 임하며,<br />
                스스로 문제를 해결하는 태도를 지향합니다.
              </p>
            </div>

            {/* GROWTH 섹션 */}
            <div>
              <h3 style={{
                fontSize: '45px',
                fontWeight: '900',
                color: '#00A3E0',
                marginBottom: '2px',
                letterSpacing: '-1.5px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                GROWTH
              </h3>
              <p style={{
                fontSize: isMobile ? '17px' : '21px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '700',
                marginTop: '2px',
                marginLeft: isMobile ? '24px' : undefined
              }}>
                기술, AI, 프로젝트 경험을 통해<br />
                개인과 조직이 함께 발전하는 문화를 만들어갑니다.
              </p>
            </div>
          </div>

          {/* 우측 - 버튼 영역 */}
          <div
            className={`flex flex-col gap-8 ${isMobile ? 'min-w-full' : ''}`}
            style={isMobile ? undefined : { minWidth: '300px' }}
          >
            {/* 고객지원 버튼 */}
            <button
              className={`text-white ${isMobile ? 'bg-[#00A3E0] w-full mt-8 h-[74px] px-8 flex items-center justify-center text-[24px] relative overflow-hidden border-none text-white font-extrabold transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}`}
              style={isMobile ? undefined : { backgroundColor: '#00A3E0', width: '530px', marginTop: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', padding: '0 32px', fontSize: '28px', color: '#ffffff', fontWeight: '900', borderRadius: '0px', border: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => setUserType('inquiry')}
            >
              <span
                className={isMobile ? 'relative z-10 text-white !text-white' : undefined}
                style={isMobile ? {color: '#ffffff'} : { position: 'relative', zIndex: 1 }}
              >
                고객사 직원
              </span>
            </button>

            {/* 인재채용 버튼 */}
            <button
              className={`text-white ${isMobile ? 'bg-[#6b7280] w-full mt-4 h-[74px] px-8 flex items-center justify-center text-[24px] relative overflow-hidden border-none text-white font-extrabold transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}`}
              style={isMobile ? undefined : { backgroundColor: '#6b7280', width: '530px', marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', padding: '0 32px', fontSize: '28px', color: '#ffffff', fontWeight: '900', borderRadius: '0px', border: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => setUserType('hiring')}
            >
              <span
                className={isMobile ? 'relative z-10 text-white !text-white' : undefined}
                style={isMobile ? {color: '#ffffff'} : { position: 'relative', zIndex: 1 }}
              >
                인재 채용
              </span>
            </button>
          </div>
        </div>

        {/* 선택된 유형에 따른 폼 인라인 렌더링 */}
        {userType && (
          <>
            {/* 배경 어두운 오버레이 */}
            <div onClick={() => setUserType(null)} style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }} />
            {/* 인라인 폼 렌더링 */}
            {userType === 'inquiry' && (
              <div style={isMobile ? {
                position: 'fixed',
                zIndex: 1001,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90vw',
                maxWidth: '400px',
                maxHeight: '90vh',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                overflow: 'auto'
              } : {
                position: 'fixed',
                zIndex: 1001,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '480px',
                height: '680px',
                overflow: 'hidden'
              }}>
                {isMobile ? (
                  <InquiryForm />
                ) : (
                  <div style={{ position: 'absolute', top: '-31px', left: 0, width: '100%' }}>
                    <InquiryForm />
                  </div>
                )}
              </div>
            )}
            {userType === 'hiring' && (
              <div style={isMobile ? {
                position: 'fixed',
                zIndex: 1001,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90vw',
                maxWidth: '400px',
                maxHeight: '90vh',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                overflow: 'auto'
              } : {
                position: 'fixed',
                zIndex: 1001,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '480px',
                height: '700px',
                overflow: 'hidden'
              }}>
                {isMobile ? (
                  <HiringForm />
                ) : (
                  <div style={{ position: 'absolute', top: '-31px', left: 0, width: '100%' }}>
                    <HiringForm />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}