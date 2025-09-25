// src/pages/admin/AdminContact.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactData } from '../../context/ContactContext';

export default function AdminContact() {
  const { contactData, updateSection, updateButton, updateCompanyInfo, updatePdfFile } = useContactData();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // 데이터는 Context에서 자동으로 localStorage에 저장됨
    console.log('저장된 Contact 데이터:', contactData);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    Contact 페이지 관리
                  </h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Contact 페이지 콘텐츠를 편집하고 관리하세요</p>
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
          {/* 가치 섹션 편집 */}
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
                가치 섹션
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactData.sections.map((section, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(229, 231, 235, 0.3)'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      제목
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, { title: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
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
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      설명
                    </label>
                    <textarea
                      value={section.description}
                      onChange={(e) => updateSection(index, { description: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                      style={{
                        width: '100%',
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
              ))}
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
                버튼 섹션
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactData.buttons.map((button, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(229, 231, 235, 0.3)'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      버튼 텍스트
                    </label>
                    <input
                      type="text"
                      value={button.text}
                      onChange={(e) => updateButton(index, { text: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
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
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      버튼 타입
                    </label>
                    <select
                      value={button.type}
                      onChange={(e) => updateButton(index, { type: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        outline: 'none',
                        fontSize: '0.875rem',
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
              ))}
            </div>
          </div>

          {/* 회사 정보 편집 */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                회사 정보
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  세종 본사 주소
                </label>
                <input
                  type="text"
                  value={contactData.companyInfo.sejong.address}
                  onChange={(e) => updateCompanyInfo({ sejong: { ...contactData.companyInfo.sejong, address: e.target.value } })}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
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
                  서울사무소 주소
                </label>
                <input
                  type="text"
                  value={contactData.companyInfo.seoul.address}
                  onChange={(e) => updateCompanyInfo({ seoul: { ...contactData.companyInfo.seoul, address: e.target.value } })}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
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
                  전화번호
                </label>
                <input
                  type="text"
                  value={contactData.companyInfo.contact.phone}
                  onChange={(e) => updateCompanyInfo({ contact: { ...contactData.companyInfo.contact, phone: e.target.value } })}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
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
                  이메일
                </label>
                <input
                  type="email"
                  value={contactData.companyInfo.contact.email}
                  onChange={(e) => updateCompanyInfo({ contact: { ...contactData.companyInfo.contact, email: e.target.value } })}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}