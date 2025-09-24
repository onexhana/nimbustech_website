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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/dashboard"
                className="text-blue-600 hover:text-blue-800"
              >
                ← 대시보드로 돌아가기
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                파일 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                파일 업로드
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 파일 업로드 폼 */}
        {showUploadForm && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              새 파일 업로드
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파일명
                </label>
                <input
                  type="text"
                  value={newFile.name}
                  onChange={(e) => setNewFile({...newFile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="파일명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <select
                  value={newFile.category}
                  onChange={(e) => setNewFile({...newFile, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="로고">로고</option>
                  <option value="팝업이미지">팝업이미지</option>
                  <option value="포트폴리오">포트폴리오</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                업로드
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 카테고리 필터 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                카테고리
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 이미지 파일 목록 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                이미지 파일 ({filteredImages.length}개)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map((image) => (
                  <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {/* 이미지 미리보기 */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={image.path} 
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs hidden">
                            이미지 없음
                          </div>
                        </div>
                      </div>
                      
                      {/* 파일 정보 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {image.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {image.category} • {image.size}
                        </p>
                        <p className="text-xs text-gray-400">
                          {image.uploadDate}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <a
                            href={image.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            미리보기
                          </a>
                          <button
                            onClick={() => removeFile(image.id, 'image')}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PDF 파일 목록 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            PDF 파일 ({assetsData.pdfs.length}개)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetsData.pdfs.map((pdf) => (
              <div key={pdf.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {/* PDF 아이콘 */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* 파일 정보 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {pdf.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      PDF • {pdf.size}
                    </p>
                    <p className="text-xs text-gray-400">
                      {pdf.uploadDate}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <a
                        href={pdf.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        미리보기
                      </a>
                      <button
                        onClick={() => removeFile(pdf.id, 'pdf')}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              총 파일 수
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {assetsData.images.length + assetsData.pdfs.length}
            </p>
            <p className="text-sm text-gray-500">
              이미지 {assetsData.images.length}개, PDF {assetsData.pdfs.length}개
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              총 용량
            </h3>
            <p className="text-3xl font-bold text-green-600">
              15.6MB
            </p>
            <p className="text-sm text-gray-500">
              평균 파일 크기: 1.2MB
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              최근 업로드
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              3일 전
            </p>
            <p className="text-sm text-gray-500">
              마지막 업로드: {assetsData.pdfs[0]?.uploadDate}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
