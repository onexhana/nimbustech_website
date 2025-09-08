import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function HeaderMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: 'home', label: 'Home' },
    { to: 'about-gray-start', label: 'About' },
    { to: 'portfolio', label: 'Portfolio' },
    { to: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70;
      let elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const goHome = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white z-50 shadow-md"
      style={{ paddingBottom: '16px' }}
    >
      <div className="mx-auto px-4 h-14 flex justify-between items-center">
        {/* 로고 */}
        <a
          href="#home"
          onClick={goHome}
          aria-label="홈으로 이동"
          className="flex items-center cursor-pointer focus:outline-none"
          style={{ marginLeft: '16px', marginTop: '18px' }}
        >
          <img
            src="/logo/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            className="mobile-logo"
            style={{ height: '15px' }}
          />
        </a>

        {/* 햄버거 버튼 */}
        <button
          className="bg-transparent border-none shadow-none outline-none focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ marginTop: '16px', marginRight: '8px' }}
          aria-label="메뉴 열기"
        >
          <FaBars size={20} color="#00A3E0" />
        </button>
      </div>

      {/* 풀스크린 모바일 메뉴 - 화면 전체를 가리는 불투명한 창 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col" style={{ backgroundColor: '#ffffff', opacity: 1, width: '390px', height: '844px', zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* 상단 헤더 영역 - 로고와 닫기 버튼 */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <img
              src="/logo/logo-blue-wide.png"
              alt="NIMBUS TECH 로고"
              style={{ height: '15px' }}
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
              className="p-2 transition-colors"
              style={{ border: 'none', background: 'none', outline: 'none' }}
            >
              <FaTimes size={22} color="#00A3E0" />
            </button>
          </div>

          {/* 네비게이션 메뉴 - 왼쪽 상단 정렬 */}
          <nav className="flex-1 px-6 py-8">
            <ul className="flex flex-col items-start space-y-6">
              {navItems.map(({ to, label }) => (
                <li
                  key={to}
                  onClick={() => scrollToSection(to)}
                  className="cursor-pointer group"
                >
                  <span className="text-3xl font-semibold text-gray-800 group-hover:text-[#00A3E0] transition-colors duration-300 tracking-wide">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* 하단 여백 */}
          <div className="h-20"></div>
        </div>
      )}
    </header>
  );
}
