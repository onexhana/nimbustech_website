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
            {/* 로고 행: space-x 적용 이슈로 gap-x 사용 중 */}
            {/* 이전 코드 참고: <div className="flex items-center space-x-8 md:space-x-14"> */}
            <div className="flex items-center gap-x-8 md:gap-x-14" style={{ marginLeft: '48px', marginTop: '30px' }}>
              {/* NIMBUS TECH 로고 */}
              <div className="flex items-center space-x-2">
                <img src="/logo-white-wide.png" alt="NIMBUS TECH" style={{ width: '200px', height: 'auto' }} />
              </div>
              
              {/* FCS 배지 */}
              {/* 임시 간격 강제: marginLeft로 보정 (해결 후 제거 예정) */}
              <div className="bg-white rounded-full px-3 py-1 flex items-center space-x-2" style={{ marginLeft: '30px' }}>
                <img src="/fcs_logo.png" alt="FCS 배지" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>2025 미래창조경영우수기업</span>

              </div>
            </div>

            {/* 회사 정보 */}
            <div className="text-left pl-10" style={{ marginLeft: '48px' }}>
              <div className="space-y-1" style={{ lineHeight: '1.4' }}>
                <p style={{ fontSize: '18px', color: 'white' }}>[세종 본사] 집현중앙7로6, B동 1110호 (세종대명벨리온)</p>
                <p style={{ fontSize: '18px', color: 'white' }}>[서울사무소] 강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)</p>
                <div style={{ paddingTop: '1px' }}>
                  <p style={{ fontSize: '18px', color: 'white' }}>T: 02-555-0099</p>
                  <p style={{ fontSize: '18px', color: 'white' }}>E: nimbustech@nimbustech.co.kr</p>
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
                borderRadius: '0px',  // 모서리 둥글게
                border: 'none',
                outline: 'none',
                boxShadow: 'none', // 그림자 제거로 테두리처럼 보이는 검정 부분 제거
                transition: 'all 0.2s ease-in-out', // 부드러운 전환
                padding: '10px 28px',       // 안쪽 여백: 상하 10px, 좌우 28px로 확장
                fontSize: '20px',   // 글자 크기
                fontWeight: 600,  // 글자 두께
                cursor: 'pointer',  // /* pointer: 클릭 가능한 손가락 모양 | default: 기본 화살표 | text: 텍스트 선택 I-모양 | wait: 로딩 중 (모래시계/스피너) | move: 이동 가능 (십자 화살표) | not-allowed: 금지 표시 | help: 도움말 아이콘 | crosshair: 십자선 모양 */
                transform: 'scale(1)',  // 기본 크기
              }}
              onMouseDown={(e) => {       // 마우스를 클릭한 순간 (누르고 있는 상태)
                e.currentTarget.style.backgroundColor = ' rgba(0, 163, 224, 1)'; // #00A3E0 rbga 
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
