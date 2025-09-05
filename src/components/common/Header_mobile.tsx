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
      // 모바일 헤더 높이만큼 오프셋 조정
      const headerHeight = 70;
      let elementPosition = element.offsetTop - headerHeight;
      
      // 각 섹션별 위치 조정
      if (sectionId === 'portfolio') {
        elementPosition = element.offsetTop - headerHeight - -80;
      }
      
      if (sectionId === 'contact') {
        elementPosition = element.offsetTop - headerHeight - -80;
      }
      
      if (sectionId === 'about-gray-start') {
        elementPosition = element.offsetTop - headerHeight - 40;
      }
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // 모바일 메뉴 닫기
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
        {/* 모바일 로고 영역 */}
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

        {/* 모바일 햄버거 버튼 */}
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

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-4 py-3">
            {navItems.map(({ to, label }) => (
              <button
                key={to}
                onClick={() => scrollToSection(to)}
                className="block w-full text-left py-4 mb-2 text-[16px] font-bold
                     bg-[#ffffff] text-[#00A3E0] border border-[#00A3E0] rounded-lg
                     hover:bg-[#00A3E0] hover:text-[#ffffff]
                     transition-all duration-200 appearance-none
                     active:scale-95"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
