import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: 'home', label: 'Home' },
    { to: 'about-gray-start', label: 'About' },
    { to: 'portfolio', label: 'Portfolio' },
    { to: 'contact', label: 'Contact' },
  ];

  const linkClass =
    'cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5 inline-flex items-center leading-none transition-colors duration-200';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // 헤더 높이만큼 오프셋 조정
      const headerHeight = 80;
      let elementPosition = element.offsetTop - headerHeight;
      
      // Portfolio 섹션의 경우 초록색 박스 중간으로 스크롤
      if (sectionId === 'portfolio') {
        // 초록색 박스 높이의 절반 정도를 추가로 빼서 중간 위치로 조정
        elementPosition = element.offsetTop - headerHeight - -100;
      }
      
      // Contact 섹션의 경우 적절한 위치로 스크롤
      if (sectionId === 'contact') {
        // Contact 섹션도 적절한 위치로 조정
        elementPosition = element.offsetTop - headerHeight - -100;
      }
      
      // About 섹션의 경우 적절한 위치로 스크롤
      if (sectionId === 'about-gray-start') {
        // About 섹션도 적절한 위치로 조정
        elementPosition = element.offsetTop - headerHeight - 60;
      }
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // 모바일 메뉴 닫기
    setIsMobileMenuOpen(false);
  };

  /** 로고 클릭 → 홈(상단)으로 이동 + 모바일 메뉴 닫기 */
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
        paddingBottom: '20px',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.19), 0 2px 4px -2px rgba(0,0,0,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        {/* 로고 영역 → 클릭 시 홈으로 */}
        <a
          href="#home"
          onClick={goHome}
          aria-label="홈으로 이동"
          className="flex items-center space-x-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
          style={{ marginLeft: '34px', marginTop: '22px' }}
        >
          {/* 데스크톱 로고 */}
          <img
            src="/logo/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            className="desktop-logo"
          />
          {/* 모바일 로고 */}
          <img
            src="/logo/logo-blue-wide.png"
            alt="NIMBUS TECH 심볼 로고"
            className="mobile-logo"
          />
        </a>

        {/* 데스크톱 네비게이션 메뉴 - md 이상에서만 표시 */}
        <nav
          className="desktop-menu-nav flex items-center text-[#00A3E0] font-bold text-[20px]"
          style={{ marginTop: '12px' }}
        >
          {navItems.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => scrollToSection(to)}
              className={linkClass}
              style={{
                textDecoration: 'none',
                marginRight: '20px',
                marginTop: '10px',
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 - md 미만에서만 표시 (보여짐/숨김은 CSS에서 제어 가정) */}
        <button
          className="mobile-hamburger-btn bg-transparent border-none shadow-none outline-none focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ marginTop: '20px', marginRight: '20px' }}
          aria-label="모바일 메뉴 열기"
        >
          <FaBars size={20} color="#00A3E0" />
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-8 py-4">
            {navItems.map(({ to, label }) => (
              <button
                key={to}
                onClick={() => scrollToSection(to)}
                className="block w-full text-left py-6 text-[18px] font-bold
                     bg-[#ffffff] text-[#00A3E0] border border-[#00A3E0] rounded
                     hover:bg-[#00A3E0] hover:text-[#ffffff]
                     transition-colors duration-200 appearance-none"
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