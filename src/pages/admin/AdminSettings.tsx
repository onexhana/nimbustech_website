// src/pages/admin/AdminSettings.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminSettings() {
  // Mock 데이터 (나중에 API로 교체)
  const [settingsData, setSettingsData] = useState({
    site: {
      title: "님버스테크",
      description: "고객을 빛나게, 구성원을 빛나게, 미래를 빛나게",
      keywords: "IT, 클라우드, RPA, 솔루션, 님버스테크"
    },
    header: {
      logo: "/logo/logo-blue-wide.png",
      menuItems: [
        { label: "Home", link: "home" },
        { label: "About", link: "about-gray-start" },
        { label: "Portfolio", link: "portfolio" },
        { label: "Contact", link: "contact" }
      ]
    },
    footer: {
      logo: "/logo/logo-white-wide.png",
      badge: "/logo/2022_special.png",
      companyName: "NIMBUS TECH",
      copyright: "© 2024 NIMBUS TECH. All rights reserved."
    },
    theme: {
      primaryColor: "#00A3E0",
      secondaryColor: "#6B7280",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937"
    },
    seo: {
      ogTitle: "님버스테크 - 고객 성공 리딩",
      ogDescription: "신뢰성 높은 DT 서비스를 제공하는 님버스테크",
      ogImage: "/logo/logo-blue-wide.png",
      twitterCard: "summary_large_image"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("site");

  const handleSave = () => {
    console.log('저장된 설정 데이터:', settingsData);
    setIsEditing(false);
    alert('설정이 저장되었습니다!');
  };

  const updateSetting = (section: string, field: string, value: any) => {
    setSettingsData({
      ...settingsData,
      [section]: {
        ...settingsData[section as keyof typeof settingsData],
        [field]: value
      }
    });
  };

  const updateMenuItem = (index: number, field: string, value: string) => {
    const newMenuItems = [...settingsData.header.menuItems];
    newMenuItems[index] = { ...newMenuItems[index], [field]: value };
    updateSetting('header', 'menuItems', newMenuItems);
  };

  const addMenuItem = () => {
    const newMenuItems = [...settingsData.header.menuItems, { label: "새 메뉴", link: "new-menu" }];
    updateSetting('header', 'menuItems', newMenuItems);
  };

  const removeMenuItem = (index: number) => {
    const newMenuItems = settingsData.header.menuItems.filter((_, i) => i !== index);
    updateSetting('header', 'menuItems', newMenuItems);
  };

  const tabs = [
    { id: "site", name: "사이트 정보", icon: "🌐" },
    { id: "header", name: "헤더 설정", icon: "📋" },
    { id: "footer", name: "푸터 설정", icon: "📄" },
    { id: "theme", name: "테마 설정", icon: "🎨" },
    { id: "seo", name: "SEO 설정", icon: "🔍" }
  ];

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    사이트 설정
                  </h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>사이트 전반적인 설정을 관리하세요</p>
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
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* 탭 네비게이션 */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  설정 카테고리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      ...(activeTab === tab.id ? {
                        background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-1px)'
                      } : {
                        background: 'rgba(243, 244, 246, 0.8)',
                        color: '#374151'
                      })
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = 'rgba(229, 231, 235, 0.8)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = 'rgba(243, 244, 246, 0.8)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 설정 폼 */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{tabs.find(tab => tab.id === activeTab)?.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  {tabs.find(tab => tab.id === activeTab)?.name} 설정
                </h3>
              </div>

              {/* 사이트 정보 설정 */}
              {activeTab === "site" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      사이트 제목
                    </label>
                    <input
                      type="text"
                      value={settingsData.site.title}
                      onChange={(e) => updateSetting('site', 'title', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      사이트 설명
                    </label>
                    <textarea
                      value={settingsData.site.description}
                      onChange={(e) => updateSetting('site', 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827',
                        resize: 'vertical'
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
                      키워드 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={settingsData.site.keywords}
                      onChange={(e) => updateSetting('site', 'keywords', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                </div>
              )}

              {/* 헤더 설정 */}
              {activeTab === "header" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      로고 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.header.logo}
                      onChange={(e) => updateSetting('header', 'logo', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                        메뉴 항목
                      </label>
                      {isEditing && (
                        <button
                          onClick={addMenuItem}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: 'white',
                            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          메뉴 추가
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {settingsData.header.menuItems.map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(229, 231, 235, 0.5)',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}>
                          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                              disabled={!isEditing}
                              style={{
                                padding: '0.5rem 0.75rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                background: !isEditing ? '#f9fafb' : 'white',
                                color: !isEditing ? '#6b7280' : '#111827'
                              }}
                              placeholder="메뉴명"
                            />
                            <input
                              type="text"
                              value={item.link}
                              onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                              disabled={!isEditing}
                              style={{
                                padding: '0.5rem 0.75rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                background: !isEditing ? '#f9fafb' : 'white',
                                color: !isEditing ? '#6b7280' : '#111827'
                              }}
                              placeholder="링크"
                            />
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => removeMenuItem(index)}
                              style={{
                                padding: '0.5rem',
                                color: '#ef4444',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '6px',
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
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 푸터 설정 */}
              {activeTab === "footer" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      로고 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.logo}
                      onChange={(e) => updateSetting('footer', 'logo', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      배지 이미지 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.badge}
                      onChange={(e) => updateSetting('footer', 'badge', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      회사명
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.companyName}
                      onChange={(e) => updateSetting('footer', 'companyName', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      저작권 정보
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.copyright}
                      onChange={(e) => updateSetting('footer', 'copyright', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                </div>
              )}

              {/* 테마 설정 */}
              {activeTab === "theme" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                        메인 색상
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="color"
                          value={settingsData.theme.primaryColor}
                          onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '48px',
                            height: '40px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            cursor: !isEditing ? 'not-allowed' : 'pointer',
                            opacity: !isEditing ? 0.5 : 1
                          }}
                        />
                        <input
                          type="text"
                          value={settingsData.theme.primaryColor}
                          onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                        보조 색상
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="color"
                          value={settingsData.theme.secondaryColor}
                          onChange={(e) => updateSetting('theme', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '48px',
                            height: '40px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            cursor: !isEditing ? 'not-allowed' : 'pointer',
                            opacity: !isEditing ? 0.5 : 1
                          }}
                        />
                        <input
                          type="text"
                          value={settingsData.theme.secondaryColor}
                          onChange={(e) => updateSetting('theme', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                        배경 색상
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="color"
                          value={settingsData.theme.backgroundColor}
                          onChange={(e) => updateSetting('theme', 'backgroundColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '48px',
                            height: '40px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            cursor: !isEditing ? 'not-allowed' : 'pointer',
                            opacity: !isEditing ? 0.5 : 1
                          }}
                        />
                        <input
                          type="text"
                          value={settingsData.theme.backgroundColor}
                          onChange={(e) => updateSetting('theme', 'backgroundColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                        텍스트 색상
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="color"
                          value={settingsData.theme.textColor}
                          onChange={(e) => updateSetting('theme', 'textColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '48px',
                            height: '40px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            cursor: !isEditing ? 'not-allowed' : 'pointer',
                            opacity: !isEditing ? 0.5 : 1
                          }}
                        />
                        <input
                          type="text"
                          value={settingsData.theme.textColor}
                          onChange={(e) => updateSetting('theme', 'textColor', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO 설정 */}
              {activeTab === "seo" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      Open Graph 제목
                    </label>
                    <input
                      type="text"
                      value={settingsData.seo.ogTitle}
                      onChange={(e) => updateSetting('seo', 'ogTitle', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      Open Graph 설명
                    </label>
                    <textarea
                      value={settingsData.seo.ogDescription}
                      onChange={(e) => updateSetting('seo', 'ogDescription', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827',
                        resize: 'vertical'
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
                      Open Graph 이미지
                    </label>
                    <input
                      type="text"
                      value={settingsData.seo.ogImage}
                      onChange={(e) => updateSetting('seo', 'ogImage', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
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
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                      Twitter Card 타입
                    </label>
                    <select
                      value={settingsData.seo.twitterCard}
                      onChange={(e) => updateSetting('seo', 'twitterCard', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0.75rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827',
                        cursor: !isEditing ? 'not-allowed' : 'pointer'
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
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                </div>
              )}
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
              설정 미리보기
            </h3>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(229, 231, 235, 0.5)'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ color: '#374151' }}>사이트 제목:</strong> 
                <span style={{ color: '#111827' }}>{settingsData.site.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ color: '#374151' }}>메인 색상:</strong> 
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  backgroundColor: settingsData.theme.primaryColor,
                  border: '1px solid rgba(0,0,0,0.1)',
                  marginLeft: '0.5rem'
                }}></div>
                <span style={{ color: '#111827', fontFamily: 'monospace' }}>{settingsData.theme.primaryColor}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ color: '#374151' }}>메뉴 항목:</strong> 
                <span style={{ color: '#111827' }}>{settingsData.header.menuItems.map(item => item.label).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
