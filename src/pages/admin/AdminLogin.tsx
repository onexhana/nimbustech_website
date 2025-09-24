// src/pages/admin/AdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // 로딩 애니메이션을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 임시 로그인 로직 (나중에 API 연동)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-token');
      navigate('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      {/* 로그인 카드 */}
      <div className="bg-blue-600 p-6 rounded-lg shadow-2xl w-full max-w-[380px]">
        {/* 로고 영역 */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold mb-4 tracking-wide">
            NIMBUS TECH<br />
            ADMIN
          </h1>
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white rounded-lg mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full pl-8 pr-3 py-2 bg-transparent border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:border-white/60 transition-all duration-200 text-sm"
                placeholder="USERNAME"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full pl-8 pr-3 py-2 bg-transparent border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:border-white/60 transition-all duration-200 text-sm"
                placeholder="PASSWORD"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded p-3 animate-shake">
              <div className="flex items-center">
                <svg className="h-4 w-4 text-red-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                LOGIN
              </div>
            ) : (
              'LOGIN'
            )}
          </button>
        </form>
        
        {/* Forgot password 링크 */}
        <div className="text-center mt-6">
          <a href="#" className="text-white/80 text-sm hover:text-white transition-colors">
            Forgot password?
          </a>
        </div>
        
        {/* 테스트 계정 정보 */}
        <div className="mt-6 p-3 bg-white/10 rounded border border-white/20">
          <div className="text-center">
            <p className="text-xs text-white/60 mb-1">테스트 계정</p>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <span className="text-white/80 font-mono">admin</span>
              <span className="text-white/60">/</span>
              <span className="text-white/80 font-mono">admin123</span>
            </div>
          </div>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
