// src/pages/admin/AdminHome.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHomeData } from '../../context/HomeContext';
import MiniPreview from '../../components/admin/MiniPreview';

export default function AdminHome() {
  const { homeData, updateTypingText, updateTypingTextStyle, updateTypingSpeed, updateButtonData, updateButtonStyles, updateSliderText, updateSliderTextColors, updateSliderTextSizes } = useHomeData();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // 데이터는 Context에서 자동으로 localStorage에 저장됨
    console.log('저장된 데이터:', homeData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)'
    }}>
      {/* 헤더 */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '80px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link 
                to="/admin/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>대시보드로 돌아가기</span>
              </Link>
              <div style={{ height: '24px', width: '1px', background: '#d1d5db' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    Home 페이지 관리
                  </h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>메인 홈 콘텐츠를 편집하고 관리하세요</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>취소</span>
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'white',
                      background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>저장</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>편집</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* 타이핑 텍스트 편집 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                메인 타이핑 텍스트
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {homeData.typingTexts.map((text, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>{index + 1}</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    {index + 1}번째 줄
                    </h4>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        텍스트 내용
                  </label>
                  <input
                    type="text"
                    value={text}
                        onChange={(e) => updateTypingText(index, e.target.value)}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                          maxWidth: '280px',
                      padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                      outline: 'none',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      background: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#111827'
                    }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          텍스트 색상
                        </label>
                        <input
                          type="color"
                          value={homeData.typingTextStyles?.colors?.[index] || '#000000'}
                          onChange={(e) => updateTypingTextStyle(index, 'colors', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '50px',
                            height: '30px',
                            padding: '0',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            outline: 'none',
                            cursor: isEditing ? 'pointer' : 'not-allowed',
                            opacity: !isEditing ? 0.6 : 1
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          글씨 두께
                        </label>
                        <select
                          value={homeData.typingTextStyles?.fontWeights?.[index] || 500}
                          onChange={(e) => updateTypingTextStyle(index, 'fontWeights', parseInt(e.target.value))}
                          disabled={!isEditing}
                          style={{
                            width: '100px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827',
                            cursor: isEditing ? 'pointer' : 'not-allowed'
                          }}
                        >
                          <option value={300}>Light (300)</option>
                          <option value={400}>Normal (400)</option>
                          <option value={500}>Medium (500)</option>
                          <option value={600}>SemiBold (600)</option>
                          <option value={700}>Bold (700)</option>
                          <option value={800}>ExtraBold (800)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          데스크톱 크기 (px)
                        </label>
                        <input
                          type="number"
                          min="50"
                          max="200"
                          value={homeData.typingTextStyles?.desktopSizes?.[index] || 100}
                          onChange={(e) => updateTypingTextStyle(index, 'desktopSizes', parseInt(e.target.value) || 100)}
                          disabled={!isEditing}
                          style={{
                            width: '80px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          모바일 크기 (px)
                        </label>
                        <input
                          type="number"
                          min="20"
                          max="80"
                          value={homeData.typingTextStyles?.mobileSizes?.[index] || 35}
                          onChange={(e) => updateTypingTextStyle(index, 'mobileSizes', parseInt(e.target.value) || 35)}
                          disabled={!isEditing}
                          style={{
                            width: '80px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 타이핑 속도 조절 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                타이핑 속도 설정
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 타이핑 속도 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  타이핑 속도 (ms)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={homeData.typingSpeed?.speed || 130}
                    onChange={(e) => updateTypingSpeed({ speed: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    style={{
                      width: '200px',
                      cursor: isEditing ? 'pointer' : 'not-allowed',
                      opacity: !isEditing ? 0.6 : 1
                    }}
                  />
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={homeData.typingSpeed?.speed || 130}
                    onChange={(e) => updateTypingSpeed({ speed: parseInt(e.target.value) || 130 })}
                    disabled={!isEditing}
                    style={{
                      width: '80px',
                      padding: '0.25rem 0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      outline: 'none',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      background: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#111827'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>ms</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  값이 작을수록 빠르게 타이핑됩니다 (50ms = 매우 빠름, 300ms = 매우 느림)
                </p>
              </div>

              {/* 줄 간 대기 시간 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  줄 간 대기 시간 (ms)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    value={homeData.typingSpeed?.pauseTime || 700}
                    onChange={(e) => updateTypingSpeed({ pauseTime: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    style={{
                      width: '200px',
                      cursor: isEditing ? 'pointer' : 'not-allowed',
                      opacity: !isEditing ? 0.6 : 1
                    }}
                  />
                  <input
                    type="number"
                    min="200"
                    max="2000"
                    value={homeData.typingSpeed?.pauseTime || 700}
                    onChange={(e) => updateTypingSpeed({ pauseTime: parseInt(e.target.value) || 700 })}
                    disabled={!isEditing}
                    style={{
                      width: '80px',
                      padding: '0.25rem 0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      outline: 'none',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      background: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#111827'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>ms</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  한 줄이 완성된 후 다음 줄로 넘어가기까지의 대기 시간
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 섹션 편집 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                홈 버튼 섹션
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {homeData.buttonData.map((button, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'linear-gradient(135deg, #f97316, #ef4444)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>{index + 1}</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                      버튼 {index + 1}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        제목 (영문)
                      </label>
                      <input
                        type="text"
                        value={button.title}
                        onChange={(e) => {
                          updateButtonData(index, { title: e.target.value });
                        }}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        부제목 (한글)
                      </label>
                      <input
                        type="text"
                        value={button.subtitle}
                        onChange={(e) => {
                          updateButtonData(index, { subtitle: e.target.value });
                        }}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        설명
                      </label>
                      <textarea
                        value={button.description}
                        onChange={(e) => {
                          updateButtonData(index, { description: e.target.value });
                        }}
                        disabled={!isEditing}
                        rows={2}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827',
                          resize: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 버튼 스타일 설정 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                borderRadius: '12px',
                padding: '1rem',
                marginTop: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    버튼 스타일 설정
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* 제목 크기 설정 */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      제목 크기 (px)
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>데스크톱:</span>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          value={homeData.buttonStyles?.titleSizes?.desktop || 30}
                          onChange={(e) => updateButtonStyles({ 
                            titleSizes: { 
                              ...homeData.buttonStyles?.titleSizes, 
                              desktop: parseInt(e.target.value) || 30 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>모바일:</span>
                        <input
                          type="number"
                          min="10"
                          max="50"
                          value={homeData.buttonStyles?.titleSizes?.mobile || 20}
                          onChange={(e) => updateButtonStyles({ 
                            titleSizes: { 
                              ...homeData.buttonStyles?.titleSizes, 
                              mobile: parseInt(e.target.value) || 20 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 부제목 크기 설정 */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      부제목 크기 (px)
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>데스크톱:</span>
                        <input
                          type="number"
                          min="15"
                          max="80"
                          value={homeData.buttonStyles?.subtitleSizes?.desktop || 40}
                          onChange={(e) => updateButtonStyles({ 
                            subtitleSizes: { 
                              ...homeData.buttonStyles?.subtitleSizes, 
                              desktop: parseInt(e.target.value) || 40 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>모바일:</span>
                        <input
                          type="number"
                          min="15"
                          max="40"
                          value={homeData.buttonStyles?.subtitleSizes?.mobile || 28}
                          onChange={(e) => updateButtonStyles({ 
                            subtitleSizes: { 
                              ...homeData.buttonStyles?.subtitleSizes, 
                              mobile: parseInt(e.target.value) || 28 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 설명 크기 설정 */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      설명 크기 (px)
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>데스크톱:</span>
                        <input
                          type="number"
                          min="10"
                          max="40"
                          value={homeData.buttonStyles?.descriptionSizes?.desktop || 20}
                          onChange={(e) => updateButtonStyles({ 
                            descriptionSizes: { 
                              ...homeData.buttonStyles?.descriptionSizes, 
                              desktop: parseInt(e.target.value) || 20 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: '50px' }}>모바일:</span>
                        <input
                          type="number"
                          min="8"
                          max="25"
                          value={homeData.buttonStyles?.descriptionSizes?.mobile || 14}
                          onChange={(e) => updateButtonStyles({ 
                            descriptionSizes: { 
                              ...homeData.buttonStyles?.descriptionSizes, 
                              mobile: parseInt(e.target.value) || 14 
                            } 
                          })}
                          disabled={!isEditing}
                          style={{
                            width: '70px',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 호버 색상 설정 */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      호버 색상
                    </label>
                    <input
                      type="color"
                      value={homeData.buttonStyles?.hoverColor || '#00A3E0'}
                      onChange={(e) => updateButtonStyles({ hoverColor: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        width: '60px',
                        height: '35px',
                        padding: '0',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed',
                        opacity: !isEditing ? 0.6 : 1
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 슬라이더 텍스트 편집 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                무한 슬라이더 텍스트
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                슬라이더 텍스트
              </label>
              <input
                type="text"
                value={homeData.sliderText}
                onChange={(e) => updateSliderText(e.target.value)}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  background: !isEditing ? '#f9fafb' : 'white',
                  color: !isEditing ? '#6b7280' : '#111827'
                }}
                placeholder="LEADING CUSTOMER SUCCESS"
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                  기본 텍스트 색상
                </label>
                <input
                  type="color"
                  value={homeData.sliderTextColors?.defaultColor || '#c2c2c2'}
                  onChange={(e) => updateSliderTextColors({ defaultColor: e.target.value })}
                  disabled={!isEditing}
                  style={{
                    width: '60px',
                    height: '40px',
                    padding: '0',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    outline: 'none',
                    cursor: isEditing ? 'pointer' : 'not-allowed',
                    opacity: !isEditing ? 0.6 : 1
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                  단어별 색상 설정
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.entries(homeData.sliderTextColors?.coloredWords || {}).map(([word, color]) => (
                    <div key={word} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#374151',
                        minWidth: '80px'
                      }}>
                        {word}
                      </span>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateSliderTextColors({ 
                          coloredWords: { 
                            ...homeData.sliderTextColors?.coloredWords, 
                            [word]: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '50px',
                          height: '30px',
                          padding: '0',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          outline: 'none',
                          cursor: isEditing ? 'pointer' : 'not-allowed',
                          opacity: !isEditing ? 0.6 : 1
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                  텍스트 크기 설정
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>
                      데스크톱 크기 (px)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="200"
                      value={homeData.sliderTextSizes?.desktop || 110}
                      onChange={(e) => updateSliderTextSizes({ desktop: parseInt(e.target.value) || 110 })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>
                      모바일 크기 (px)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="100"
                      value={homeData.sliderTextSizes?.mobile || 60}
                      onChange={(e) => updateSliderTextSizes({ mobile: parseInt(e.target.value) || 60 })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 미리보기 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                실시간 미리보기
              </h3>
            </div>
            <MiniPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
