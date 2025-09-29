// src/pages/admin/AdminAssets.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHomeData } from '../../context/HomeContext';

export default function AdminAssets() {
  const { homeData, updateButtonData } = useHomeData();
  // Mock 데이터 (나중에 API로 교체)
  const [assetsData, setAssetsData] = useState({
    images: [
      // 로고 이미지
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
        name: "logo.png",
        path: "/logo/logo.png",
        category: "로고",
        size: "1.8MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 4,
        name: "logo_white.png",
        path: "/logo/logo_white.png",
        category: "로고",
        size: "1.9MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 5,
        name: "logo-blue.png",
        path: "/logo/logo-blue.png",
        category: "로고",
        size: "1.7MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 6,
        name: "cloud-blue.png",
        path: "/logo/cloud-blue.png",
        category: "로고",
        size: "1.5MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 7,
        name: "cloud-white.png",
        path: "/logo/cloud-white.png",
        category: "로고",
        size: "1.4MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 8,
        name: "nimbuetech-blue.png",
        path: "/logo/nimbuetech-blue.png",
        category: "로고",
        size: "2.0MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 9,
        name: "nimbuetech-white.png",
        path: "/logo/nimbuetech-white.png",
        category: "로고",
        size: "1.9MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 10,
        name: "fcs_logo.png",
        path: "/logo/fcs_logo.png",
        category: "로고",
        size: "1.6MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 11,
        name: "2022_special.png",
        path: "/logo/2022_special.png",
        category: "로고",
        size: "2.2MB",
        uploadDate: "2024-01-15"
      },
      {
        id: 12,
        name: "vite.svg",
        path: "/logo/vite.svg",
        category: "로고",
        size: "0.3MB",
        uploadDate: "2024-01-15"
      },
      
      // 팝업 이미지
      {
        id: 13,
        name: "Mission&Vision.jpg",
        path: "/popup_image/Mission&Vision.jpg",
        category: "홈버튼",
        size: "1.8MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 14,
        name: "Core Values.png",
        path: "/popup_image/Core Values.png",
        category: "홈버튼",
        size: "2.2MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 15,
        name: "Employee Benefits.jpg",
        path: "/popup_image/Employee Benefits.jpg",
        category: "홈버튼",
        size: "2.0MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 16,
        name: "Way of Working.jpg",
        path: "/popup_image/Way of Working.jpg",
        category: "홈버튼",
        size: "1.9MB",
        uploadDate: "2024-01-20"
      },
      
      // 모바일 팝업 이미지
      {
        id: 17,
        name: "Mission&Vision_mobile.png",
        path: "/popup_image_mobile/Mission&Vision_mobile.png",
        category: "홈버튼",
        size: "1.5MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 18,
        name: "Core Values_mobile.png",
        path: "/popup_image_mobile/Core Values_mobile.png",
        category: "홈버튼",
        size: "1.7MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 19,
        name: "Employee Benefits_mobile.png",
        path: "/popup_image_mobile/Employee Benefits_mobile.png",
        category: "홈버튼",
        size: "1.6MB",
        uploadDate: "2024-01-20"
      },
      {
        id: 20,
        name: "Way of Working_mobile.png",
        path: "/popup_image_mobile/Way of Working_mobile.png",
        category: "홈버튼",
        size: "1.4MB",
        uploadDate: "2024-01-20"
      },
      
      // 포트폴리오 이미지 - 공공 카테고리
      {
        id: 21,
        name: "공공_다산콜센터.jpg",
        path: "/portfolio_photo/공공_다산콜센터.jpg",
        category: "포트폴리오",
        size: "3.1MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 22,
        name: "공공_중구청.jpg",
        path: "/portfolio_photo/공공_중구청.jpg",
        category: "포트폴리오",
        size: "2.8MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 23,
        name: "공공_범정부.png",
        path: "/portfolio_photo/공공_범정부.png",
        category: "포트폴리오",
        size: "2.5MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 24,
        name: "공공_정보시스템.png",
        path: "/portfolio_photo/공공_정보시스템.png",
        category: "포트폴리오",
        size: "2.7MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 25,
        name: "공공_국방데이터센터.jpg",
        path: "/portfolio_photo/공공_국방데이터센터.jpg",
        category: "포트폴리오",
        size: "3.0MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 26,
        name: "공공_국민연금.jpg",
        path: "/portfolio_photo/공공_국민연금.jpg",
        category: "포트폴리오",
        size: "2.9MB",
        uploadDate: "2024-01-25"
      },
      
      // 포트폴리오 이미지 - 금융 카테고리
      {
        id: 27,
        name: "금융_신한금융투자.jpg",
        path: "/portfolio_photo/금융_신한금융투자.jpg",
        category: "포트폴리오",
        size: "2.6MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 28,
        name: "금융_메트라이프금융서비스.jpg",
        path: "/portfolio_photo/금융_메트라이프금융서비스.jpg",
        category: "포트폴리오",
        size: "2.4MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 29,
        name: "금융_미래에셋.jpg",
        path: "/portfolio_photo/금융_미래에셋.jpg",
        category: "포트폴리오",
        size: "2.3MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 30,
        name: "금융_하나은행.jpg",
        path: "/portfolio_photo/금융_하나은행.jpg",
        category: "포트폴리오",
        size: "2.8MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 31,
        name: "금융_AIA생명.jpg",
        path: "/portfolio_photo/금융_AIA생명.jpg",
        category: "포트폴리오",
        size: "2.5MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 32,
        name: "금융_한국투자증권.jpg",
        path: "/portfolio_photo/금융_한국투자증권.jpg",
        category: "포트폴리오",
        size: "2.7MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 33,
        name: "금융_메트라이프.jpg",
        path: "/portfolio_photo/금융_메트라이프.jpg",
        category: "포트폴리오",
        size: "2.4MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 34,
        name: "금융_DB생명보험.jpg",
        path: "/portfolio_photo/금융_DB생명보험.jpg",
        category: "포트폴리오",
        size: "2.6MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 35,
        name: "금융_국민카드.png",
        path: "/portfolio_photo/금융_국민카드.png",
        category: "포트폴리오",
        size: "2.2MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 36,
        name: "금융_ACE.jpg",
        path: "/portfolio_photo/금융_ACE.jpg",
        category: "포트폴리오",
        size: "2.3MB",
        uploadDate: "2024-01-25"
      },
      
      // 포트폴리오 이미지 - 일반/제조 카테고리
      {
        id: 37,
        name: "일반_삼성전자.jpg",
        path: "/portfolio_photo/일반_삼성전자.jpg",
        category: "포트폴리오",
        size: "2.9MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 38,
        name: "일반_태평양물산.png",
        path: "/portfolio_photo/일반_태평양물산.png",
        category: "포트폴리오",
        size: "2.1MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 39,
        name: "일반_LG.jpg",
        path: "/portfolio_photo/일반_LG.jpg",
        category: "포트폴리오",
        size: "2.8MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 40,
        name: "일반_태양광.jpg",
        path: "/portfolio_photo/일반_태양광.jpg",
        category: "포트폴리오",
        size: "2.7MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 41,
        name: "일반_CJ.jpg",
        path: "/portfolio_photo/일반_CJ.jpg",
        category: "포트폴리오",
        size: "2.6MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 42,
        name: "일반_강원랜드.jpg",
        path: "/portfolio_photo/일반_강원랜드.jpg",
        category: "포트폴리오",
        size: "2.5MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 43,
        name: "일반_한국신용정보원.jpg",
        path: "/portfolio_photo/일반_한국신용정보원.jpg",
        category: "포트폴리오",
        size: "2.4MB",
        uploadDate: "2024-01-25"
      },
      {
        id: 44,
        name: "일반_현대.jpg",
        path: "/portfolio_photo/일반_현대.jpg",
        category: "포트폴리오",
        size: "2.8MB",
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
  const [showImageUpload, setShowImageUpload] = useState(null);
  const [showPdfUpload, setShowPdfUpload] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [newFile, setNewFile] = useState({
    name: "",
    category: "로고",
    type: "image"
  });

  const categories = ["전체", "로고", "홈버튼", "포트폴리오", "PDF"];

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

  const updateImage = (id: number, updatedData: any) => {
    const updatedImages = assetsData.images.map(img => 
      img.id === id ? { ...img, ...updatedData } : img
    );
    
    setAssetsData({
      ...assetsData,
      images: updatedImages
    });

    // 홈버튼 이미지인 경우 HomeContext도 함께 업데이트
    const updatedImage = updatedImages.find(img => img.id === id);
    if (updatedImage && updatedImage.category === "홈버튼") {
      // 홈버튼 이미지 ID와 HomeContext 버튼 인덱스 매핑
      const buttonIndexMap: { [key: number]: number } = {
        13: 0, // Mission&Vision
        14: 1, // Core Values  
        15: 2, // Way of Working
        16: 3, // Employee Benefits
        17: 0, // Mission&Vision_mobile
        18: 1, // Core Values_mobile
        19: 2, // Way of Working_mobile
        20: 3  // Employee Benefits_mobile
      };

      const buttonIndex = buttonIndexMap[id];
      if (buttonIndex !== undefined) {
        updateButtonData(buttonIndex, { imagePath: updatedImage.path });
      }
    }

    alert('이미지 정보가 업데이트되었습니다!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (imageId: number) => {
    if (uploadedImage) {
      const updatedData = {
        path: uploadedImage,
        size: "업로드됨"
      };
      updateImage(imageId, updatedData);
      setShowImageUpload(null);
      setUploadedImage(null);
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPdf(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updatePdf = (id: number, updatedData: any) => {
    setAssetsData({
      ...assetsData,
      pdfs: assetsData.pdfs.map(pdf => 
        pdf.id === id ? { ...pdf, ...updatedData } : pdf
      )
    });
    alert('PDF 파일이 업데이트되었습니다!');
  };

  const handlePdfChange = (pdfId: number) => {
    if (uploadedPdf) {
      const updatedData = {
        path: uploadedPdf,
        size: "업로드됨"
      };
      updatePdf(pdfId, updatedData);
      setShowPdfUpload(null);
      setUploadedPdf(null);
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
                  <option value="홈버튼">홈버튼</option>
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


        {/* 이미지 업로드 모달 */}
        {showImageUpload && (
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
                이미지 업로드
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 현재 이미지 미리보기 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  현재 이미지
                </label>
                <div style={{
                  width: '200px',
                  height: '150px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={showImageUpload.path} 
                    alt="현재 이미지" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain' 
                    }}
                  />
                </div>
              </div>

              {/* 새 이미지 업로드 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  새 이미지 업로드
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    width: '100%',
                    maxWidth: '650px',
                    padding: '0.5rem 0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white',
                    color: '#111827'
                  }}
                />
              </div>

              {/* 업로드된 이미지 미리보기 */}
              {uploadedImage && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    업로드된 이미지 미리보기
                  </label>
                  <div style={{
                    width: '200px',
                    height: '150px',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={uploadedImage} 
                      alt="업로드된 이미지" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain' 
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 이미지 경로 직접 입력 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  또는 이미지 경로 직접 입력
                </label>
                <input
                  type="text"
                  value={showImageUpload.path}
                  onChange={(e) => setShowImageUpload({...showImageUpload, path: e.target.value})}
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
                  placeholder="이미지 경로를 입력하세요"
                />
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', margin: 0 }}>
                  이미지 경로를 직접 입력하거나 위의 파일 선택으로 이미지를 업로드하세요
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setShowImageUpload(null);
                  setUploadedImage(null);
                }}
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
                onClick={() => handleImageChange(showImageUpload.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                이미지 변경
              </button>
            </div>
          </div>
        )}

        {/* PDF 업로드 모달 */}
        {showPdfUpload && (
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
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
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
                PDF 파일 업로드
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 현재 PDF 정보 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  현재 PDF 파일
                </label>
                <div style={{
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  background: '#f9fafb'
                }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                    <strong>파일명:</strong> {showPdfUpload.name}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                    <strong>크기:</strong> {showPdfUpload.size}
                  </p>
                </div>
              </div>

              {/* 새 PDF 업로드 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  새 PDF 파일 업로드
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  style={{
                    width: '100%',
                    maxWidth: '650px',
                    padding: '0.5rem 0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white',
                    color: '#111827'
                  }}
                />
              </div>

              {/* 업로드된 PDF 정보 */}
              {uploadedPdf && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    업로드된 PDF 파일
                  </label>
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #ef4444',
                    borderRadius: '8px',
                    background: '#fef2f2'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#dc2626' }}>
                      ✅ 새 PDF 파일이 업로드되었습니다
                    </p>
                  </div>
                </div>
              )}

              {/* PDF 경로 직접 입력 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  또는 PDF 경로 직접 입력
                </label>
                <input
                  type="text"
                  value={showPdfUpload.path}
                  onChange={(e) => setShowPdfUpload({...showPdfUpload, path: e.target.value})}
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
                  placeholder="PDF 파일 경로를 입력하세요"
                />
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', margin: 0 }}>
                  PDF 파일 경로를 직접 입력하거나 위의 파일 선택으로 PDF를 업로드하세요
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setShowPdfUpload(null);
                  setUploadedPdf(null);
                }}
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
                onClick={() => handlePdfChange(showPdfUpload.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                PDF 변경
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
              transition: 'all 0.3s ease',
              position: 'sticky',
              top: '100px',
              zIndex: 5
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
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
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
                            {pdf.name}
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
                          <button
                            onClick={() => setShowPdfUpload(pdf)}
                            style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: 'white',
                              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            PDF 변경
                          </button>
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
                            {image.name}
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
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
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
                              {image.uploadDate}
                            </div>
                          </div>
                          {image.description && (
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                                설명
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
                                {image.description}
                              </div>
                            </div>
                          )}
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
                          <button
                            onClick={() => setShowImageUpload(image)}
                            style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: 'white',
                              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            이미지 변경
                          </button>
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
              98.2MB
            </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
              평균 파일 크기: 2.1MB
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
