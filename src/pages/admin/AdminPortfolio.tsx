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
                포트폴리오 관리
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
          {/* 카테고리 관리 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                카테고리 관리
              </h3>
              <div className="space-y-2">
                {portfolioData.categories.map((category, index) => (
                  <button
                    key={index}
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
              
              {isEditing && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    새 카테고리 추가
                  </h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="카테고리명"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <button className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                      추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 프로젝트 목록 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCategory} 프로젝트 ({filteredProjects.length}개)
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                  >
                    프로젝트 추가
                  </button>
                )}
              </div>

              {/* 새 프로젝트 추가 폼 */}
              {showAddForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">새 프로젝트 추가</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        프로젝트명
                      </label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="프로젝트명을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {portfolioData.categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <input
                        type="text"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="프로젝트 설명을 입력하세요"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이미지 경로
                      </label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="/portfolio_photo/이미지명.jpg"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={addProject}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>
                </div>
              )}

              {/* 프로젝트 목록 */}
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      {/* 이미지 미리보기 */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              이미지 없음
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* 프로젝트 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              프로젝트명
                            </label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              카테고리
                            </label>
                            <select
                              value={project.category}
                              onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            >
                              {portfolioData.categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              설명
                            </label>
                            <input
                              type="text"
                              value={project.description}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              이미지 경로
                            </label>
                            <input
                              type="text"
                              value={project.image}
                              onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* 삭제 버튼 */}
                      {isEditing && (
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => removeProject(project.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
