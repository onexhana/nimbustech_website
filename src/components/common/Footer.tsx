import { useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 개인정보처리방침 버튼
  const openPrivacyPolicy = () => {
    window.open('/footer_pdf/개인정보+처리방침_v6.1.pdf', '_blank');
  };

  // 회사소개서 버튼
  const openCompanyIntro = () => {
    window.open('/footer_pdf/님버스테크 회사소개_v3.4_20240701.pdf', '_blank');
  };

  return (
    <footer className="bg-[#00A3E0] text-white py-16 px-6 md:px-20">
      <div className="w-full">
        <div>
          {/* 좌측: 로고 및 회사 정보 */}
          <div className="flex flex-col space-y-4">
            {isMobile ? (
              /* 모바일: 한 줄 로고+뱃지+텍스트 */
              <div
                className="flex items-center justify-start space-x-4"
                style={isMobile ? { marginTop: '30px', marginLeft: '24px', gap: '0.5rem' } : { marginTop: '30px' }}
              >
                <img src="/logo/logo_white.png" alt="NIMBUS TECH" style={{ width: '70px', height: 'auto' }} />
                <img src="/logo/2022_special.png" alt="2022 Special Badge" style={{ width: '120px', height: 'auto' }} />
              </div>
            ) : (
              /* 데스크탑 원본 레이아웃 */
              <div className="flex items-center gap-x-8 md:gap-x-14" style={{ marginLeft: '48px', marginTop: '30px' }}>
                <div className="flex items-center space-x-2">
                  <img src="/logo/logo-white-wide.png" alt="NIMBUS TECH" style={{ width: '200px', height: 'auto' }} />
                </div>
                <div className="flex items-center" style={{ marginLeft: '30px' }}>
                  <img src="/logo/2022_special.png" alt="2022 Special Badge" style={{ width: '160px', height: 'auto' }} />
                </div>
              </div>
            )}
            {/* 회사 정보 */}
            <div
              className={`text-left ${isMobile ? '' : 'text-left pl-10'}`}
              style={isMobile ? { margin: '16px 0', marginLeft: '24px' } : { margin: '0 0 0 48px' }}
            >
              <div className={`${isMobile ? 'space-y-0' : 'space-y-1'}`} style={{ lineHeight: '1.4' }}>
                {/* 주소 및 연락처 */}
                <p
                  style={{
                    fontSize: isMobile ? '15px' : '18px',
                    fontWeight: isMobile ? '450' : undefined,
                    color: 'white',
                    margin: '0',
                    marginTop: isMobile ? '5px' : undefined,
                    marginBottom: isMobile ? '5px' : undefined,
                  }}
                >
                  [세종 본사]
                  {isMobile ? (
                    <>
                      <br />
                      집현중앙7로6, B동 1110호 (세종대명벨리온)
                    </>
                  ) : (
                    ' 집현중앙7로6, B동 1110호 (세종대명벨리온)'
                  )}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? '14px' : '18px',
                    fontWeight: isMobile ? '450' : undefined,
                    color: 'white',
                    margin: '0',
                    marginBottom: isMobile ? '15px' : undefined,
                  }}
                >
                  [서울사무소]
                  {isMobile ? (
                    <>
                      <br />
                      강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)
                    </>
                  ) : (
                    ' 강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)'
                  )}
                </p>
                <div style={{ paddingTop: '7px' }}>
                  <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'}`}>
                    <div className={isMobile ? 'mb-4 text-left' : ''}>
                      <p
                        style={{
                          fontSize: isMobile ? '15px' : '18px',
                          fontWeight: isMobile ? '450' : undefined,
                          color: 'white',
                          margin: '0',
                          marginBottom: isMobile ? '3px' : undefined,
                        }}
                      >
                        T: 02-555-0099
                      </p>
                      <p
                        style={{
                          fontSize: isMobile ? '15px' : '18px',
                          fontWeight: isMobile ? '450' : undefined,
                          color: 'white',
                          margin: '0',
                          marginBottom: isMobile ? '5px' : undefined,
                        }}
                      >
                        E: nimbustech@nimbustech.co.kr
                      </p>
                    </div>
                    {!isMobile && (
                      <div className="flex flex-col ml-8">
                         {/* 개인정보처리방침 버튼 */}
                         <button
                           onClick={openPrivacyPolicy}
                          style={{
                            backgroundColor: 'white',
                            color: '#00A3E0',
                            border: 'none',
                            padding: '8px 20px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: '25px',
                            marginRight: '25px',
                          }}
                        >
                          개인정보 처리방침
                        </button>

                         {/* 회사소개서 버튼 */}
                         <button
                           onClick={openCompanyIntro}
                          style={{
                            backgroundColor: 'white',
                            color: '#00A3E0',
                            border: 'none',
                            padding: '8px 20px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: '25px',
                            marginRight: '25px',
                          }}
                        >
                          회사소개서 다운로드
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
