// src/pages/admin/AdminPortfolio.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioContext';

export default function AdminPortfolio() {
  const { portfolioData, updateProject, addProject, deleteProject, updateCategories, updatePortfolioData } = usePortfolioData();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "공공",
    image: ""
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSave = () => {
    // 데이터는 Context에서 자동으로 localStorage에 저장됨
    console.log('저장된 포트폴리오 데이터:', portfolioData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      
      setUploadedImage(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // 이미지 경로 자동 설정
      const fileName = file.name;
      const imagePath = `/portfolio_photo/${fileName}`;
      setNewProject({...newProject, image: imagePath});
    }
  };

  const handleAddProject = () => {
    if (uploadedImage) {
      // 실제 프로덕션에서는 서버로 파일을 업로드해야 합니다
      // 현재는 클라이언트에서만 처리
      console.log('업로드된 파일:', uploadedImage);
    }
    
    addProject(newProject);
    setNewProject({ title: "", description: "", category: "공공", image: "" });
    setUploadedImage(null);
    setImagePreview("");
    setShowAddForm(false);
  };

  const handleRemoveProject = (id: number) => {
    deleteProject(id);
  };

  const handleUpdateProject = (id: number, field: string, value: string) => {
    updateProject(id, { [field]: value });
  };

  const handleUpdateProjectImage = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      
      // 이미지 경로 자동 설정
      const fileName = file.name;
      const imagePath = `/portfolio_photo/${fileName}`;
      updateProject(id, { image: imagePath });
      
      // 실제 프로덕션에서는 서버로 파일을 업로드해야 합니다
      console.log('업로드된 파일:', file);
    }
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: `${portfolioData.fontSize?.category || 16}px`,
                      fontWeight: portfolioData.fontWeight?.category || 600,
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
                        color: portfolioData.fontColor?.category || '#374151',
                        border: '1px solid #e5e7eb'
                      })
                    }}
                  >
                    <span style={{ 
                      fontSize: `${portfolioData.fontSize?.category || 16}px`,
                      fontWeight: portfolioData.fontWeight?.category || 600,
                      color: selectedCategory === category ? 'white' : (portfolioData.fontColor?.category || '#374151')
                    }}>
                      {category}
                    </span>
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

            {/* 글씨 스타일 설정 */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  글씨 스타일 설정
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 프로젝트 제목 스타일 */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                    프로젝트 제목
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>크기:</label>
                      <input
                        type="number"
                        min="8"
                        max="48"
                        value={portfolioData.fontSize?.title || 18}
                        onChange={(e) => updatePortfolioData({
                          fontSize: { ...portfolioData.fontSize, title: parseInt(e.target.value) || 18 }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '60px',
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
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>두께:</label>
                      <input
                        type="number"
                        min="100"
                        max="900"
                        step="100"
                        value={portfolioData.fontWeight?.title || 600}
                        onChange={(e) => updatePortfolioData({
                          fontWeight: { ...portfolioData.fontWeight, title: parseInt(e.target.value) || 600 }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '60px',
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
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>색상:</label>
                      <input
                        type="color"
                        value={portfolioData.fontColor?.title || '#1f2937'}
                        onChange={(e) => updatePortfolioData({
                          fontColor: { ...portfolioData.fontColor, title: e.target.value }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '40px',
                          height: '30px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          cursor: !isEditing ? 'not-allowed' : 'pointer',
                          opacity: !isEditing ? 0.6 : 1
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 프로젝트 설명 스타일 */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                    프로젝트 설명
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>크기:</label>
                      <input
                        type="number"
                        min="8"
                        max="32"
                        value={portfolioData.fontSize?.description || 14}
                        onChange={(e) => updatePortfolioData({
                          fontSize: { ...portfolioData.fontSize, description: parseInt(e.target.value) || 14 }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '60px',
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
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>두께:</label>
                      <input
                        type="number"
                        min="100"
                        max="900"
                        step="100"
                        value={portfolioData.fontWeight?.description || 400}
                        onChange={(e) => updatePortfolioData({
                          fontWeight: { ...portfolioData.fontWeight, description: parseInt(e.target.value) || 400 }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '60px',
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
                      <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>색상:</label>
                      <input
                        type="color"
                        value={portfolioData.fontColor?.description || '#6b7280'}
                        onChange={(e) => updatePortfolioData({
                          fontColor: { ...portfolioData.fontColor, description: e.target.value }
                        })}
                        disabled={!isEditing}
                        style={{
                          width: '40px',
                          height: '30px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          outline: 'none',
                          cursor: !isEditing ? 'not-allowed' : 'pointer',
                          opacity: !isEditing ? 0.6 : 1
                        }}
                      />
                    </div>
                  </div>
                </div>

                 {/* 카테고리 스타일 */}
                 <div>
                   <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                     카테고리
                   </h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>크기:</label>
                       <input
                         type="number"
                         min="8"
                         max="32"
                         value={portfolioData.fontSize?.category || 16}
                         onChange={(e) => updatePortfolioData({
                           fontSize: { ...portfolioData.fontSize, category: parseInt(e.target.value) || 16 }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '60px',
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
                       <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>두께:</label>
                       <input
                         type="number"
                         min="100"
                         max="900"
                         step="100"
                         value={portfolioData.fontWeight?.category || 500}
                         onChange={(e) => updatePortfolioData({
                           fontWeight: { ...portfolioData.fontWeight, category: parseInt(e.target.value) || 500 }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '60px',
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
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>색상:</label>
                       <input
                         type="color"
                         value={portfolioData.fontColor?.category || '#374151'}
                         onChange={(e) => updatePortfolioData({
                           fontColor: { ...portfolioData.fontColor, category: e.target.value }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '40px',
                           height: '30px',
                           border: '1px solid #e5e7eb',
                           borderRadius: '4px',
                           outline: 'none',
                           cursor: !isEditing ? 'not-allowed' : 'pointer',
                           opacity: !isEditing ? 0.6 : 1
                         }}
                       />
                     </div>
                   </div>
                 </div>

                 {/* 이미지 크기 설정 */}
                 <div>
                   <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                     이미지 크기
                   </h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>웹:</label>
                       <input
                         type="number"
                         min="200"
                         max="500"
                         value={portfolioData.imageSize?.web || 330}
                         onChange={(e) => updatePortfolioData({
                           imageSize: { ...portfolioData.imageSize, web: parseInt(e.target.value) || 330 }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '60px',
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
                       <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>모바일:</label>
                       <input
                         type="number"
                         min="150"
                         max="350"
                         value={portfolioData.imageSize?.mobile || 260}
                         onChange={(e) => updatePortfolioData({
                           imageSize: { ...portfolioData.imageSize, mobile: parseInt(e.target.value) || 260 }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '60px',
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
                       <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '40px' }}>높이:</label>
                       <input
                         type="number"
                         min="150"
                         max="300"
                         value={portfolioData.imageSize?.height || 250}
                         onChange={(e) => updatePortfolioData({
                           imageSize: { ...portfolioData.imageSize, height: parseInt(e.target.value) || 250 }
                         })}
                         disabled={!isEditing}
                         style={{
                           width: '60px',
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
                       <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>px</span>
                     </div>
                   </div>
                 </div>
              </div>
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
                          color: '#111827',
                          boxSizing: 'border-box'
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
                          color: '#111827',
                          boxSizing: 'border-box'
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
                          color: '#111827',
                          boxSizing: 'border-box'
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
                        프로젝트 이미지
                      </label>
                      
                      {/* 파일 업로드 영역 */}
                      <div style={{
                        width: '100%',
                        maxWidth: '650px',
                        border: '2px dashed #d1d5db',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                          const file = files[0];
                          if (file.type.startsWith('image/')) {
                          const event = {
                            target: { files: [file] }
                          } as unknown as React.ChangeEvent<HTMLInputElement>;
                            handleImageUpload(event);
                          } else {
                            alert('이미지 파일만 업로드 가능합니다.');
                          }
                        }
                      }}
                      onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        
                        {imagePreview ? (
                          <div>
                            <img
                              src={imagePreview}
                              alt="미리보기"
                              style={{
                                maxWidth: '200px',
                                maxHeight: '150px',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                objectFit: 'cover'
                              }}
                            />
                            <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '500', margin: 0 }}>
                              ✓ 이미지가 업로드되었습니다
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                              {uploadedImage?.name}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <svg width="48" height="48" fill="none" stroke="#9ca3af" viewBox="0 0 24 24" style={{ margin: '0 auto 1rem auto' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                              이미지를 업로드하세요
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                              클릭하거나 드래그하여 파일을 선택하세요
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.5rem 0 0 0' }}>
                              PNG, JPG, JPEG (최대 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* 수동 경로 입력 (선택사항) */}
                      <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>
                          또는 이미지 경로를 직접 입력하세요
                        </label>
                        <input
                          type="text"
                          value={newProject.image}
                          onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                          style={{
                            width: '100%',
                            maxWidth: '650px',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            background: 'white',
                            color: '#111827',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="/portfolio_photo/이미지명.jpg"
                        />
                      </div>
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
                      onClick={handleAddProject}
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
                          onClick={() => handleRemoveProject(project.id)}
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
                          onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
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
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
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
                          onChange={(e) => handleUpdateProject(project.id, 'category', e.target.value)}
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
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
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
                          onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
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
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
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
                          프로젝트 이미지
                        </label>
                        
                        {/* 현재 이미지 미리보기 */}
                        {project.image && (
                          <div style={{ marginBottom: '1rem' }}>
                            <img
                              src={project.image}
                              alt={project.title}
                              style={{
                                maxWidth: '200px',
                                maxHeight: '150px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: '1px solid #e5e7eb'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        {/* 파일 업로드 버튼 */}
                        {isEditing && (
                          <div style={{ marginBottom: '1rem' }}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleUpdateProjectImage(project.id, e)}
                              style={{ display: 'none' }}
                              id={`image-upload-${project.id}`}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`image-upload-${project.id}`)?.click()}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#3b82f6',
                                background: 'white',
                                border: '1px solid #3b82f6',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#eff6ff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                              }}
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              이미지 변경
                            </button>
                          </div>
                        )}
                        
                        {/* 수동 경로 입력 */}
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) => handleUpdateProject(project.id, 'image', e.target.value)}
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
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
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
                          placeholder="/portfolio_photo/이미지명.jpg"
                        />
                        {isEditing && (
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                            이미지 경로를 직접 입력하거나 위의 버튼으로 파일을 업로드하세요
                          </p>
                        )}
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
                    <h5 style={{ 
                      fontWeight: portfolioData.fontWeight?.title || 600, 
                      color: portfolioData.fontColor?.title || '#1f2937', 
                      marginBottom: '0.5rem', 
                      fontSize: `${(portfolioData.fontSize?.title || 18) * 0.5}px`, 
                      margin: 0 
                    }}>
                      {project.title}
                    </h5>
                    <p style={{ 
                      fontSize: `${(portfolioData.fontSize?.description || 14) * 0.5}px`, 
                      color: portfolioData.fontColor?.description || '#6b7280', 
                      lineHeight: '1.5', 
                      margin: 0,
                      fontWeight: portfolioData.fontWeight?.description || 400
                    }}>
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
