// src/pages/admin/AdminContact.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContactData, saveContactData } from '../../api/contact';
import type { ContactData } from '../../types/contact';

export default function AdminContact() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVersion, setActiveVersion] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await getContactData();
        setContactData(data);
      } catch (error) {
        console.error('Contact 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadContactData();
  }, []);

  const handleSave = async () => {
    if (!contactData) return;
    
    try {
      await saveContactData(contactData);
      setIsEditing(false);
      alert('저장되었습니다!');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const updateSection = (index: number, field: string, value: string) => {
    if (!contactData) return;
    const newSections = [...contactData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setContactData({ ...contactData, sections: newSections });
  };

  const updateButton = (index: number, field: string, value: string) => {
    if (!contactData) return;
    const newButtons = [...contactData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setContactData({ ...contactData, buttons: newButtons });
  };

  const updateCompanyInfo = (section: string, field: string, value: string) => {
    if (!contactData) return;
    setContactData({
      ...contactData,
      companyInfo: {
        ...contactData.companyInfo,
        [section]: {
          ...contactData.companyInfo[section as keyof typeof contactData.companyInfo],
          [field]: value
        }
      }
    });
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

  if (!contactData) {
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)'
    }}>
      {/* 헤더 */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    Contact 페이지 관리
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
        {/* 모바일/데스크톱 버전 선택 탭 */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(10px)', 
          borderRadius: '12px', 
          padding: '1rem', 
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveVersion('desktop')}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ...(activeVersion === 'desktop' ? {
                  background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                  color: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                } : {
                  background: 'rgba(255, 255, 255, 0.5)',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb'
                })
              }}
            >
              데스크탑 버전
            </button>
            <button
              onClick={() => setActiveVersion('mobile')}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ...(activeVersion === 'mobile' ? {
                  background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                  color: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                } : {
                  background: 'rgba(255, 255, 255, 0.5)',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb'
                })
              }}
            >
              모바일 버전
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* 가치 섹션 관리 */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  가치 섹션 관리
                </h3>
              </div>
              
              {/* 데스크톱/모바일 탭 */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setActiveTab(0)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === 0 ? '#8b5cf6' : '#f3f4f6',
                    color: activeTab === 0 ? 'white' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  데스크톱
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === 1 ? '#8b5cf6' : '#f3f4f6',
                    color: activeTab === 1 ? 'white' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  모바일
                </button>
              </div>
              {/* 데스크톱 버전 */}
              {activeTab === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ 
                    padding: '1rem', 
                    background: 'rgba(59, 130, 246, 0.05)', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', margin: '0 0 1rem 0' }}>
                      데스크톱 버전
                    </h4>
                  </div>
                  
                  {contactData.sections.map((section, index) => (
                    <div key={index} style={{
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
                            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                          </div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                            {section.title} 섹션 (데스크톱)
                          </h4>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            제목
                          </label>
                          <input
                            type="text"
                            value={section.desktop?.title || section.title}
                            onChange={(e) => {
                              if (!contactData) return;
                              const newSections = [...contactData.sections];
                              newSections[index] = { 
                                ...newSections[index], 
                                desktop: { 
                                  ...newSections[index].desktop, 
                                  title: e.target.value 
                                }
                              };
                              setContactData({ ...contactData, sections: newSections });
                            }}
                            disabled={!isEditing}
                            style={{
                              width: '100%',
                              maxWidth: '280px',
                              padding: '0.3rem 0.5rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              outline: 'none',
                              fontSize: '0.75rem',
                              transition: 'all 0.2s ease',
                              background: !isEditing ? '#f9fafb' : 'white',
                              color: !isEditing ? '#6b7280' : '#111827'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            설명 (줄바꿈으로 구분)
                          </label>
                          <textarea
                            value={section.desktop?.description || section.description}
                            onChange={(e) => {
                              if (!contactData) return;
                              const newSections = [...contactData.sections];
                              newSections[index] = { 
                                ...newSections[index], 
                                desktop: { 
                                  ...newSections[index].desktop, 
                                  description: e.target.value 
                                }
                              };
                              setContactData({ ...contactData, sections: newSections });
                            }}
                            disabled={!isEditing}
                            rows={3}
                            style={{
                              width: '100%',
                              maxWidth: '280px',
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
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 모바일 버전 */}
              {activeTab === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ 
                    padding: '1rem', 
                    background: 'rgba(34, 197, 94, 0.05)', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#15803d', margin: '0 0 1rem 0' }}>
                      모바일 버전
                    </h4>
                  </div>
                  
                  {contactData.sections.map((section, index) => (
                    <div key={index} style={{
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
                            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                          </div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                            {section.title} 섹션 (모바일)
                          </h4>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            제목
                          </label>
                          <input
                            type="text"
                            value={section.mobile?.title || section.title}
                            onChange={(e) => {
                              if (!contactData) return;
                              const newSections = [...contactData.sections];
                              newSections[index] = { 
                                ...newSections[index], 
                                mobile: { 
                                  ...newSections[index].mobile, 
                                  title: e.target.value 
                                }
                              };
                              setContactData({ ...contactData, sections: newSections });
                            }}
                            disabled={!isEditing}
                            style={{
                              width: '100%',
                              maxWidth: '280px',
                              padding: '0.3rem 0.5rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              outline: 'none',
                              fontSize: '0.75rem',
                              transition: 'all 0.2s ease',
                              background: !isEditing ? '#f9fafb' : 'white',
                              color: !isEditing ? '#6b7280' : '#111827'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            설명 (줄바꿈으로 구분)
                          </label>
                          <textarea
                            value={section.mobile?.description || section.description}
                            onChange={(e) => {
                              if (!contactData) return;
                              const newSections = [...contactData.sections];
                              newSections[index] = { 
                                ...newSections[index], 
                                mobile: { 
                                  ...newSections[index].mobile, 
                                  description: e.target.value 
                                }
                              };
                              setContactData({ ...contactData, sections: newSections });
                            }}
                            disabled={!isEditing}
                            rows={3}
                            style={{
                              width: '100%',
                              maxWidth: '280px',
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 글꼴 사이즈 관리 - 데스크탑 버전 */}
          {activeVersion === 'desktop' && (
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
                  글꼴 사이즈 관리 (데스크탑)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 메인 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="12"
                      max="48"
                      value={contactData.fontSize?.desktopMainTitle || contactData.fontSize?.mainTitle || 45}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopMainTitle: parseInt(e.target.value) || 45 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 부제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="32"
                      value={contactData.fontSize?.desktopSubtitle || contactData.fontSize?.subtitle || 24}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopSubtitle: parseInt(e.target.value) || 24 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 섹션 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="28"
                      value={contactData.fontSize?.desktopSectionTitle || contactData.fontSize?.sectionTitle || 42}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopSectionTitle: parseInt(e.target.value) || 42 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 섹션 설명 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="8"
                      max="20"
                      value={contactData.fontSize?.desktopSectionDescription || contactData.fontSize?.sectionDescription || 21}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopSectionDescription: parseInt(e.target.value) || 21 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 버튼 텍스트 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="24"
                      value={contactData.fontSize?.desktopButtonText || contactData.fontSize?.buttonText || 32}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopButtonText: parseInt(e.target.value) || 32 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 회사 정보 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="8"
                      max="20"
                      value={contactData.fontSize?.desktopCompanyInfo || contactData.fontSize?.companyInfo || 16}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, desktopCompanyInfo: parseInt(e.target.value) || 16 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 글꼴 사이즈 관리 - 모바일 버전 */}
          {activeVersion === 'mobile' && (
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
                  글꼴 사이즈 관리 (모바일)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 메인 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="12"
                      max="48"
                      value={contactData.fontSize?.mainTitle || 30}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, mainTitle: parseInt(e.target.value) || 30 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 부제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="32"
                      value={contactData.fontSize?.subtitle || 18}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, subtitle: parseInt(e.target.value) || 18 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 섹션 제목 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="28"
                      value={contactData.fontSize?.sectionTitle || 42}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, sectionTitle: parseInt(e.target.value) || 42 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 섹션 설명 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="8"
                      max="20"
                      value={contactData.fontSize?.sectionDescription || 15}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, sectionDescription: parseInt(e.target.value) || 15 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 버튼 텍스트 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="10"
                      max="24"
                      value={contactData.fontSize?.buttonText || 24}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, buttonText: parseInt(e.target.value) || 24 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 회사 정보 크기
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="8"
                      max="20"
                      value={contactData.fontSize?.companyInfo || 14}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        fontSize: { ...contactData.fontSize, companyInfo: parseInt(e.target.value) || 14 }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '80px',
                        padding: '0.3rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        background: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#111827'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 색상 관리 - 데스크탑 버전 */}
          {activeVersion === 'desktop' && (
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
                  background: 'linear-gradient(135deg, #ec4899, #be185d)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  색상 관리 (데스크탑)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 메인 제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopMainTitle || contactData.colors?.mainTitle || '#1f2937'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopMainTitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopMainTitle || contactData.colors?.mainTitle || '#1f2937'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 부제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopSubtitle || contactData.colors?.subtitle || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopSubtitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopSubtitle || contactData.colors?.subtitle || '#6b7280'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 섹션 제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopSectionTitle || contactData.colors?.sectionTitle || '#3b82f6'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopSectionTitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopSectionTitle || contactData.colors?.sectionTitle || '#3b82f6'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 섹션 설명 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopSectionDescription || contactData.colors?.sectionDescription || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopSectionDescription: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopSectionDescription || contactData.colors?.sectionDescription || '#6b7280'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 버튼 텍스트 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopButtonText || contactData.colors?.buttonText || '#ffffff'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopButtonText: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopButtonText || contactData.colors?.buttonText || '#ffffff'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    데스크탑 회사 정보 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.desktopCompanyInfo || contactData.colors?.companyInfo || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, desktopCompanyInfo: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.desktopCompanyInfo || contactData.colors?.companyInfo || '#6b7280'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 색상 관리 - 모바일 버전 */}
          {activeVersion === 'mobile' && (
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
                  background: 'linear-gradient(135deg, #ec4899, #be185d)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  색상 관리 (모바일)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 메인 제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.mainTitle || '#1f2937'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, mainTitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.mainTitle || '#1f2937'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 부제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.subtitle || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, subtitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.subtitle || '#6b7280'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 섹션 제목 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.sectionTitle || '#3b82f6'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, sectionTitle: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.sectionTitle || '#3b82f6'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 섹션 설명 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.sectionDescription || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, sectionDescription: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.sectionDescription || '#6b7280'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 버튼 텍스트 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.buttonText || '#ffffff'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, buttonText: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.buttonText || '#ffffff'}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    모바일 회사 정보 색상
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="color"
                      value={contactData.colors?.companyInfo || '#6b7280'}
                      onChange={(e) => contactData && setContactData({
                        ...contactData, 
                        colors: { ...contactData.colors, companyInfo: e.target.value }
                      })}
                      disabled={!isEditing}
                      style={{
                        width: '40px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: isEditing ? 'pointer' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {contactData.colors?.companyInfo || '#6b7280'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 버튼 관리 */}
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
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  버튼 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactData.buttons.map((button, index) => (
                  <div key={index} style={{
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
                          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                          버튼 {index + 1}
                        </h4>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          버튼 텍스트
                        </label>
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(index, 'text', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            maxWidth: '280px',
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          버튼 타입
                        </label>
                        <select
                          value={button.type}
                          onChange={(e) => updateButton(index, 'type', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            maxWidth: '320px',
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        >
                          <option value="inquiry">고객 문의</option>
                          <option value="hiring">인재 채용</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 회사 정보 관리 */}
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
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  회사 정보 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 세종 본사 */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>세종 본사</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        제목
                      </label>
                      <input
                        type="text"
                        value={contactData.companyInfo.sejong.title}
                        onChange={(e) => updateCompanyInfo('sejong', 'title', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '180px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        주소
                      </label>
                      <input
                        type="text"
                        value={contactData.companyInfo.sejong.address}
                        onChange={(e) => updateCompanyInfo('sejong', 'address', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '180px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 서울사무소 */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>서울사무소</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        제목
                      </label>
                      <input
                        type="text"
                        value={contactData.companyInfo.seoul.title}
                        onChange={(e) => updateCompanyInfo('seoul', 'title', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        주소
                      </label>
                      <input
                        type="text"
                        value={contactData.companyInfo.seoul.address}
                        onChange={(e) => updateCompanyInfo('seoul', 'address', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 연락처 정보 */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>연락처 정보</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        전화번호
                      </label>
                      <input
                        type="text"
                        value={contactData.companyInfo.contact.phone}
                        onChange={(e) => updateCompanyInfo('contact', 'phone', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        이메일
                      </label>
                      <input
                        type="email"
                        value={contactData.companyInfo.contact.email}
                        onChange={(e) => updateCompanyInfo('contact', 'email', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          maxWidth: '280px',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s ease',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PDF 파일 관리 */}
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
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  PDF 파일 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactData.pdfFiles.map((file, index) => (
                  <div key={index} style={{
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
                          background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                          {file.name}
                        </h4>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          파일명
                        </label>
                        <input
                          type="text"
                          value={file.name}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            maxWidth: '280px',
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          파일 경로
                        </label>
                        <input
                          type="text"
                          value={file.path}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            maxWidth: '280px',
                            padding: '0.3rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <a
                          href={file.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                        >
                          파일 미리보기
                        </a>
                      </div>
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
            background: 'rgba(243, 244, 246, 0.5)',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid rgba(229, 231, 235, 0.5)'
          }}>
            {/* 메인 타이틀 미리보기 */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
              <h2 style={{ 
                fontSize: activeVersion === 'desktop' ? 
                  `${contactData.fontSize?.desktopMainTitle || contactData.fontSize?.mainTitle || 45}px` :
                  `${contactData.fontSize?.mainTitle || 30}px`, 
                fontWeight: '1100',
                color: activeVersion === 'desktop' ? 
                  (contactData.colors?.desktopMainTitle || contactData.colors?.mainTitle || '#1f2937') :
                  (contactData.colors?.mainTitle || '#1f2937'),
                lineHeight: '1.2',
                letterSpacing: activeVersion === 'desktop' ? '-3.5px' : '-2px',
                margin: 0 
              }}>
                Contact
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                ({activeVersion === 'desktop' ? '데스크탑' : '모바일'} 버전 미리보기)
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* 가치 섹션 미리보기 */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', margin: '0 0 1rem 0' }}>가치 섹션</h4>
                {contactData.sections.map((section, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h5 style={{ 
                      fontSize: activeVersion === 'desktop' ? 
                        `${contactData.fontSize?.desktopSectionTitle || contactData.fontSize?.sectionTitle || 42}px` :
                        `${contactData.fontSize?.sectionTitle || 42}px`, 
                      fontWeight: 'bold', 
                      color: activeVersion === 'desktop' ? 
                        (contactData.colors?.desktopSectionTitle || contactData.colors?.sectionTitle || '#3b82f6') :
                        (contactData.colors?.sectionTitle || '#3b82f6'), 
                      margin: '0 0 0.5rem 0' 
                    }}>
                      {section.title}
                    </h5>
                    <p style={{ 
                      fontSize: activeVersion === 'desktop' ? 
                        `${contactData.fontSize?.desktopSectionDescription || contactData.fontSize?.sectionDescription || 21}px` :
                        `${contactData.fontSize?.sectionDescription || 15}px`, 
                      color: activeVersion === 'desktop' ? 
                        (contactData.colors?.desktopSectionDescription || contactData.colors?.sectionDescription || '#6b7280') :
                        (contactData.colors?.sectionDescription || '#6b7280'), 
                      margin: 0, 
                      whiteSpace: 'pre-line' 
                    }}>
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* 회사 정보 미리보기 */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', margin: '0 0 1rem 0' }}>회사 정보</h4>
                <div style={{ 
                  fontSize: activeVersion === 'desktop' ? 
                    `${contactData.fontSize?.desktopCompanyInfo || contactData.fontSize?.companyInfo || 16}px` :
                    `${contactData.fontSize?.companyInfo || 14}px`, 
                  color: activeVersion === 'desktop' ? 
                    (contactData.colors?.desktopCompanyInfo || contactData.colors?.companyInfo || '#6b7280') :
                    (contactData.colors?.companyInfo || '#6b7280'), 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem' 
                }}>
                  <p style={{ margin: 0 }}>{contactData.companyInfo.sejong.title} {contactData.companyInfo.sejong.address}</p>
                  <p style={{ margin: 0 }}>{contactData.companyInfo.seoul.title} {contactData.companyInfo.seoul.address}</p>
                  <p style={{ margin: 0 }}>T: {contactData.companyInfo.contact.phone}</p>
                  <p style={{ margin: 0 }}>E: {contactData.companyInfo.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}