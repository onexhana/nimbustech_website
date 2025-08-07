export default function Footer() {
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

  return (
    <footer className="bg-[#00A3E0] text-white py-16 px-6 md:px-20">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          
          {/* 좌측: 로고 및 회사 정보 */}
          <div className="flex flex-col space-y-4 flex-1">
            {/* 로고 및 배지 */}
            <div className="flex items-center space-x-3" style={{ marginLeft: '64px', marginTop: '30px' }}>
              {/* NIMBUS TECH 로고 */}
              <div className="flex items-center space-x-2">
                <img src="/cloud-white.png" alt="NIMBUS TECH" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>NIMBUS TECH</span>
              </div>
              
              {/* FCS 배지 */}
              <div className="bg-white rounded-full px-3 py-1 flex items-center space-x-2">
                <img src="/fcs_logo.png" alt="FCS 배지" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>2025 미래창조경영우수기업</span>

              </div>
            </div>

            {/* 회사 정보 */}
            <div className="text-left pl-10" style={{ marginLeft: '64px' }}>
              <div className="space-y-1" style={{ lineHeight: '1.6' }}>
                <p style={{ fontSize: '16px', color: 'white' }}>[세종 본사] 집현중앙7로6, B동 1110호 (세종대명벨리온)</p>
                <p style={{ fontSize: '16px', color: 'white' }}>[서울사무소] 강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)</p>
                <div style={{ paddingTop: '8px' }}>
                  <p style={{ fontSize: '16px', color: 'white' }}>T: 02-555-0099</p>
                  <p style={{ fontSize: '16px', color: 'white' }}>E: nimbustech@nimbustech.co.kr</p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 다운로드 버튼 */}
          <div
            className="flex-shrink-0 ml-auto self-start pr-10"
            style={{ marginRight: '64px', marginBottom: '30px' }}
          >
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: 'white',
                color: '#00A3E0', // 텍스트 색상
                borderRadius: '6px',  // 모서리 둥글게
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // 그림자
                transition: 'all 0.2s ease-in-out', // 부드러운 전환
                padding: '8px',       // 안쪽 여백
                fontSize: '20px',   // 글자 크기
                fontWeight: 600,  // 글자 두께
                cursor: 'pointer',  // 마우스를 올리면 손가락 모양
                transform: 'scale(1)',  // 기본 크기
              }}
              onMouseDown={(e) => {       // 마우스를 클릭한 순간 (누르고 있는 상태)
                e.currentTarget.style.backgroundColor = '#FF69B4'; // pink-500
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {     //마우스를 뗄 때 (클릭 끝)
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#00A3E0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {            //마우스가 버튼에서 벗어났을 때 (hover 끝)
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#00A3E0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseEnter={(e) => {   //마우스를 버튼에 올렸을 때 (hover 상태)                
                e.currentTarget.style.backgroundColor = '#f5f5f5'; // hover:bg-gray-100
              }}
            >
              <span>회사소개서 다운로드</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
