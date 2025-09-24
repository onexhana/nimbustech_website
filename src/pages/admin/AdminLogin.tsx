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
  const [showTestInfo, setShowTestInfo] = useState(false);
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      {/* 로그인 카드 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '380px',
        transition: 'all 0.3s ease'
      }}>
        {/* 로고 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', margin: 0, lineHeight: '1.2', marginBottom: '0.5rem' }}>
            NIMBUS TECH<br />
            <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>ADMIN</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>관리자 로그인</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
              관리자
            </label>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg width="20" height="20" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                disabled={isLoading}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  background: isLoading ? '#f9fafb' : 'white',
                  color: isLoading ? '#6b7280' : '#111827',
                  boxSizing: 'border-box'
                }}
                placeholder="admin"
                required
                onFocus={(e) => {
                  if (!isLoading) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = 'none';
                    (e.target as HTMLInputElement).style.background = 'white';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  (e.target as HTMLInputElement).style.background = 'white';
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
              비밀번호
            </label>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg width="20" height="20" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                disabled={isLoading}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  background: isLoading ? '#f9fafb' : 'white',
                  color: isLoading ? '#6b7280' : '#111827',
                  boxSizing: 'border-box'
                }}
                placeholder="admin123"
                required
                onFocus={(e) => {
                  if (!isLoading) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = 'none';
                    (e.target as HTMLInputElement).style.background = 'white';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  (e.target as HTMLInputElement).style.background = 'white';
                }}
              />
            </div>
          </div>
          
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              animation: 'shake 0.5s ease-in-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</span>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'white',
              background: isLoading ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : 'linear-gradient(135deg, #2563eb, #6366f1)',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
                </svg>
                <span>로그인 중...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>로그인</span>
              </>
            )}
          </button>
        </form>
        
        {/* 추가 링크 및 정보 */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a 
            href="#" 
            style={{ 
              color: '#6b7280', 
              fontSize: '0.875rem', 
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            onClick={(e) => {
              e.preventDefault();
              const answer = window.prompt('보안질문 : 님버스테크 존재 목적은 무엇인가요? (힌트: 0000 리딩)');
              if (answer && answer.trim() === '고객성공 리딩') {
                setShowTestInfo(true);
              } else if (answer !== null) {
                window.alert('정답이 아닙니다. 다시 시도해 주세요.');
              }
            }}
          >
            비밀번호를 잊으셨나요?
          </a>
        </div>
        
        {/* 테스트 계정 정보 (질문에 답하면 표시) */}
        {showTestInfo && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            border: '1px solid rgba(229, 231, 235, 0.5)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, fontWeight: '600' }}>테스트 계정</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: '#374151', 
                  fontFamily: 'monospace',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(229, 231, 235, 0.5)'
                }}>admin</span>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>/</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: '#374151', 
                  fontFamily: 'monospace',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(229, 231, 235, 0.5)'
                }}>admin123</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
