// src/pages/admin/AdminHome.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  // Mock 데이터 (나중에 API로 교체)
  const [homeData, setHomeData] = useState({
    typingTexts: [
      '고객을 빛나게',
      '구성원을 빛나게', 
      '미래를 빛나게',
      'NIMBUS TECH'
    ],
    buttonData: [
      {
        title: "Mission&Vision",
        subtitle: "미션&비전",
        description: "우리의 존재 이유와\n향하는 미래를 담습니다.",
        imagePath: "/popup_image/Mission&Vision.jpg"
      },
      {
        title: "Core Values",
        subtitle: "핵심가치",
        description: "고객과 함께 성장하는\n신뢰·책임·전문성의 가치",
        imagePath: "/popup_image/Core%20Values.png"
      },
      {
        title: "Way of Working",
        subtitle: "일하는 방식",
        description: '모든 일의 궁극적인 목적은\n"고객창출" 곧 "고객성공"이다!',
        imagePath: "/popup_image/Way%20of%20Working.jpg"
      },
      {
        title: "Employee Benefits",
        subtitle: "복지 혜택",
        description: "최고의 열정과 패기를 갖춘\n인재들과 함께 일하고 성장하는 기업",
        imagePath: "/popup_image/Employee%20Benefits.jpg"
      }
    ],
    sliderText: "LEADING CUSTOMER SUCCESS"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // 나중에 API 호출로 교체
    console.log('저장된 데이터:', homeData);
    setIsEditing(false);
    alert('저장되었습니다!');
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
                홈 페이지 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    저장
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  편집
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 타이핑 텍스트 편집 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              메인 타이핑 텍스트
            </h3>
            <div className="space-y-4">
              {homeData.typingTexts.map((text, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {index + 1}번째 줄
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      const newTexts = [...homeData.typingTexts];
                      newTexts[index] = e.target.value;
                      setHomeData({...homeData, typingTexts: newTexts});
                    }}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 섹션 편집 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              홈 버튼 섹션
            </h3>
            <div className="space-y-4">
              {homeData.buttonData.map((button, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    버튼 {index + 1}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제목 (영문)
                      </label>
                      <input
                        type="text"
                        value={button.title}
                        onChange={(e) => {
                          const newButtons = [...homeData.buttonData];
                          newButtons[index].title = e.target.value;
                          setHomeData({...homeData, buttonData: newButtons});
                        }}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        부제목 (한글)
                      </label>
                      <input
                        type="text"
                        value={button.subtitle}
                        onChange={(e) => {
                          const newButtons = [...homeData.buttonData];
                          newButtons[index].subtitle = e.target.value;
                          setHomeData({...homeData, buttonData: newButtons});
                        }}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <textarea
                        value={button.description}
                        onChange={(e) => {
                          const newButtons = [...homeData.buttonData];
                          newButtons[index].description = e.target.value;
                          setHomeData({...homeData, buttonData: newButtons});
                        }}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이더 텍스트 편집 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              무한 슬라이더 텍스트
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                슬라이더 텍스트
              </label>
              <input
                type="text"
                value={homeData.sliderText}
                onChange={(e) => setHomeData({...homeData, sliderText: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="LEADING CUSTOMER SUCCESS"
              />
            </div>
          </div>

          {/* 미리보기 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              미리보기
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-right">
                {homeData.typingTexts.map((text, index) => (
                  <div key={index} className="text-2xl font-bold text-gray-800 mb-1">
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                슬라이더: {homeData.sliderText}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
