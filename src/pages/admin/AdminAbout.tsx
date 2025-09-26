// src/pages/admin/AdminAbout.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAboutData, saveAboutData } from '../../api/contact';
import type { AboutData } from '../../types/contact';

export default function AdminAbout() {
  // 링크 URL 필드 위치 조정을 위한 state
  const [urlFieldPosition, setUrlFieldPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error('About 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAboutData();
  }, []);

  const handleSave = async () => {
    if (!aboutData) return;
    
    try {
      await saveAboutData(aboutData);
      setIsEditing(false);
      alert('저장되었습니다!');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 드래그 이벤트 핸들러들
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - urlFieldPosition.x,
      y: e.clientY - urlFieldPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setUrlFieldPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 기존 handleSave 함수는 위에서 이미 정의됨

  const addCard = (tabIndex: number) => {
    if (!aboutData) return;
    const newCards = [...aboutData.tabs[tabIndex].cards];
    newCards.push({
      title: "새 카드",
      description: ["설명을 입력하세요"],
      ...(aboutData.tabs[tabIndex].name === "솔루션" && { link: "" })
    });
    
    const newTabs = [...aboutData.tabs];
    newTabs[tabIndex].cards = newCards;
    setAboutData({...aboutData, tabs: newTabs});
  };

  const removeCard = (tabIndex: number, cardIndex: number) => {
    if (!aboutData) return;
    const newCards = aboutData.tabs[tabIndex].cards.filter((_, index) => index !== cardIndex);
    const newTabs = [...aboutData.tabs];
    newTabs[tabIndex].cards = newCards;
    setAboutData({...aboutData, tabs: newTabs});
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    About 페이지 관리
                  </h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>콘텐츠를 편집하고 관리하세요</p>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 상단 섹션들 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
            {/* 메인 타이틀 편집 */}
            <div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  메인 타이틀 (모바일용)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                    메인 제목
                  </label>
                  <input
                    type="text"
                    value={aboutData.mainTitle}
                    onChange={(e) => aboutData && setAboutData({...aboutData, mainTitle: e.target.value})}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      padding: '0.3rem 0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      outline: 'none',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease',
                      background: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#111827'
                    }}
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
                    부제목
                  </label>
                  <input
                    type="text"
                    value={aboutData.subtitle}
                    onChange={(e) => aboutData && setAboutData({...aboutData, subtitle: e.target.value})}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      padding: '0.3rem 0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      outline: 'none',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease',
                      background: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#111827'
                    }}
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
              </div>
            </div>
          </div>

          {/* 글꼴 사이즈 관리 */}
          <div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  글꼴 사이즈 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 메인 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="range"
                      min="12"
                      max="48"
                      value={aboutData.fontSize?.mainTitle || 30}
                      onChange={(e) => aboutData && setAboutData({
                        ...aboutData, 
                        fontSize: { ...aboutData.fontSize, mainTitle: parseInt(e.target.value) }
                      })}
                      disabled={!isEditing}
                      style={{
                        flex: 1,
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {aboutData.fontSize?.mainTitle || 30}px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 부제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="range"
                      min="10"
                      max="32"
                      value={aboutData.fontSize?.subtitle || 18}
                      onChange={(e) => aboutData && setAboutData({
                        ...aboutData, 
                        fontSize: { ...aboutData.fontSize, subtitle: parseInt(e.target.value) }
                      })}
                      disabled={!isEditing}
                      style={{
                        flex: 1,
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {aboutData.fontSize?.subtitle || 18}px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    카드 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="range"
                      min="10"
                      max="28"
                      value={aboutData.fontSize?.cardTitle || 16}
                      onChange={(e) => aboutData && setAboutData({
                        ...aboutData, 
                        fontSize: { ...aboutData.fontSize, cardTitle: parseInt(e.target.value) }
                      })}
                      disabled={!isEditing}
                      style={{
                        flex: 1,
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {aboutData.fontSize?.cardTitle || 16}px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    카드 설명 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="range"
                      min="8"
                      max="20"
                      value={aboutData.fontSize?.cardDescription || 14}
                      onChange={(e) => aboutData && setAboutData({
                        ...aboutData, 
                        fontSize: { ...aboutData.fontSize, cardDescription: parseInt(e.target.value) }
                      })}
                      disabled={!isEditing}
                      style={{
                        flex: 1,
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {aboutData.fontSize?.cardDescription || 14}px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    탭 이름 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={aboutData.fontSize?.tabName || 16}
                      onChange={(e) => aboutData && setAboutData({
                        ...aboutData, 
                        fontSize: { ...aboutData.fontSize, tabName: parseInt(e.target.value) }
                      })}
                      disabled={!isEditing}
                      style={{
                        flex: 1,
                        height: '6px',
                        background: '#e5e7eb',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {aboutData.fontSize?.tabName || 16}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* 탭별 카드 관리 */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    탭별 카드 관리
                  </h3>
                </div>
                {isEditing && (
                  <button
                    onClick={() => addCard(activeTab)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: 'white',
                      background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>카드 추가</span>
                  </button>
                )}
              </div>

              {/* 탭 선택 */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {aboutData.tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s ease',
                      ...(activeTab === index ? {
                        background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                        color: 'white',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1.05)'
                      } : {
                        background: 'rgba(255, 255, 255, 0.5)',
                        color: '#374151',
                        border: '1px solid #e5e7eb'
                      })
                    }}
                  >
                    <span>{tab.name}</span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      ...(activeTab === index ? {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      } : {
                        background: '#f3f4f6',
                        color: '#6b7280'
                      })
                    }}>
                      {tab.cards.length}
                    </span>
                  </button>
                ))}
              </div>

              {/* 카드 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {aboutData.tabs[activeTab].cards.map((card, cardIndex) => (
                  <div key={cardIndex} style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    borderRadius: '12px',
                    padding: '1rem',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #f97316, #ef4444)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{cardIndex + 1}</span>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                          카드 {cardIndex + 1}
                        </h4>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeCard(activeTab, cardIndex)}
                          style={{
                            padding: '0.5rem',
                            color: '#ef4444',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          제목
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            if (!aboutData) return;
                            const newTabs = [...aboutData.tabs];
                            newTabs[activeTab].cards[cardIndex].title = e.target.value;
                            setAboutData({...aboutData, tabs: newTabs});
                          }}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            maxWidth: '650px',
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
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
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          설명 (줄바꿈으로 구분)
                        </label>
                        <textarea
                          value={card.description.join('\n')}
                          onChange={(e) => {
                            if (!aboutData) return;
                            const newTabs = [...aboutData.tabs];
                            newTabs[activeTab].cards[cardIndex].description = e.target.value.split('\n');
                            setAboutData({...aboutData, tabs: newTabs});
                          }}
                          disabled={!isEditing}
                          rows={2}
                          style={{
                            width: '100%',
                            maxWidth: '660px',
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827',
                            resize: 'none',
                            minHeight: '40px'
                          }}
                        />
                      </div>
                      
                      {aboutData.tabs[activeTab].name === "솔루션" && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: 0 }}>
                              링크 URL
                            </label>
                            <button
                              onClick={() => setUrlFieldPosition({ x: 0, y: 0 })}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                background: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: '#6b7280'
                              }}
                            >
                              위치 초기화
                            </button>
                          </div>
                          <div 
                            style={{ 
                              position: 'relative',
                              transform: `translate(${urlFieldPosition.x}px, ${urlFieldPosition.y}px)`,
                              cursor: isDragging ? 'grabbing' : 'grab'
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                          >
                            {/* 드래그 핸들 */}
                            <div style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              width: '16px',
                              height: '16px',
                              background: '#3b82f6',
                              borderRadius: '50%',
                              cursor: 'grab',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 10,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                              <svg width="8" height="8" fill="white" viewBox="0 0 24 24">
                                <path d="M3 15h18v-2H3v2zm0-4h18V9H3v2zm0-4v2h18V7H3z"/>
                              </svg>
                            </div>
                            <div style={{ position: 'absolute', top: '50%', left: '0.6rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                              <svg width="20" height="20" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </div>
                            <input
                              type="url"
                              value={'link' in card ? card.link || '' : ''}
                              onChange={(e) => {
                                if (!aboutData) return;
                                const newTabs = [...aboutData.tabs];
                                if ('link' in newTabs[activeTab].cards[cardIndex]) {
                                  (newTabs[activeTab].cards[cardIndex] as { link: string }).link = e.target.value;
                                }
                                setAboutData({...aboutData, tabs: newTabs});
                              }}
                              disabled={!isEditing}
                              style={{
                                width: '100%',
                                maxHeight: '60px',
                                maxWidth: '645px',
                                paddingLeft: '1.5rem',
                                paddingRight: '0.5rem',
                                paddingTop: '0.3rem',
                                paddingBottom: '0.3rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '0.75rem',
                                transition: 'all 0.2s ease',
                                background: !isEditing ? '#f9fafb' : 'white',
                                color: !isEditing ? '#6b7280' : '#111827'
                              }}
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
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '1.5rem',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
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
          
          <div style={{
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(229, 231, 235, 0.5)'
          }}>
            {/* 모바일용 메인 타이틀 미리보기 */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
              <h2 style={{ 
                fontSize: `${aboutData.fontSize?.mainTitle || 30}px`, 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '0.75rem', 
                margin: 0 
              }}>
                {aboutData.mainTitle}
              </h2>
              <p style={{ 
                fontSize: `${aboutData.fontSize?.subtitle || 18}px`, 
                color: '#6b7280', 
                margin: 0 
              }}>
                {aboutData.subtitle}
              </p>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                (모바일에서만 표시)
              </div>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(229, 231, 235, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ 
                  fontSize: `${aboutData.fontSize?.tabName || 16}px`, 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  {aboutData.tabs[activeTab].name} 섹션
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {aboutData.tabs[activeTab].cards.length}개 카드
                  </span>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: '0.75rem' 
              }}>
                {aboutData.tabs[activeTab].cards.slice(0, 3).map((card, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <h5 style={{ 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '0.5rem', 
                      fontSize: `${aboutData.fontSize?.cardTitle || 16}px`, 
                      margin: 0 
                    }}>
                      {card.title}
                    </h5>
                    <p style={{ 
                      fontSize: `${aboutData.fontSize?.cardDescription || 14}px`, 
                      color: '#6b7280', 
                      lineHeight: '1.5', 
                      margin: 0 
                    }}>
                      {card.description.slice(0, 2).join(' ')}
                    </p>
                  </div>
                ))}
                {aboutData.tabs[activeTab].cards.length > 3 && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      +{aboutData.tabs[activeTab].cards.length - 3}개 더
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}