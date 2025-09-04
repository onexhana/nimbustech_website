import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function HeaderMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: 'home', label: 'Our Vision' },
    { to: 'about-gray-start', label: 'Story' },
    { to: 'portfolio', label: 'Program' },
    { to: 'contact', label: 'Newsroom' },
  ];

  // 메뉴가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

      {/* 모바일 슬라이드 메뉴 */}
      {isMobileMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 z-[9999] bg-black bg-opacity-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* 메뉴 패널 */}
          <div 
            className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-[10000] animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 메뉴 헤더 - X 버튼 */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-transparent"
                aria-label="메뉴 닫기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            {/* 메뉴 내비게이션 */}
            <div className="pt-16 px-6">
              {navItems.map(({ to, label }, index) => (
                <div key={to} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => scrollToSection(to)}
                    className="w-full py-5 text-left flex items-center justify-between group
                         hover:bg-gray-50 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: isMobileMenuOpen ? 'slideInRight 0.4s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="text-xl font-normal text-gray-800 group-hover:text-[#00A3E0]">
                      {label}
                    </span>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 20 20" 
                      className="text-gray-400 group-hover:text-[#00A3E0] transition-colors"
                    >
                      <path 
                        d="M7 4l6 6-6 6" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* 하단 정보 */}
            <div className="absolute bottom-8 left-6 right-6">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-500">
                    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="8" cy="8" r="3" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">Local</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-500">
                    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M2 8h12M8 2a6 6 0 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                  <span className="text-sm">English</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideFromLeft 0.3s ease-out;
        }
        
        @keyframes slideFromLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
