export default function Footer() {
  return (
    <footer className="bg-[#00A3E0] text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 w-full">
        {/* 좌측: 로고 + 정보 */}
        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          {/* 로고 + 슬로건 */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="NIMBUS TECH" className="h-6 md:h-8" />
            <img src="/fcs.png" alt="FCS 로고" className="h-6 md:h-8" />
            <span className="text-xs md:text-sm whitespace-nowrap">2025 미래창조경영우수기업</span>
          </div>

          {/* 주소 */}
          <div>
            <p>[세종 본사] 집현중앙7로6, B동 1110호 (세종대명벨리온)</p>
            <p>[서울사무소] 강남구 선릉로90길 10, B동 407호 (대치동, 상제리제센터)</p>
          </div>

          {/* 연락처 */}
          <div>
            <p>T : 02-555-0099</p>
            <p>E : nimbustech@nimbustech.co.kreae</p>
          </div>
        </div>

        {/* 우측: 다운로드 버튼 */}
        <div className="md:self-end">
          <a
            href="/회사소개서.pdf"
            download
            className="bg-white text-[#00A3E0] font-semibold py-2 px-4 rounded hover:bg-gray-100 transition inline-block"
          >
            회사소개서 다운로드 <span className="ml-1">↓</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
