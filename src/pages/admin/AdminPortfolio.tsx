// src/pages/admin/AdminPortfolio.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPortfolio() {
  // Mock 데이터 (나중에 API로 교체)
  const [portfolioData, setPortfolioData] = useState({
    categories: ["공공", "금융", "일반 / 제조"],
    projects: [
      // 공공 카테고리
      { id: 1, title: "다산콜센터", description: "다산콜센터 업무자동화", category: "공공", image: "/portfolio_photo/공공_다산콜센터.jpg" },
      { id: 2, title: "중구청", description: "중구청 업무자동화", category: "공공", image: "/portfolio_photo/공공_중구청.jpg" },
      { id: 3, title: "국가정보자원관리원", description: "범정부 정보자원 통합구축", category: "공공", image: "/portfolio_photo/공공_범정부.png" },
      { id: 4, title: "국가정보자원관리원", description: "정보시스템 유지관리 사업", category: "공공", image: "/portfolio_photo/공공_정보시스템.png" },
      { id: 5, title: "국방통합데이터센터", description: "국방데이터센터 구축 사업", category: "공공", image: "/portfolio_photo/공공_국방데이터센터.jpg" },
      { id: 6, title: "국민연금공단", description: "국민연금 차세대 개발", category: "공공", image: "/portfolio_photo/공공_국민연금.jpg" },
      
      // 금융 카테고리
      { id: 22, title: "신한금융투자", description: "RPA개발 및 운영사업", category: "금융", image: "/portfolio_photo/금융_신한금융투자.jpg" },
      { id: 23, title: "메트라이프금융서비스", description: "RPA 시범사업", category: "금융", image: "/portfolio_photo/금융_메트라이프금융서비스.jpg" },
      { id: 24, title: "미래에셋", description: "보안포탈", category: "금융", image: "/portfolio_photo/금융_미래에셋.jpg" },
      { id: 25, title: "하나은행", description: "마이데이터 구축", category: "금융", image: "/portfolio_photo/금융_하나은행.jpg" },
      { id: 26, title: "AIA생명", description: "서버 운영", category: "금융", image: "/portfolio_photo/금융_AIA생명.jpg" },
      { id: 27, title: "한국투자증권", description: "AIX 서버 운영", category: "금융", image: "/portfolio_photo/금융_한국투자증권.jpg" },
      { id: 28, title: "메트라이프", description: "데이터센터 운영", category: "금융", image: "/portfolio_photo/금융_메트라이프.jpg" },
      { id: 29, title: "DB생명보험", description: "서버 운영", category: "금융", image: "/portfolio_photo/금융_DB생명보험.jpg" },
      { id: 30, title: "국민카드", description: "클라우드 사업", category: "금융", image: "/portfolio_photo/금융_국민카드.png" },
      { id: 31, title: "ACE 손해보험", description: "대응개발", category: "금융", image: "/portfolio_photo/금융_ACE.jpg" },
      
      // 일반/제조 카테고리
      { id: 32, title: "삼성전자", description: "RPA 개발 및 운영사업", category: "일반 / 제조", image: "/portfolio_photo/일반_삼성전자.jpg" },
      { id: 33, title: "태평양물산", description: "RPA 시범사업", category: "일반 / 제조", image: "/portfolio_photo/일반_태평양물산.png" },
      { id: 34, title: "LG", description: "RPA 구축", category: "일반 / 제조", image: "/portfolio_photo/일반_LG.jpg" },
      { id: 35, title: "H에너지", description: "태양광 발전 운영시스템 구축", category: "일반 / 제조", image: "/portfolio_photo/일반_태양광.jpg" },
      { id: 36, title: "CJ", description: "DB 구축 기술지원", category: "일반 / 제조", image: "/portfolio_photo/일반_CJ.jpg" },
      { id: 37, title: "강원랜드", description: "DBA 운영", category: "일반 / 제조", image: "/portfolio_photo/일반_강원랜드.jpg" },
      { id: 38, title: "한국신용정보원", description: "Operator", category: "일반 / 제조", image: "/portfolio_photo/일반_한국신용정보원.jpg" },
      { id: 39, title: "현대백화점", description: "DR구축", category: "일반 / 제조", image: "/portfolio_photo/일반_현대.jpg" }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "공공",
    image: ""
  });

  const handleSave = () => {
    console.log('저장된 포트폴리오 데이터:', portfolioData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  const addProject = () => {
    const newId = Math.max(...portfolioData.projects.map(p => p.id)) + 1;
    const project = {
      id: newId,
      ...newProject
    };
    
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, project]
    });
    
    setNewProject({ title: "", description: "", category: "공공", image: "" });
    setShowAddForm(false);
  };

  const removeProject = (id: number) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.filter(p => p.id !== id)
    });
  };

  const updateProject = (id: number, field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  const filteredProjects = portfolioData.projects.filter(p => p.category === selectedCategory);

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    포트폴리오 페이지 관리
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* 카테고리 관리 */}
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
                  카테고리 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {portfolioData.categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      ...(selectedCategory === category ? {
                        background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                      } : {
                        background: 'rgba(255, 255, 255, 0.5)',
                        color: '#374151',
                        border: '1px solid #e5e7eb'
                      })
                    }}
                  >
                    <span>{category}</span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      ...(selectedCategory === category ? {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      } : {
                        background: '#f3f4f6',
                        color: '#6b7280'
                      })
                    }}>
                      {portfolioData.projects.filter(p => p.category === category).length}
                    </span>
                  </button>
                ))}
              </div>
              
              {isEditing && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                    새 카테고리 추가
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="카테고리명"
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'white',
                      background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 프로젝트 목록 */}
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
                    {selectedCategory} 프로젝트 관리
                  </h3>
                </div>
                {isEditing && (
                  <button
                    onClick={() => setShowAddForm(true)}
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
                    <span>프로젝트 추가</span>
                  </button>
                )}
              </div>

              {/* 새 프로젝트 추가 폼 */}
              {showAddForm && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(229, 231, 235, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                    새 프로젝트 추가
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        프로젝트명
                      </label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        style={{
                          width: '100%',
                          maxWidth: '650px',
                          padding: '0.5rem 0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: 'white',
                          color: '#111827'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="프로젝트명을 입력하세요"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        카테고리
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        style={{
                          width: '100%',
                          maxWidth: '650px',
                          padding: '0.5rem 0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: 'white',
                          color: '#111827'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        {portfolioData.categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        설명
                      </label>
                      <input
                        type="text"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        style={{
                          width: '100%',
                          maxWidth: '650px',
                          padding: '0.5rem 0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: 'white',
                          color: '#111827'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="프로젝트 설명을 입력하세요"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        이미지 경로
                      </label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        style={{
                          width: '100%',
                          maxWidth: '650px',
                          padding: '0.5rem 0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          background: 'white',
                          color: '#111827'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="/portfolio_photo/이미지명.jpg"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #d1d5db',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      취소
                    </button>
                    <button
                      onClick={addProject}
                      style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'white',
                        background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      추가
                    </button>
                  </div>
                </div>
              )}

              {/* 프로젝트 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredProjects.map((project, projectIndex) => (
                  <div key={project.id} style={{
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
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{projectIndex + 1}</span>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                          프로젝트 {projectIndex + 1}
                        </h4>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeProject(project.id)}
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
                          프로젝트명
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
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
                          카테고리
                        </label>
                        <select
                          value={project.category}
                          onChange={(e) => updateProject(project.id, 'category', e.target.value)}
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
                        >
                          {portfolioData.categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          설명
                        </label>
                        <input
                          type="text"
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
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
                          이미지 경로
                        </label>
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) => updateProject(project.id, 'image', e.target.value)}
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
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem', margin: 0 }}>
                포트폴리오
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', margin: 0 }}>
                {selectedCategory} 프로젝트 ({filteredProjects.length}개)
              </p>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(229, 231, 235, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                  {selectedCategory} 섹션
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
                    {filteredProjects.length}개 프로젝트
                  </span>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: '0.75rem' 
              }}>
                {filteredProjects.slice(0, 3).map((project, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <h5 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', fontSize: '0.875rem', margin: 0 }}>
                      {project.title}
                    </h5>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                      {project.description}
                    </p>
                  </div>
                ))}
                {filteredProjects.length > 3 && (
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
                      +{filteredProjects.length - 3}개 더
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
