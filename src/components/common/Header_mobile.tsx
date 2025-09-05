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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 50,
        paddingBottom: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ marginTop: '16px', marginRight: '8px' }}
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? (
            <FaTimes size={20} color="#00A3E0" />
          ) : (
            <FaBars size={20} color="#00A3E0" />
          )}
        </button>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out 
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* 상단 닫기 버튼 */}
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            <FaTimes size={24} color="#00A3E0" />
          </button>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav>
          <ul className="flex flex-col px-6 py-6 space-y-6">
            {navItems.map(({ to, label }) => (
              <li
                key={to}
                onClick={() => scrollToSection(to)}
                className="text-lg font-bold text-gray-800 hover:text-[#00A3E0] cursor-pointer"
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
