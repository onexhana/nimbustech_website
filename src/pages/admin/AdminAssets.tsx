// src/pages/admin/AdminAssets.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminAssets() {
  // Mock 데이터 (나중에 API로 교체)
  const [assetsData, setAssetsData] = useState({
    images: [
      {
        id: 1,
        name: "logo-blue-wide.png",
        path: "/logo/logo-blue-wide.png",
        category: "로고",
        size: "2.3MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 2,
        name: "logo-white-wide.png", 
        path: "/logo/logo-white-wide.png",
        category: "로고",
        size: "2.1MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 3,
        name: "Mission&Vision.jpg",
        path: "/popup_image/Mission&Vision.jpg",
        category: "팝업이미지",
        size: "1.8MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 4,
        name: "Core Values.png",
        path: "/popup_image/Core Values.png",
        category: "팝업이미지",
        size: "2.2MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 5,
        name: "공공_다산콜센터.jpg",
        path: "/portfolio_photo/공공_다산콜센터.jpg",
        category: "포트폴리오",
        size: "3.1MB",
        uploadDate: "2024-01-25"
      }
    ],
    pdfs: [
      {
        id: 1,
        name: "님버스테크 회사소개_v3.5_20250923.pdf",
        path: "/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf",
        size: "5.2MB",
        uploadDate: "2024-09-23"
      },
      {
        id: 2,
        name: "개인정보 처리방침_v1.0.pdf",
        path: "/footer_pdf/개인정보 처리방침_v1.0.pdf",
        size: "0.8MB",
        uploadDate: "2024-01-10"
      }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newFile, setNewFile] = useState({
    name: "",
    category: "로고",
    type: "image"
  });

  const categories = ["전체", "로고", "팝업이미지", "포트폴리오", "PDF"];

  const filteredImages = selectedCategory === "전체" 
    ? assetsData.images 
    : assetsData.images.filter(img => img.category === selectedCategory);

  const handleFileUpload = () => {
    // 실제 구현에서는 파일 업로드 API 호출
    const newId = Math.max(...assetsData.images.map(img => img.id)) + 1;
    const newImage = {
      id: newId,
      name: newFile.name,
      path: `/${newFile.category.toLowerCase()}/${newFile.name}`,
      category: newFile.category,
      size: "0MB",
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setAssetsData({
      ...assetsData,
      images: [...assetsData.images, newImage]
    });

    setNewFile({ name: "", category: "로고", type: "image" });
    setShowUploadForm(false);
    alert('파일이 업로드되었습니다!');
  };

  const removeFile = (id: number, type: 'image' | 'pdf') => {
    if (type === 'image') {
      setAssetsData({
        ...assetsData,
        images: assetsData.images.filter(img => img.id !== id)
      });
    } else {
      setAssetsData({
        ...assetsData,
        pdfs: assetsData.pdfs.filter(pdf => pdf.id !== id)
      });
    }
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                파일 관리
              </h1>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>이미지와 문서를 관리하세요</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setShowUploadForm(true)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>파일 업로드</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* 파일 업로드 폼 */}
        {showUploadForm && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.5rem',
            marginBottom: '2rem',
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              새 파일 업로드
            </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  파일명
                </label>
                <input
                  type="text"
                  value={newFile.name}
                  onChange={(e) => setNewFile({...newFile, name: e.target.value})}
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
                  placeholder="파일명을 입력하세요"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  카테고리
                </label>
                <select
                  value={newFile.category}
                  onChange={(e) => setNewFile({...newFile, category: e.target.value})}
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
                  <option value="로고">로고</option>
                  <option value="팝업이미지">팝업이미지</option>
                  <option value="포트폴리오">포트폴리오</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => setShowUploadForm(false)}
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
                onClick={handleFileUpload}
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
                업로드
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* 카테고리 필터 */}
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
                {categories.map((category) => {
                  const count = category === "전체" 
                    ? assetsData.images.length + assetsData.pdfs.length
                    : category === "PDF"
                    ? assetsData.pdfs.length
                    : assetsData.images.filter(img => img.category === category).length;
                  
                  return (
                  <button
                    key={category}
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
                        {count}
                      </span>
                  </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 파일 목록 */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                  {selectedCategory === "전체" ? "전체 파일" : selectedCategory === "PDF" ? "PDF 파일" : "이미지 파일"} 관리
              </h3>
              </div>

              {/* 파일 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedCategory === "PDF" ? (
                  assetsData.pdfs.map((pdf, index) => (
                    <div key={pdf.id} style={{
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
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                          </div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                            PDF {index + 1}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFile(pdf.id, 'pdf')}
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
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            파일명
                          </label>
                          <div style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            background: '#f9fafb',
                            color: '#6b7280',
                            boxSizing: 'border-box'
                          }}>
                            {pdf.name}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                              파일 크기
                            </label>
                            <div style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              background: '#f9fafb',
                              color: '#6b7280',
                              boxSizing: 'border-box'
                            }}>
                              {pdf.size}
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                              업로드 날짜
                            </label>
                            <div style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              background: '#f9fafb',
                              color: '#6b7280',
                              boxSizing: 'border-box'
                            }}>
                              {pdf.uploadDate}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <a
                            href={pdf.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: 'white',
                              background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            미리보기
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  filteredImages.map((image, index) => (
                    <div key={image.id} style={{
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
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{index + 1}</span>
                          </div>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                            이미지 {index + 1}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFile(image.id, 'image')}
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
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            파일명
                          </label>
                          <div style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            background: '#f9fafb',
                            color: '#6b7280',
                            boxSizing: 'border-box'
                          }}>
                            {image.name}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                              카테고리
                            </label>
                            <div style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              background: '#f9fafb',
                              color: '#6b7280',
                              boxSizing: 'border-box'
                            }}>
                              {image.category}
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                              파일 크기
                            </label>
                            <div style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              background: '#f9fafb',
                              color: '#6b7280',
                              boxSizing: 'border-box'
                            }}>
                              {image.size}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            업로드 날짜
                          </label>
                          <div style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            background: '#f9fafb',
                            color: '#6b7280',
                            boxSizing: 'border-box'
                          }}>
                            {image.uploadDate}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <a
                            href={image.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: 'white',
                              background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            미리보기
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
              파일 관리 통계
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
                파일 관리 현황
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', margin: 0 }}>
                총 {assetsData.images.length + assetsData.pdfs.length}개 파일 관리 중
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
                  파일 통계
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
                    실시간 업데이트
                  </span>
          </div>
        </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <h5 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', fontSize: '0.875rem', margin: 0 }}>
                    총 파일 수
                  </h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                    {assetsData.images.length + assetsData.pdfs.length}개
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
              이미지 {assetsData.images.length}개, PDF {assetsData.pdfs.length}개
            </p>
          </div>
          
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <h5 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', fontSize: '0.875rem', margin: 0 }}>
                    총 용량
                  </h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
              15.6MB
            </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
              평균 파일 크기: 1.2MB
            </p>
          </div>
          
                <div style={{
                  background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)'
                }}>
                  <h5 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', fontSize: '0.875rem', margin: 0 }}>
              최근 업로드
                  </h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7', margin: 0 }}>
              3일 전
            </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
              마지막 업로드: {assetsData.pdfs[0]?.uploadDate}
            </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
