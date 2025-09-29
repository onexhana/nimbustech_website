// src/pages/admin/AdminPortfolio.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioContext';

export default function AdminPortfolio() {
  const { portfolioData, updateProject, addProject, deleteProject, updateCategories, updatePortfolioData } = usePortfolioData();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("공공");
  const [logoSliderCategory, setLogoSliderCategory] = useState("고객사");
  const [activeSection, setActiveSection] = useState<"portfolio" | "logoSlider">("portfolio");
  const [logoSliderSettings, setLogoSliderSettings] = useState({
    web: {
      speed: 50,
      textColor: "#374151",
      textSize: 40
    },
    mobile: {
      speed: 300,
      textColor: "#374151", 
      textSize: 23
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "공공",
    image: ""
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showLogoUpload, setShowLogoUpload] = useState<{type: 'customer' | 'partner', index: number} | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  // 로고 슬라이드 설정 로드
  useEffect(() => {
    const savedSettings = localStorage.getItem('logoSliderSettings');
    if (savedSettings) {
      try {
        setLogoSliderSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('로고 슬라이드 설정 로드 실패:', error);
      }
    }
  }, []);

  // 로고 슬라이드 설정 저장
  const saveLogoSliderSettings = (settings: typeof logoSliderSettings) => {
    setLogoSliderSettings(settings);
    localStorage.setItem('logoSliderSettings', JSON.stringify(settings));
    alert('로고 슬라이드 설정이 저장되었습니다!');
  };

  // 로고 업로드 핸들러
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 로고 변경 저장
  const handleLogoChange = (type: 'customer' | 'partner', index: number) => {
    if (uploadedLogo && showLogoUpload) {
      const storageKey = type === 'customer' ? 'customerLogos' : 'partnerLogos';
      const count = type === 'customer' ? 16 : 21;
      
      // localStorage에서 기존 로고 배열 가져오기
      const existingLogos = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // 기본값으로 초기화 (빈 배열일 경우)
      if (existingLogos.length === 0) {
        for (let i = 0; i < count; i++) {
          const num = String(i + 1).padStart(2, "0");
          existingLogos.push(`/고객사 & 파트너사_고화질/${type === 'customer' ? '고객사' : '파트너사'}${num}.png`);
        }
      }
      
      // 해당 인덱스의 로고 경로 업데이트
      existingLogos[index] = uploadedLogo;
      localStorage.setItem(storageKey, JSON.stringify(existingLogos));
      
      alert(`${type === 'customer' ? '고객사' : '파트너사'} 로고가 업데이트되었습니다.`);
      setShowLogoUpload(null);
      setUploadedLogo(null);
    }
  };

  const handleSave = () => {
    // 데이터는 Context에서 자동으로 localStorage에 저장됨
    console.log('저장된 포트폴리오 데이터:', portfolioData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 유형 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      // 파일 크기 검사 (5MB 제한)
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
      // 실제 프로덕션에서는 서버에 파일을 업로드해야 합니다.
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
      // 파일 유형 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      // 파일 크기 검사 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      
      // 이미지 경로 자동 설정
      const fileName = file.name;
      const imagePath = `/portfolio_photo/${fileName}`;
      updateProject(id, { image: imagePath });
      
      // 실제 프로덕션에서는 서버에 파일을 업로드해야 합니다.
      console.log('업로드된 파일:', file);
    }
  };

  const filteredProjects = portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
      fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif"
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
                  <h1 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#1f2937', 
                    margin: 0,
                    letterSpacing: '-0.5px',
                    lineHeight: '1.2'
                  }}>
                    포트폴리오 페이지 관리
                  </h1>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    margin: 0,
                    fontWeight: '400',
                    lineHeight: '1.5'
                  }}>콘텐츠를 편집하고 관리하세요</p>
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
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: 0,
                  letterSpacing: '-0.3px',
                  lineHeight: '1.3'
                }}>
                  카테고리 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {portfolioData.categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveSection("portfolio");
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: `${portfolioData.fontSize?.category?.web || 25}px`,
                      fontWeight: portfolioData.fontWeight?.category?.web || 500,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      ...(activeSection === "portfolio" && selectedCategory === category ? {
                        background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                      } : {
                        background: 'rgba(255, 255, 255, 0.5)',
                        color: portfolioData.fontColor?.category?.web || '#00A3E0',
                        border: '1px solid #e5e7eb'
                      })
                    }}
                  >
                    <span style={{ 
                      fontSize: `${portfolioData.fontSize?.category?.web || 25}px`,
                      fontWeight: portfolioData.fontWeight?.category?.web || 500,
                      color: selectedCategory === category ? 'white' : (portfolioData.fontColor?.category?.web || '#00A3E0')
                    }}>
                      {category}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      ...(activeSection === "portfolio" && selectedCategory === category ? {
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
                  <h4 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.1px',
                    lineHeight: '1.4'
                  }}>
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

            {/* 로고 슬라이드 관리 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '1.5rem',
              marginTop: '1.5rem',
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  로고 슬라이드 관리
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['고객사', '파트너사', '속도조절', '메인문구'].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLogoSliderCategory(category);
                      setActiveSection("logoSlider");
                    }}
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
                      ...(activeSection === "logoSlider" && logoSliderCategory === category ? {
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                      } : {
                        background: 'rgba(255, 255, 255, 0.6)',
                        color: '#374151',
                        border: '1px solid rgba(229, 231, 235, 0.5)'
                      })
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== "logoSlider" || logoSliderCategory !== category) {
                        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== "logoSlider" || logoSliderCategory !== category) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.5)';
                      }
                    }}
                  >
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: activeSection === "logoSlider" && logoSliderCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'rgba(245, 158, 11, 0.1)',
                      color: activeSection === "logoSlider" && logoSliderCategory === category ? 'white' : '#f59e0b',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {index + 1}
                    </span>
                    {category}
                  </button>
                ))}
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
                    {activeSection === "portfolio" ? `${selectedCategory} 프로젝트 관리` : `${logoSliderCategory} 관리`}
                  </h3>
                </div>
                {isEditing && activeSection === "portfolio" && (
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

              {/* 로고 슬라이드 관리 콘텐츠 */}
              {activeSection === "logoSlider" && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem',
                transition: 'all 0.3s ease'
              }}>
                {logoSliderCategory === '고객사' && (
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                      고객사 로고 관리
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {Array.from({ length: 16 }, (_, i) => {
                        const logoNum = String(i + 1).padStart(2, "0");
                        return (
                          <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '1rem',
                            textAlign: 'center'
                          }}>
                            <img
                              src={`/고객사 & 파트너사_고화질/고객사${logoNum}.png`}
                              alt={`고객사${logoNum}`}
                              style={{
                                width: '100%',
                                height: '60px',
                                objectFit: 'contain',
                                marginBottom: '0.5rem'
                              }}
                            />
                            <p style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 0.5rem 0' }}>
                              고객사 {logoNum}
                            </p>
                            <button 
                              onClick={() => setShowLogoUpload({type: 'customer', index: i})}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.75rem',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}>
                              이미지 변경
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {logoSliderCategory === '파트너사' && (
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                      파트너사 로고 관리
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {Array.from({ length: 21 }, (_, i) => {
                        const logoNum = String(i + 1).padStart(2, "0");
                        return (
                          <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '1rem',
                            textAlign: 'center'
                          }}>
                            <img
                              src={`/고객사 & 파트너사_고화질/파트너사${logoNum}.png`}
                              alt={`파트너사${logoNum}`}
                              style={{
                                width: '100%',
                                height: '60px',
                                objectFit: 'contain',
                                marginBottom: '0.5rem'
                              }}
                            />
                            <p style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 0.5rem 0' }}>
                              파트너사 {logoNum}
                            </p>
                            <button 
                              onClick={() => setShowLogoUpload({type: 'partner', index: i})}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.75rem',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}>
                              이미지 변경
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {logoSliderCategory === '속도조절' && (
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                      슬라이드 속도 조절
                    </h4>
                    
                    {/* 웹 속도 설정 */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                        웹 속도 설정
                      </h5>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', minWidth: '100px' }}>
                          속도 (낮을수록 빠름)
                        </label>
                        <input
                          type="number"
                          value={logoSliderSettings.web.speed}
                          onChange={(e) => {
                            const newSettings = { ...logoSliderSettings };
                            newSettings.web.speed = parseInt(e.target.value) || 50;
                            setLogoSliderSettings(newSettings);
                          }}
                          style={{
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            background: 'white',
                            color: '#111827',
                            width: '120px'
                          }}
                        />
                      </div>
                    </div>

                    {/* 모바일 속도 설정 */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                        모바일 속도 설정
                      </h5>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', minWidth: '100px' }}>
                          속도 (낮을수록 빠름)
                        </label>
                        <input
                          type="number"
                          value={logoSliderSettings.mobile.speed}
                          onChange={(e) => {
                            const newSettings = { ...logoSliderSettings };
                            newSettings.mobile.speed = parseInt(e.target.value) || 300;
                            setLogoSliderSettings(newSettings);
                          }}
                          style={{
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            background: 'white',
                            color: '#111827',
                            width: '120px'
                          }}
                        />
                      </div>
                    </div>

                    {/* 저장 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button
                        onClick={() => saveLogoSliderSettings(logoSliderSettings)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: 'white',
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        속도 설정 저장
                      </button>
                    </div>
                  </div>
                )}

                {logoSliderCategory === '메인문구' && (
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                      메인 문구 설정
                    </h4>
                    
                    {/* 웹 텍스트 설정 */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                        웹 텍스트 설정
                      </h5>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            텍스트 색상
                          </label>
                          <input
                            type="color"
                            value={logoSliderSettings.web.textColor}
                            onChange={(e) => {
                              const newSettings = { ...logoSliderSettings };
                              newSettings.web.textColor = e.target.value;
                              setLogoSliderSettings(newSettings);
                            }}
                            style={{
                              width: '100%',
                              height: '40px',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            텍스트 크기 (px)
                          </label>
                          <input
                            type="number"
                            value={logoSliderSettings.web.textSize}
                            onChange={(e) => {
                              const newSettings = { ...logoSliderSettings };
                              newSettings.web.textSize = parseInt(e.target.value) || 40;
                              setLogoSliderSettings(newSettings);
                            }}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              outline: 'none',
                              fontSize: '0.875rem',
                              background: 'white',
                              color: '#111827',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 모바일 텍스트 설정 */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                        모바일 텍스트 설정
                      </h5>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            텍스트 색상
                          </label>
                          <input
                            type="color"
                            value={logoSliderSettings.mobile.textColor}
                            onChange={(e) => {
                              const newSettings = { ...logoSliderSettings };
                              newSettings.mobile.textColor = e.target.value;
                              setLogoSliderSettings(newSettings);
                            }}
                            style={{
                              width: '100%',
                              height: '40px',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            텍스트 크기 (px)
                          </label>
                          <input
                            type="number"
                            value={logoSliderSettings.mobile.textSize}
                            onChange={(e) => {
                              const newSettings = { ...logoSliderSettings };
                              newSettings.mobile.textSize = parseInt(e.target.value) || 23;
                              setLogoSliderSettings(newSettings);
                            }}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              outline: 'none',
                              fontSize: '0.875rem',
                              background: 'white',
                              color: '#111827',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 저장 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button
                        onClick={() => saveLogoSliderSettings(logoSliderSettings)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: 'white',
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        텍스트 설정 저장
                      </button>
                    </div>
                  </div>
                )}
              </div>
              )}

              {/* 프로젝트 목록 */}
              {activeSection === "portfolio" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {portfolioData.projects.filter(project => project.category === selectedCategory).map((project, projectIndex) => (
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
                        <h4 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: '700', 
                          color: '#1f2937', 
                          margin: 0,
                          letterSpacing: '-0.2px',
                          lineHeight: '1.3'
                        }}>
                          프로젝트 {projectIndex + 1}
                        </h4>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveProject(project.id)}
                          style={{
                            padding: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#dc2626',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: '#374151', 
                          marginBottom: '0.5rem',
                          letterSpacing: '-0.1px',
                          lineHeight: '1.4'
                        }}>
                          프로젝트명
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: '#374151', 
                          marginBottom: '0.5rem',
                          letterSpacing: '-0.1px',
                          lineHeight: '1.4'
                        }}>
                          카테고리
                        </label>
                        <select
                          value={project.category}
                          onChange={(e) => handleUpdateProject(project.id, 'category', e.target.value)}
                          disabled={!isEditing}
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            background: !isEditing ? '#f9fafb' : 'white',
                            color: !isEditing ? '#6b7280' : '#111827',
                            boxSizing: 'border-box'
                          }}
                        >
                          {portfolioData.categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        설명
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        이미지 경로
                      </label>
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleUpdateProject(project.id, 'image', e.target.value)}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.875rem',
                          background: !isEditing ? '#f9fafb' : 'white',
                          color: !isEditing ? '#6b7280' : '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                      {project.image && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            style={{
                              width: '100%',
                              maxWidth: '300px',
                              height: '200px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb'
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 새 프로젝트 추가 폼 */}
            {showAddForm && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '1rem',
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
                        padding: '0.5rem 0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        background: 'white',
                        color: '#111827',
                        boxSizing: 'border-box'
                      }}
                      placeholder="프로젝트명을 입력하세요"
                    />
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
                        padding: '0.5rem 0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        background: 'white',
                        color: '#111827',
                        boxSizing: 'border-box'
                      }}
                      placeholder="프로젝트 설명을 입력하세요"
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
                        padding: '0.5rem 0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        background: 'white',
                        color: '#111827',
                        boxSizing: 'border-box'
                      }}
                    >
                      {portfolioData.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
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
                        padding: '0.5rem 0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        background: 'white',
                        color: '#111827',
                        boxSizing: 'border-box'
                      }}
                      placeholder="/portfolio_photo/이미지명.jpg"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={handleAddProject}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'white',
                        background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      추가
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        background: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
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