import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function HeaderMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "home", label: "Home" },
    { to: "about-gray-start", label: "About" },
    { to: "portfolio", label: "Portfolio" },
    { to: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70;
      let elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const goHome = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white z-50"
      style={{ 
        backgroundColor: '#ffffff', paddingBottom: "12px",
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.19), 0 2px 4px -2px rgba(0,0,0,0.1)'
      }}
    >
      <div className="mx-auto px-4 flex justify-between items-center" 
      style={{ backgroundColor: '#ffffff', height: '40px' }}>
        {/* 로고 */}
        <a
          href="#home"
          onClick={goHome}
          aria-label="홈으로 이동"
          className="flex items-center cursor-pointer focus:outline-none"
          style={{ marginLeft: "16px", marginTop: "15px" }}
        >
          <img
            src="/logo/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            className="mobile-logo"
            style={{ height: "13px" }}
          />
        </a>

        {/* 햄버거 버튼 */}
        <button
          className="bg-transparent border-none shadow-none outline-none focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ marginTop: "16px", marginRight: "8px" }}
          aria-label="메뉴 열기"
        >
          <FaBars size={20} color="#00A3E0" />
        </button>
      </div>

      {/* 풀스크린 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div
          className="fixed bg-white flex flex-col"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#ffffff",
            opacity: 1,
            zIndex: 9999,
          }}
        >
          {/* 상단 헤더 - 로고 + 닫기 버튼 */}
          <div
            className="flex justify-between items-center"
            style={{ margin: "32px 32px 32px 32px" }}
          >
            <img src="/logo/cloud-blue.png" alt="Cloud 로고" style={{ height: "15px" }} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
              className="p-2 transition-colors"
              style={{ border: "none", background: "none", outline: "none" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#00A3E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 px-12 py-8" style={{ paddingLeft: "32px" }}>
            <ul
              className="flex flex-col items-start"
              style={{ listStyle: "none", padding: 0, margin: 0, gap: "30px" }}
            >
              {navItems.map(({ to, label }) => (
                <li
                  key={to}
                  onClick={() => scrollToSection(to)}
                  className="cursor-pointer"
                >
                  <span
                    className="text-gray-800 font-bold text-[35px] hover:text-[#00A3E0] active:text-[#00A3E0] transition-colors duration-300 force-hover"
                  >
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
