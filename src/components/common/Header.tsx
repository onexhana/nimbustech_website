import { useState } from 'react';
import { FaBars } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'portfolio', label: 'Portfolio' },
    { to: 'contact', label: 'Contact' },
  ];
  
  const linkClass =
    'cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5 inline-flex items-center leading-none transition-colors duration-200';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // 모바일 메뉴 닫기
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
        {/* 로고 영역 */}
        <div className="flex items-center space-x-2" style={{ marginLeft: '34px', marginTop: '22px' }}> 

           {/* 데스크톱 로고 */}
          <img
            src="/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            className="desktop-logo"
          />
          {/* 모바일 로고 */}
          <img
            src="/logo-blue-wide.png"
            alt="NIMBUS TECH 심볼 로고"
            className="mobile-logo"
          />
        </div>

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
                font: 'inherit'
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 - md 미만에서만 표시 */}
        <button 
          className="mobile-hamburger-btn 
            bg-transparent border-none shadow-none outline-none focus:outline-none" 
            // bg-transparent=배경 제거, border-none=테두리 제거, shadow-none=그림자 제거, 
            // outline-none/focus:outline-none=포커스 테두리 제거
            
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ marginTop: '20px', marginRight: '20px' }}
        >
          <FaBars size={20} color="#00A3E0" />
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-8 py-4">
            {navItems.map(({ to, label }, idx) => (
              <button
                key={to}
                onClick={() => scrollToSection(to)}
                className={`block w-full text-left py-3 font-bold text-[18px] transition-colors duration-200
                  text-[#000000] hover:text-[#00A3E0]
                  ${idx !== navItems.length - 1 ? "border-b border-gray-300" : ""}`}
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
