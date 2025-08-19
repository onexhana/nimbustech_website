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
        <nav className="flex items-center text-[#00A3E0] font-bold text-[20px] md:text-[16px]" style={{ marginTop: '12px' }}>
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
      </div>
    </header>
  );
}
