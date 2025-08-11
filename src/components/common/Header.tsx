import { Link } from 'react-router-dom';

export default function Header() {
  // 간결한 렌더링을 위한 네비 아이템 정의 (UI 결과는 동일)
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' },
  ];
  const linkClass =
    'cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5';

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" style={{backgroundColor: '#ffffff'}}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* 로고 영역 */}
        <div className="flex items-center space-x-2" style={{ marginLeft: '34px', marginTop: '25px' }}> 
          <img
            src="/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            style={{ height: '20px', width: 'auto' }} 
          />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex text-[#00A3E0] font-bold text-[20px] md:text-[16px]">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={linkClass}
              style={{ textDecoration: 'none', marginRight:
                
                '20px', marginTop: '10px' }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
