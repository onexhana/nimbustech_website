import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getAboutData } from '../api/contact';

// About 카드 타입 정의
interface AboutCard {
  title: string;
  description: string[];
  link?: string;
  fontSize?: {
    title?: number;
    description?: number;
  };
}

// About 탭 타입 정의
interface AboutTab {
  name: string;
  cards: AboutCard[];
  desktop?: {
    name?: string;
  };
  mobile?: {
    name?: string;
  };
}

// About 데이터 타입 정의
interface AboutData {
  mainTitle: string;
  subtitle: string;
  tabs: AboutTab[];
  fontSize?: {
    mainTitle: number;
    subtitle: number;
    cardTitle: number;
    cardDescription: number;
    tabName: number;
    desktop?: {
      mainTitle?: number;
      subtitle?: number;
      tabName?: number;
    };
    mobile?: {
      mainTitle?: number;
      subtitle?: number;
      tabName?: number;
    };
  };
  desktop?: {
    mainTitle?: string;
    subtitle?: string;
    tabActiveColor?: string;
    tabInactiveColor?: string;
    cardBackgroundColor?: string;
    cardTitleColor?: string;
    cardDescriptionColor?: string;
    cardHoverEffect?: boolean;
  };
  mobile?: {
    mainTitle?: string;
    subtitle?: string;
    tabActiveColor?: string;
    tabInactiveColor?: string;
    cardBackgroundColor?: string;
    cardTitleColor?: string;
    cardDescriptionColor?: string;
    cardHoverEffect?: boolean;
  };
  tabActiveColor?: string;
  tabInactiveColor?: string;
  cardBackgroundColor?: string;
  cardTitleColor?: string;
  cardDescriptionColor?: string;
  cardHoverEffect?: boolean;
}

// Context 타입 정의
interface AboutContextType {
  aboutData: AboutData;
  updateMainTitle: (title: string) => void;
  updateSubtitle: (subtitle: string) => void;
  updateTab: (tabIndex: number, updatedTab: Partial<AboutTab>) => void;
  updateCard: (tabIndex: number, cardIndex: number, updatedCard: Partial<AboutCard>) => void;
  addCard: (tabIndex: number, card: AboutCard) => void;
  deleteCard: (tabIndex: number, cardIndex: number) => void;
  refreshData: () => void;
}

// 기본 데이터
const defaultAboutData: AboutData = {
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
          title: "다양한 RPA 개발 경험",
          description: [
            "금융, 공공, 제조업 등",
            "다양한 분야 RPA 구축"
          ]
        },
        {
          title: "전문 RPA 운영 서비스",
          description: [
            "RPA 운영 및 모니터링",
            "지속적 최적화 서비스"
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
          ]
        }
      ]
    }
  ]
};

// Context 생성
const AboutContext = createContext<AboutContextType | undefined>(undefined);

// Provider 컴포넌트
export function AboutProvider({ children }: { children: ReactNode }) {
  const [aboutData, setAboutData] = useState<AboutData>(() => {
    // localStorage에서 저장된 데이터가 있으면 불러오기
    const savedData = localStorage.getItem('aboutData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('저장된 About 데이터를 불러오는데 실패했습니다:', error);
        return defaultAboutData;
      }
    }
    return defaultAboutData;
  });
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 로드 함수 (새로고침용)
  const loadData = async () => {
    try {
      const data = await getAboutData();
      setAboutData(data);
    } catch (error) {
      console.error('About 데이터 로드 실패:', error);
      // 실패 시 기본 데이터 사용
      setAboutData(defaultAboutData);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터 새로고침 함수
  const refreshData = () => {
    setIsLoading(true);
    loadData();
  };

  // 데이터 업데이트 (로컬 스토리지에 저장)
  const updateAboutData = (newData: AboutData) => {
    setAboutData(newData);
    localStorage.setItem('aboutData', JSON.stringify(newData));
  };

  // 메인 타이틀 업데이트
  const updateMainTitle = (title: string) => {
    updateAboutData({ ...aboutData, mainTitle: title });
  };

  // 서브타이틀 업데이트
  const updateSubtitle = (subtitle: string) => {
    updateAboutData({ ...aboutData, subtitle });
  };

  // 탭 업데이트
  const updateTab = (tabIndex: number, updatedTab: Partial<AboutTab>) => {
    const newTabs = aboutData.tabs.map((tab, index) => 
      index === tabIndex ? { ...tab, ...updatedTab } : tab
    );
    updateAboutData({ ...aboutData, tabs: newTabs });
  };

  // 카드 업데이트
  const updateCard = (tabIndex: number, cardIndex: number, updatedCard: Partial<AboutCard>) => {
    const newTabs = aboutData.tabs.map((tab, tIndex) => 
      tIndex === tabIndex 
        ? {
            ...tab,
            cards: tab.cards.map((card, cIndex) => 
              cIndex === cardIndex ? { ...card, ...updatedCard } : card
            )
          }
        : tab
    );
    updateAboutData({ ...aboutData, tabs: newTabs });
  };

  // 카드 추가
  const addCard = (tabIndex: number, card: AboutCard) => {
    const newTabs = aboutData.tabs.map((tab, index) => 
      index === tabIndex 
        ? { ...tab, cards: [...tab.cards, card] }
        : tab
    );
    updateAboutData({ ...aboutData, tabs: newTabs });
  };

  // 카드 삭제
  const deleteCard = (tabIndex: number, cardIndex: number) => {
    const newTabs = aboutData.tabs.map((tab, index) => 
      index === tabIndex 
        ? { ...tab, cards: tab.cards.filter((_, cIndex) => cIndex !== cardIndex) }
        : tab
    );
    updateAboutData({ ...aboutData, tabs: newTabs });
  };

  const value: AboutContextType = {
    aboutData,
    updateMainTitle,
    updateSubtitle,
    updateTab,
    updateCard,
    addCard,
    deleteCard,
    refreshData
  };

  // 로딩 중일 때는 현재 데이터로 렌더링 (동기 로딩이므로 로딩 상태가 거의 없음)
  if (isLoading) {
    return (
      <AboutContext.Provider value={{
        aboutData: aboutData,
        updateMainTitle: () => {},
        updateSubtitle: () => {},
        updateTab: () => {},
        updateCard: () => {},
        addCard: () => {},
        deleteCard: () => {},
        refreshData: () => {}
      }}>
        {children}
      </AboutContext.Provider>
    );
  }

  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  );
}

// Hook
export function useAboutData() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAboutData must be used within an AboutProvider');
  }
  return context;
}
