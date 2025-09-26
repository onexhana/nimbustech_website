// src/components/Contact/ContactSection.tsx
// ========================================
// CONTACT 페이지 메인 섹션 컴포넌트
// 담당자: Contact 페이지 팀
// 주요 기능: Contact 페이지 렌더링
// ========================================

import { useState, useEffect } from 'react';
import InquiryForm from './InquiryForm';
import HiringForm from './HiringForm';
import { useContactData } from '../../context/ContactContext';

export default function ContactSection() {
  const { contactData } = useContactData();
  const [userType, setUserType] = useState<'inquiry' | 'hiring' | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCompanyDownload = () => {
    window.open('/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf', '_blank');
  };

  const handlePrivacyPolicy = () => {
    window.open('/footer_pdf/개인정보 처리방침_v1.0.pdf', '_blank');
  };

  return (
    //contact & footer 사이 여백 100px
    <div className={`w-full px-6 ${isMobile ? 'bg-transparent' : 'bg-white'}`} style={{ position: 'relative', paddingTop: isMobile ? '50px' : '120px', paddingBottom: isMobile ? '0px' : '100px', backgroundColor: isMobile ? 'transparent' : undefined }}>
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


        {/* 컨텐츠 영역 */}
        <div
          className={`flex ${isMobile ? 'flex-col mx-4' : ''}`}
          style={isMobile ? { gap: '4rem' } : { marginLeft: '50px', marginRight: '50px', gap: '100px' }}
        >
          {/* 좌측 - 가치 섹션들 */}
          <div className="flex-1 space-y-16">
            {contactData.sections.map((section, index) => (
              <div key={index}>
                <h3 style={{
                  fontSize: `${contactData.fontSize?.sectionTitle || 42}px`,
                  fontWeight: '900',
                  color: '#00A3E0',
                  marginBottom: '2px',
                  letterSpacing: '-1.5px',
                  marginLeft: isMobile ? '20px' : undefined
                }}>
                  {section.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? `${contactData.fontSize?.sectionDescription || 15}px` : `${contactData.fontSize?.sectionDescription || 21}px`,
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontWeight: '700',
                  marginTop: '2px',
                  marginLeft: isMobile ? '24px' : undefined
                }}>
                  {section.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < section.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {/* 우측 - 버튼 영역 */}
          <div
            className={`flex flex-col gap-8 ${isMobile ? 'min-w-full' : ''}`}
            style={isMobile ? undefined : { minWidth: '300px' }}
          >
            {contactData.buttons.map((button, index) => (
              <button
                key={index}
                className={`text-white ${isMobile ? `w-full h-[74px] px-8 flex items-center justify-center relative overflow-hidden border-none !font-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${index === 1 ? 'bg-white text-[#00A3E0]' : 'bg-[#00A3E0] text-white'}` : ''}`}
                style={isMobile ? { 
                  fontSize: `${contactData.fontSize?.buttonText || 24}px`,
                  marginTop: index === 0 ? '32px' : '0px'
                } : { 
                  backgroundColor: index === 0 ? '#00A3E0' : '#6b7280', 
                  width: '530px', 
                  marginTop: index === 0 ? '320px' : '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '80px', 
                  padding: '0 32px', 
                  fontSize: `${contactData.fontSize?.buttonText || 32}px`, 
                  color: '#ffffff', 
                  fontWeight: '650', 
                  borderRadius: '0px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  position: 'relative', 
                  overflow: 'hidden' 
                }}
                onClick={() => setUserType(isMobile && userType === button.type ? null : button.type as 'inquiry' | 'hiring')}
              >
                <span
                  className={isMobile ? `relative z-10 ${index === 1 ? 'text-[#00A3E0]' : 'text-white'}` : undefined}
                  style={isMobile ? { color: index === 1 ? '#00A3E0' : '#ffffff', fontWeight: '700' } : { position: 'relative', zIndex: 1 }}
                >
                  {button.text}
                </span>
              </button>
            ))}
            {isMobile && (
              <>
                <button
                  className="bg-[#00A3E0] text-white w-full h-[74px] px-8 flex items-center justify-center relative overflow-hidden border-none font-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ 
                    color: '#ffffff',
                    fontSize: `${contactData.fontSize?.buttonText || 24}px`,
                    marginTop: '0px'
                  }}
                  onClick={handleCompanyDownload}
                >
                  <span className="relative z-10 text-white" style={{ fontWeight: '700' }}>회사소개서 다운로드</span>
                </button>
                <button
                  className="bg-white w-full h-[74px] px-8 flex items-center justify-center relative overflow-hidden border-none text-[#00A3E0] font-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ 
                    backgroundColor: '#ffffff',
                    fontSize: `${contactData.fontSize?.buttonText || 24}px`,
                    marginTop: '0px'
                  }}
                  onClick={handlePrivacyPolicy}
                >
                  <span className="relative z-10" style={{ fontWeight: '700' }}>개인정보 처리방침</span>
                </button>
              </>
            )}
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
                width: '80vw',
                maxWidth: '360px',
                maxHeight: '90vh',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                padding: '20px',
                overflow: 'hidden'
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
                  <div style={{ marginTop: '-51px', marginBottom: '-120px' }}>
                    <InquiryForm />
                  </div>
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
                width: '80vw',
                maxWidth: '360px',
                maxHeight: '90vh',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                padding: '20px',
                overflow: 'hidden'
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
                  <div style={{ marginTop: '-51px', marginBottom: '-130px' }}>
                    <HiringForm />
                  </div>
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