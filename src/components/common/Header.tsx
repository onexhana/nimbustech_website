export default function Header() {
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
          <img
            src="/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            style={{ height: '18px', width: 'auto', display: 'block' }} 
          />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex items-center text-[#00A3E0] font-bold text-[16px] lg:text-[20px]" style={{ marginTop: '12px' }}>
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

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden flex items-center justify-center w-8 h-8 text-[#00A3E0]"
          onClick={() => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
              mobileMenu.classList.toggle('hidden');
            }
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div id="mobile-menu" className="hidden md:hidden bg-white border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => {
                scrollToSection(to);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.add('hidden');
                }
              }}
              className="block w-full text-left px-3 py-2 text-[#00A3E0] hover:text-[#000000] font-bold text-[18px]"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
