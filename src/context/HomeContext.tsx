import { createContext, useContext, useState, type ReactNode } from 'react';

// 홈페이지 데이터 타입 정의
interface HomeData {
  typingTexts: string[];
  typingTextStyles: {
    colors: string[];
    fontWeights: number[];
    desktopSizes: number[];
    mobileSizes: number[];
  };
  typingSpeed: {
    speed: number; // 타이핑 속도 (ms)
    pauseTime: number; // 줄 간 대기 시간 (ms)
  };
  buttonData: {
    title: string;
    subtitle: string;
    description: string;
    imagePath: string;
  }[];
  buttonStyles: {
    titleSizes: { desktop: number; mobile: number };
    subtitleSizes: { desktop: number; mobile: number };
    descriptionSizes: { desktop: number; mobile: number };
    hoverColor: string;
  };
  sliderText: string;
  sliderTextColors: {
    defaultColor: string;
    coloredWords: { [word: string]: string };
  };
  sliderTextSizes: {
    desktop: number;
    mobile: number;
  };
}

// Context 타입 정의
interface HomeContextType {
  homeData: HomeData;
  updateHomeData: (newData: Partial<HomeData>) => void;
  updateTypingText: (index: number, text: string) => void;
  updateTypingTextStyles: (styles: Partial<HomeData['typingTextStyles']>) => void;
  updateTypingTextStyle: (index: number, styleType: 'colors' | 'fontWeights' | 'desktopSizes' | 'mobileSizes', value: string | number) => void;
  updateTypingSpeed: (speed: Partial<HomeData['typingSpeed']>) => void;
  updateButtonData: (index: number, buttonData: Partial<HomeData['buttonData'][0]>) => void;
  updateButtonStyles: (styles: Partial<HomeData['buttonStyles']>) => void;
  updateSliderText: (text: string) => void;
  updateSliderTextColors: (colors: Partial<HomeData['sliderTextColors']>) => void;
  updateSliderTextSizes: (sizes: Partial<HomeData['sliderTextSizes']>) => void;
}

// 기본 데이터
const defaultHomeData: HomeData = {
  typingTexts: [
    '고객을 빛나게',
    '구성원을 빛나게', 
    '미래를 빛나게',
    'NIMBUS TECH'
  ],
  typingTextStyles: {
    colors: ['#000000', '#000000', '#000000', '#00A3E0'],
    fontWeights: [500, 500, 500, 700],
    desktopSizes: [100, 100, 100, 120],
    mobileSizes: [35, 35, 35, 48]
  },
  typingSpeed: {
    speed: 130, // 기본 타이핑 속도 (ms)
    pauseTime: 700 // 기본 줄 간 대기 시간 (ms)
  },
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
      imagePath: "/popup_image/Core Values.png"
    },
    {
      title: "Way of Working",
      subtitle: "일하는 방식",
      description: '모든 일의 궁극적인 목적은\n"고객창출" 곧 "고객성공"이다!',
      imagePath: "/popup_image/Way of Working.jpg"
    },
    {
      title: "Employee Benefits",
      subtitle: "복지 혜택",
      description: "열정과 패기를 갖춘 인재들과\n함께 일하고 성장하는 기업",
      imagePath: "/popup_image/Employee Benefits.jpg"
    }
  ],
  buttonStyles: {
    titleSizes: { desktop: 30, mobile: 20 },
    subtitleSizes: { desktop: 40, mobile: 28 },
    descriptionSizes: { desktop: 20, mobile: 12 },
    hoverColor: "#00A3E0"
  },
  sliderText: "LEADING CUSTOMER SUCCESS",
  sliderTextColors: {
    defaultColor: "#c2c2c2",
    coloredWords: {
      "LEADING": "#b8e9ff",
      "CUSTOMER": "#18a8f1",
      "SUCCESS": "#b8e9ff"
    }
  },
  sliderTextSizes: {
    desktop: 110,
    mobile: 60
  }
};

// Context 생성
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Provider 컴포넌트
export function HomeProvider({ children }: { children: ReactNode }) {
  const [homeData, setHomeData] = useState<HomeData>(() => {
    // localStorage 무시하고 기본값 사용
    localStorage.removeItem('homeData'); // 강제 초기화
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

  // 타이핑 텍스트 스타일 전체 업데이트
  const updateTypingTextStyles = (styles: Partial<HomeData['typingTextStyles']>) => {
    const newStyles = { ...homeData.typingTextStyles, ...styles };
    updateHomeData({ typingTextStyles: newStyles });
  };

  // 타이핑 텍스트 개별 스타일 업데이트
  const updateTypingTextStyle = (index: number, styleType: 'colors' | 'fontWeights' | 'desktopSizes' | 'mobileSizes', value: string | number) => {
    const newStyles = { ...homeData.typingTextStyles };
    if (styleType === 'colors') {
      const newArray = [...newStyles.colors];
      newArray[index] = value as string;
      newStyles.colors = newArray;
    } else if (styleType === 'fontWeights') {
      const newArray = [...newStyles.fontWeights];
      newArray[index] = value as number;
      newStyles.fontWeights = newArray;
    } else if (styleType === 'desktopSizes') {
      const newArray = [...newStyles.desktopSizes];
      newArray[index] = value as number;
      newStyles.desktopSizes = newArray;
    } else if (styleType === 'mobileSizes') {
      const newArray = [...newStyles.mobileSizes];
      newArray[index] = value as number;
      newStyles.mobileSizes = newArray;
    }
    updateHomeData({ typingTextStyles: newStyles });
  };

  // 타이핑 속도 업데이트
  const updateTypingSpeed = (speed: Partial<HomeData['typingSpeed']>) => {
    const newSpeed = { ...homeData.typingSpeed, ...speed };
    updateHomeData({ typingSpeed: newSpeed });
  };

  // 버튼 데이터 개별 업데이트
  const updateButtonData = (index: number, buttonData: Partial<HomeData['buttonData'][0]>) => {
    const newButtonData = [...homeData.buttonData];
    newButtonData[index] = { ...newButtonData[index], ...buttonData };
    updateHomeData({ buttonData: newButtonData });
  };

  // 버튼 스타일 업데이트
  const updateButtonStyles = (styles: Partial<HomeData['buttonStyles']>) => {
    const newStyles = { ...homeData.buttonStyles, ...styles };
    updateHomeData({ buttonStyles: newStyles });
  };

  // 슬라이더 텍스트 업데이트
  const updateSliderText = (text: string) => {
    updateHomeData({ sliderText: text });
  };

  // 슬라이더 텍스트 색상 업데이트
  const updateSliderTextColors = (colors: Partial<HomeData['sliderTextColors']>) => {
    const newColors = { ...homeData.sliderTextColors, ...colors };
    updateHomeData({ sliderTextColors: newColors });
  };

  // 슬라이더 텍스트 크기 업데이트
  const updateSliderTextSizes = (sizes: Partial<HomeData['sliderTextSizes']>) => {
    const newSizes = { ...homeData.sliderTextSizes, ...sizes };
    updateHomeData({ sliderTextSizes: newSizes });
  };

  const value: HomeContextType = {
    homeData,
    updateHomeData,
    updateTypingText,
    updateTypingTextStyles,
    updateTypingTextStyle,
    updateTypingSpeed,
    updateButtonData,
    updateButtonStyles,
    updateSliderText,
    updateSliderTextColors,
    updateSliderTextSizes
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
