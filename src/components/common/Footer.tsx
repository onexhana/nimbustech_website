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
    <footer className="bg-[#00A3E0] text-white py-20 px-6 md:px-20 relative min-h-[300px]">
      {/* 좌측 회사 정보 */}
      <div className="absolute bottom-8 left-6 md:left-20 space-y-2 text-sm leading-relaxed text-white">
        <p className="text-white">[세종 본사] 집현중앙7로6, B동 1110호 (세종대명벨리온)</p>
        <p className="text-white">[서울사무소] 강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)</p>
        <div className="pt-2">
          <p className="text-white">T: 02-555-0099</p>
          <p className="text-white">E: nimbustech@nimbustech.co.kreae</p>
        </div>
      </div>

      {/* 우측 회사소개서 다운로드 버튼 */}
      <div className="absolute bottom-8 right-6 md:right-20">
        <button
          onClick={handleDownload}
          className="bg-white text-[#00A3E0] font-medium text-sm py-3 px-6 rounded-md shadow-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 whitespace-nowrap"
        >
          <span>회사소개서 다운로드</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </footer>
  );
}