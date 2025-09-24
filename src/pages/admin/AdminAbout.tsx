// src/pages/admin/AdminAbout.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminAbout() {
  // Mock 데이터 (나중에 API로 교체)
  const [aboutData, setAboutData] = useState({
    mainTitle: "고객 성공 리딩",
    subtitle: "신뢰성 높은 DT 서비스를 제공합니다.",
    tabs: [
      {
        name: "ITO",
        cards: [
          {
            title: "풍부한 인재 자원",
            description: [
              "5,500명 이상의 IT 전문가",
              "데이터베이스 보유"
            ]
          },
          {
            title: "검증된 신뢰성",
            description: [
              "주요 파트너사와 8년 이상의",
              "지속적 협력 관계"
            ]
          },
          {
            title: "체계적 인재 매칭",
            description: [
              "CRM 기반 전담 매니저 배치로",
              "최적화된 인재 선별"
            ]
          }
        ]
      },
      {
        name: "클라우드",
        cards: [
          {
            title: "전략적 파트너십",
            description: [
              "클라우드 MSP 전문기업 및 종합 IT",
              "인프라 솔루션 기업과의 협력 체계"
            ]
          },
          {
            title: "공공 클라우드 운영 실적",
            description: [
              "국가정보자원관리원 G-클라우드",
              "구축 및 운영 5년 이상 지속"
            ]
          },
          {
            title: "민간 클라우드 인프라 관리",
            description: [
              "메트라이프생명, 한국투자증권,",
              "DB손해보험 인프라 운영 중"
            ]
          }
        ]
      },
      {
        name: "RPA",
        cards: [
          {
            title: "삼성SDS Brity RPA 파트너",
            description: [
              "국내 대표 RPA 솔루션 Brity의",
              "공인 공급업체"
            ]
          },
          {
            title: "RPA 프로젝트 수행 이력",
            description: [
              "1. 반복 업무 자동화",
              "2. 업무 효율성 극대화",
              "3. 에러율 최소화"
            ]
          },
          {
            title: "RPA 전문 인력 확보",
            description: [
              "자동화 솔루션 구축 및 운영 가능한",
              "전문 엔지니어 보유"
            ]
          }
        ]
      },
      {
        name: "솔루션",
        cards: [
          {
            title: "Extreme Networks",
            description: [
              "네트워크, 보안, AI를 통합해 복잡성을 단순화합니다"
            ],
            link: "https://www.extremenetworks.com/kr/solutions"
          },
          {
            title: "WeDataLab",
            description: [
              "데이터 인텔리전스로 비즈니스 혁신을 실현합니다"
            ],
            link: "https://wedatalab.com/solution"
          },
          {
            title: "SUSE",
            description: [
              "자동화와 모니터링으로 SAP 인프라를 관리합니다"
            ],
            link: "https://www.suse.com/ko-kr/solutions/run-sap-solutions/"
          },
          {
            title: "SK AX",
            description: [
              "글로벌 톱10 AI 서비스 기업으로 성장합니다"
            ],
            link: "https://www.skax.co.kr/"
          },
          {
            title: "T3Q",
            description: [
              "인공지능을 엑셀처럼 쉽게 활용할 수 있게 합니다"
            ],
            link: "https://t3q.com/t3q-ai/"
          },
          {
            title: "BCP Solutions",
            description: [
              "솔루션과 컨설팅으로 비즈니스 연속성을 보장합니다"
            ],
            link: "https://www.krbcp.com/?act=board&bbs_code=brochure"
          }
        ]
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleSave = () => {
    console.log('저장된 About 데이터:', aboutData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  const addCard = (tabIndex: number) => {
    const newCards = [...aboutData.tabs[tabIndex].cards];
    newCards.push({
      title: "새 카드",
      description: ["설명을 입력하세요"],
      ...(aboutData.tabs[tabIndex].name === "솔루션" && { link: "" })
    });
    
    const newTabs = [...aboutData.tabs];
    newTabs[tabIndex].cards = newCards;
    setAboutData({...aboutData, tabs: newTabs});
  };

  const removeCard = (tabIndex: number, cardIndex: number) => {
    const newCards = aboutData.tabs[tabIndex].cards.filter((_, index) => index !== cardIndex);
    const newTabs = [...aboutData.tabs];
    newTabs[tabIndex].cards = newCards;
    setAboutData({...aboutData, tabs: newTabs});
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
                About 페이지 관리
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 타이틀 편집 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                메인 타이틀
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메인 제목
                  </label>
                  <input
                    type="text"
                    value={aboutData.mainTitle}
                    onChange={(e) => setAboutData({...aboutData, mainTitle: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부제목
                  </label>
                  <input
                    type="text"
                    value={aboutData.subtitle}
                    onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 탭별 카드 관리 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  탭별 카드 관리
                </h3>
                {isEditing && (
                  <button
                    onClick={() => addCard(activeTab)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                  >
                    카드 추가
                  </button>
                )}
              </div>

              {/* 탭 선택 */}
              <div className="flex space-x-2 mb-6">
                {aboutData.tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* 카드 목록 */}
              <div className="space-y-4">
                {aboutData.tabs[activeTab].cards.map((card, cardIndex) => (
                  <div key={cardIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">
                        카드 {cardIndex + 1}
                      </h4>
                      {isEditing && (
                        <button
                          onClick={() => removeCard(activeTab, cardIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          제목
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const newTabs = [...aboutData.tabs];
                            newTabs[activeTab].cards[cardIndex].title = e.target.value;
                            setAboutData({...aboutData, tabs: newTabs});
                          }}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          설명 (줄바꿈으로 구분)
                        </label>
                        <textarea
                          value={card.description.join('\n')}
                          onChange={(e) => {
                            const newTabs = [...aboutData.tabs];
                            newTabs[activeTab].cards[cardIndex].description = e.target.value.split('\n');
                            setAboutData({...aboutData, tabs: newTabs});
                          }}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      {aboutData.tabs[activeTab].name === "솔루션" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            링크 URL
                          </label>
                          <input
                            type="url"
                            value={card.link || ''}
                            onChange={(e) => {
                              const newTabs = [...aboutData.tabs];
                              newTabs[activeTab].cards[cardIndex].link = e.target.value;
                              setAboutData({...aboutData, tabs: newTabs});
                            }}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            placeholder="https://example.com"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            미리보기
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {aboutData.mainTitle}
            </h2>
            <p className="text-gray-600 mb-4">
              {aboutData.subtitle}
            </p>
            <div className="text-sm text-gray-500">
              현재 선택된 탭: {aboutData.tabs[activeTab].name} ({aboutData.tabs[activeTab].cards.length}개 카드)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
