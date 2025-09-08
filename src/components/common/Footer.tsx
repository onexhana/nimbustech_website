import { useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/회사소개서.pdf';
    link.download = 'NIMBUS_TECH_회사소개서.pdf';
    link.target = '_blank';
    
    fetch('/회사소개서.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          link.click();
        } else {
          alert('회사소개서 파일을 준비 중입니다.');
        }
      })
      .catch(() => {
        alert('회사소개서 파일을 준비 중입니다.');
      });
  };

  const handlePrivacyPolicyDownload = () => {
    const link = document.createElement('a');
    link.href = '/footer_pdf/개인정보+처리방침_v6.1.pdf';
    link.download = 'NIMBUS_TECH_개인정보처리방침.pdf';
    link.target = '_blank';
    
    fetch('/footer_pdf/개인정보+처리방침_v6.1.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          link.click();
        } else {
          alert('개인정보처리방침 파일을 준비 중입니다.');
        }
      })
      .catch(() => {
        alert('개인정보처리방침 파일을 준비 중입니다.');
      });
  };

  return (
    <footer className="bg-[#00A3E0] text-white py-16 px-6 md:px-20">
      <div className="w-full">
        <div>
          {/* 좌측: 로고 및 회사 정보 */}
          <div className="flex flex-col space-y-4">
            {isMobile ? (
              /* 모바일: 한 줄 로고+뱃지+텍스트 */
              <div className="flex items-center justify-center space-x-8" style={isMobile ? { marginTop: '30px', gap: '1rem' } : { marginTop: '30px' }}>
                <img src="/logo/logo_white.png" alt="NIMBUS TECH" style={{ width: '100px', height: 'auto' }} />
                <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1">
                  <img src="/logo/fcs_logo.png" alt="FCS 배지" style={{ width: '40px', height: 'auto' }} />
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>2025 미래창조경영우수기업</span>
                </div>
              </div>
            ) : (
              /* 데스크탑 원본 레이아웃 유지 */
              <div className="flex items-center gap-x-8 md:gap-x-14" style={{ marginLeft: '48px', marginTop: '30px' }}>
                <div className="flex items-center space-x-2">
                  <img src="/logo/logo-white-wide.png" alt="NIMBUS TECH" style={{ width: '200px', height: 'auto' }} />
                </div>
                <div className="bg-white rounded-full px-3 py-1 flex items-center space-x-2" style={{ marginLeft: '30px' }}>
                  <img src="/logo/fcs_logo.png" alt="FCS 배지" style={{ width: '40px', height: 'auto' }} />
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>2025 미래창조경영우수기업</span>
                </div>
              </div>
            )}
            {/* 회사 정보 */}
            <div className={`text-left ${isMobile ? '' : 'text-left pl-10'}`} style={isMobile ? { margin: '16px 0', marginLeft: '24px' } : { margin: '0 0 0 48px' }}>
              <div className={`${isMobile ? 'space-y-0' : 'space-y-1'}`} style={{ lineHeight: '1.4' }}>
                {/* 주소 및 연락처 */}
                <p style={{ fontSize: isMobile ? '12px' : '18px', fontWeight: isMobile ? '300' : undefined, color: 'white', margin: '0', marginTop: isMobile ? '5px' : undefined, marginBottom: isMobile ? '5px' : undefined }}>[세종 본사] 집현중앙7로6, B동 1110호 (세종대명벨리온)</p>
                <p style={{ fontSize: isMobile ? '12px' : '18px', fontWeight: isMobile ? '300' : undefined, color: 'white', margin: '0', marginBottom: isMobile ? '15px' : undefined }}>[서울사무소] 강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)</p>
                <div style={{ paddingTop: '8px' }}>
                  <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'}`}>
                    <div className={isMobile ? 'mb-4 text-left' : ''}>
                      <p style={{ fontSize: isMobile ? '12px' : '18px', fontWeight: isMobile ? '300' : undefined, color: 'white', margin: '0', marginBottom: isMobile ? '3px' : undefined }}>T: 02-555-0099</p>
                      <p style={{ fontSize: isMobile ? '12px' : '18px', fontWeight: isMobile ? '300' : undefined, color: 'white', margin: '0', marginBottom: isMobile ? '5px' : undefined }}>E: nimbustech@nimbustech.co.kr</p>
                    </div>
                    {!isMobile && (
                      <div className="flex flex-col ml-8">
                        {/* 개인정보처리방침 다운로드 버튼 */}
                        <button 
                          onClick={handlePrivacyPolicyDownload}
                          style={{
                            backgroundColor: 'white',
                            color: '#00A3E0',
                            borderRadius: '0px',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            transition: 'all 0.2s ease-in-out',
                            padding: '8px 20px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transform: 'scale(1)',
                            marginBottom: '25px',
                            marginRight: '25px',
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.backgroundColor = ' rgba(0, 163, 224, 1)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'scale(0.95)';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#00A3E0';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#00A3E0';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                          }}
                        >
                          <span>개인정보처리방침</span>
                        </button>

                        {/* 회사소개서 다운로드 버튼 */}
                        <button 
                          onClick={handleDownload}
                          style={{
                            backgroundColor: 'white',
                            color: '#00A3E0',
                            borderRadius: '0px',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            transition: 'all 0.2s ease-in-out',
                            padding: '8px 20px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transform: 'scale(1)',
                            marginBottom: '25px',
                            marginRight: '25px',
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.backgroundColor = ' rgba(0, 163, 224, 1)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'scale(0.95)';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#00A3E0';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#00A3E0';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                          }}
                        >
                          <span>회사소개서 다운로드</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}