import { Link } from 'react-scroll';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* 로고 영역 */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="NIMBUS TECH 로고"
            style={{ height: '24px', width: 'auto' }} // ✅ 완전 작게
          />
          <span className="text-[#0168b7] font-extrabold text-lg tracking-tight">
            NIMBUS TECH
          </span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="space-x-6 text-[#0168b7] font-semibold text-sm md:text-base">
          <Link to="home" smooth duration={500} className="cursor-pointer hover:underline">
            Home
          </Link>
          <Link to="about" smooth duration={500} className="cursor-pointer hover:underline">
            About
          </Link>
          <Link to="portfolio" smooth duration={500} className="cursor-pointer hover:underline">
            Portfolio
          </Link>
          <Link to="contact" smooth duration={500} className="cursor-pointer hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
