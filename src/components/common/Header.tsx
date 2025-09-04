import React, { useState, useEffect } from 'react';
import HeaderMobile from './Header_mobile';

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만을 모바일로 간주
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 모바일이면 모바일 전용 헤더 렌더링
  if (isMobile) {
    return <HeaderMobile />;
  }

  // 웹 버전 헤더 렌더링
  return <HeaderWeb />;
}

// 웹 전용 헤더 컴포넌트
function HeaderWeb() {
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
      // 웹 헤더 높이만큼 오프셋 조정
      const headerHeight = 80;
      let elementPosition = element.offsetTop - headerHeight;
      
      // Portfolio 섹션의 경우 초록색 박스 중간으로 스크롤
      if (sectionId === 'portfolio') {
        elementPosition = element.offsetTop - headerHeight - -100;
      }
      
      // Contact 섹션의 경우 적절한 위치로 스크롤
      if (sectionId === 'contact') {
        elementPosition = element.offsetTop - headerHeight - -100;
      }
      
      // About 섹션의 경우 적절한 위치로 스크롤
      if (sectionId === 'about-gray-start') {
        elementPosition = element.offsetTop - headerHeight - 60;
      }
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const goHome = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        {/* 웹 로고 영역 */}
        <a
          href="#home"
          onClick={goHome}
          aria-label="홈으로 이동"
          className="flex items-center space-x-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
          style={{ marginLeft: '34px', marginTop: '22px' }}
        >
          <img
            src="/logo/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            className="desktop-logo"
          />
        </a>

        {/* 웹 네비게이션 메뉴 */}
        <nav
          className="flex items-center text-[#00A3E0] font-bold text-[20px]"
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
      </div>
    </header>
  );
}
