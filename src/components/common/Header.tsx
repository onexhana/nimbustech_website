import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" style={{backgroundColor: '#ffffff'}}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* 로고 영역 */}
        <div className="flex items-center space-x-2" style={{ marginLeft: '34px', marginTop: '20px' }}> 
          <img
            src="/logo-blue-wide.png"
            alt="NIMBUS TECH 로고"
            style={{ height: '20px', width: 'auto' }} 
          />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex text-[#00A3E0] font-bold text-lg md:text-base">
          <Link to="/" className="cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5" style={{ textDecoration: 'none', marginRight: '20px' }}>
            Home
          </Link>
          <Link to="/about" className="cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5" style={{ textDecoration: 'none', marginRight: '20px' }}>
            About
          </Link>
          <Link to="/portfolio" className="cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5" style={{ textDecoration: 'none', marginRight: '20px' }}>
            Portfolio
          </Link>
          <Link to="/contact" className="cursor-pointer no-underline text-[#00A3E0] hover:text-[#000000] active:text-black focus:text-black mr-5" style={{ textDecoration: 'none', marginRight: '20px' }}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
