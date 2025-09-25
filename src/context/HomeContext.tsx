import { createContext, useContext, useState, ReactNode } from 'react';

// 홈페이지 데이터 타입 정의
interface HomeData {
  typingTexts: string[];
  buttonData: {
    title: string;
    subtitle: string;
    description: string;
    imagePath: string;
  }[];
  sliderText: string;
}

// Context 타입 정의
interface HomeContextType {
  homeData: HomeData;
  updateHomeData: (newData: Partial<HomeData>) => void;
  updateTypingText: (index: number, text: string) => void;
  updateButtonData: (index: number, buttonData: Partial<HomeData['buttonData'][0]>) => void;
  updateSliderText: (text: string) => void;
}

// 기본 데이터
const defaultHomeData: HomeData = {
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
};

// Context 생성
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Provider 컴포넌트
export function HomeProvider({ children }: { children: ReactNode }) {
  const [homeData, setHomeData] = useState<HomeData>(() => {
    // localStorage에서 저장된 데이터가 있으면 불러오기
    const savedData = localStorage.getItem('homeData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('저장된 홈 데이터를 불러오는데 실패했습니다:', error);
        return defaultHomeData;
      }
    }
    return defaultHomeData;
  });

  // 전체 데이터 업데이트
  const updateHomeData = (newData: Partial<HomeData>) => {
    const updatedData = { ...homeData, ...newData };
    setHomeData(updatedData);
    // localStorage에 저장
    localStorage.setItem('homeData', JSON.stringify(updatedData));
  };

  // 타이핑 텍스트 개별 업데이트
  const updateTypingText = (index: number, text: string) => {
    const newTypingTexts = [...homeData.typingTexts];
    newTypingTexts[index] = text;
    updateHomeData({ typingTexts: newTypingTexts });
  };

  // 버튼 데이터 개별 업데이트
  const updateButtonData = (index: number, buttonData: Partial<HomeData['buttonData'][0]>) => {
    const newButtonData = [...homeData.buttonData];
    newButtonData[index] = { ...newButtonData[index], ...buttonData };
    updateHomeData({ buttonData: newButtonData });
  };

  // 슬라이더 텍스트 업데이트
  const updateSliderText = (text: string) => {
    updateHomeData({ sliderText: text });
  };

  const value: HomeContextType = {
    homeData,
    updateHomeData,
    updateTypingText,
    updateButtonData,
    updateSliderText
  };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
}

// Hook
export function useHomeData() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHomeData must be used within a HomeProvider');
  }
  return context;
}
