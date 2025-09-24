// src/pages/admin/AdminDashboard.tsx
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const menuItems = [
    {
      title: '홈 페이지 관리',
      description: '메인 타이핑 텍스트, 버튼 섹션 관리',
      link: '/admin/home',
      icon: '🏠',
      color: 'bg-blue-500'
    },
    {
      title: 'About 페이지 관리',
      description: '회사 소개, 탭별 카드 내용 관리',
      link: '/admin/about',
      icon: '📋',
      color: 'bg-green-500'
    },
    {
      title: '포트폴리오 관리',
      description: '프로젝트 목록, 카테고리 관리',
      link: '/admin/portfolio',
      icon: '💼',
      color: 'bg-purple-500'
    },
    {
      title: 'Contact 페이지 관리',
      description: '문구, 연락처 정보 관리',
      link: '/admin/contact',
      icon: '📞',
      color: 'bg-orange-500'
    },
    {
      title: '파일 관리',
      description: '이미지, PDF 파일 업로드 및 관리',
      link: '/admin/assets',
      icon: '📁',
      color: 'bg-gray-500'
    },
    {
      title: '사이트 설정',
      description: '헤더, 푸터, 색상 테마 관리',
      link: '/admin/settings',
      icon: '⚙️',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              관리자 대시보드
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">관리자님 환영합니다</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/admin/login';
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            사이트 관리
          </h2>
          <p className="text-gray-600">
            각 섹션을 클릭하여 콘텐츠를 수정할 수 있습니다.
          </p>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.color} text-white rounded-lg p-3 text-2xl`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 최근 활동 (추후 구현) */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            최근 활동
          </h3>
          <div className="text-sm text-gray-500">
            최근 변경사항이 여기에 표시됩니다.
          </div>
        </div>
      </main>
    </div>
  );
}
