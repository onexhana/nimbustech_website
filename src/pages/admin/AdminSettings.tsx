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
                사이트 설정
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 탭 네비게이션 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                설정 카테고리
              </h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 설정 폼 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {tabs.find(tab => tab.id === activeTab)?.name} 설정
              </h3>

              {/* 사이트 정보 설정 */}
              {activeTab === "site" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사이트 제목
                    </label>
                    <input
                      type="text"
                      value={settingsData.site.title}
                      onChange={(e) => updateSetting('site', 'title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사이트 설명
                    </label>
                    <textarea
                      value={settingsData.site.description}
                      onChange={(e) => updateSetting('site', 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      키워드 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={settingsData.site.keywords}
                      onChange={(e) => updateSetting('site', 'keywords', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* 헤더 설정 */}
              {activeTab === "header" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      로고 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.header.logo}
                      onChange={(e) => updateSetting('header', 'logo', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        메뉴 항목
                      </label>
                      {isEditing && (
                        <button
                          onClick={addMenuItem}
                          className="px-3 py-1 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                        >
                          메뉴 추가
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {settingsData.header.menuItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                              disabled={!isEditing}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                              placeholder="메뉴명"
                            />
                            <input
                              type="text"
                              value={item.link}
                              onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                              disabled={!isEditing}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                              placeholder="링크"
                            />
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => removeMenuItem(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              삭제
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      로고 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.logo}
                      onChange={(e) => updateSetting('footer', 'logo', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배지 이미지 경로
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.badge}
                      onChange={(e) => updateSetting('footer', 'badge', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      회사명
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.companyName}
                      onChange={(e) => updateSetting('footer', 'companyName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      저작권 정보
                    </label>
                    <input
                      type="text"
                      value={settingsData.footer.copyright}
                      onChange={(e) => updateSetting('footer', 'copyright', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* 테마 설정 */}
              {activeTab === "theme" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        메인 색상
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsData.theme.primaryColor}
                          onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-12 h-10 border border-gray-300 rounded-md disabled:opacity-50"
                        />
                        <input
                          type="text"
                          value={settingsData.theme.primaryColor}
                          onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보조 색상
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsData.theme.secondaryColor}
                          onChange={(e) => updateSetting('theme', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-12 h-10 border border-gray-300 rounded-md disabled:opacity-50"
                        />
                        <input
                          type="text"
                          value={settingsData.theme.secondaryColor}
                          onChange={(e) => updateSetting('theme', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        배경 색상
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsData.theme.backgroundColor}
                          onChange={(e) => updateSetting('theme', 'backgroundColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-12 h-10 border border-gray-300 rounded-md disabled:opacity-50"
                        />
                        <input
                          type="text"
                          value={settingsData.theme.backgroundColor}
                          onChange={(e) => updateSetting('theme', 'backgroundColor', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        텍스트 색상
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsData.theme.textColor}
                          onChange={(e) => updateSetting('theme', 'textColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-12 h-10 border border-gray-300 rounded-md disabled:opacity-50"
                        />
                        <input
                          type="text"
                          value={settingsData.theme.textColor}
                          onChange={(e) => updateSetting('theme', 'textColor', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO 설정 */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Open Graph 제목
                    </label>
                    <input
                      type="text"
                      value={settingsData.seo.ogTitle}
                      onChange={(e) => updateSetting('seo', 'ogTitle', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Open Graph 설명
                    </label>
                    <textarea
                      value={settingsData.seo.ogDescription}
                      onChange={(e) => updateSetting('seo', 'ogDescription', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Open Graph 이미지
                    </label>
                    <input
                      type="text"
                      value={settingsData.seo.ogImage}
                      onChange={(e) => updateSetting('seo', 'ogImage', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Card 타입
                    </label>
                    <select
                      value={settingsData.seo.twitterCard}
                      onChange={(e) => updateSetting('seo', 'twitterCard', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            설정 미리보기
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-sm text-gray-600">
              <p><strong>사이트 제목:</strong> {settingsData.site.title}</p>
              <p><strong>메인 색상:</strong> 
                <span 
                  className="inline-block w-4 h-4 rounded ml-2" 
                  style={{ backgroundColor: settingsData.theme.primaryColor }}
                ></span>
                {settingsData.theme.primaryColor}
              </p>
              <p><strong>메뉴 항목:</strong> {settingsData.header.menuItems.map(item => item.label).join(', ')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
