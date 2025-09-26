import { createContext, useContext, useState, ReactNode } from 'react';

// 포트폴리오 프로젝트 타입 정의
interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

// 포트폴리오 데이터 타입 정의
interface PortfolioData {
  categories: string[];
  projects: PortfolioProject[];
  fontSize?: {
    title?: number;
    description?: number;
    category?: number;
  };
  fontWeight?: {
    title?: number;
    description?: number;
    category?: number;
  };
  fontColor?: {
    title?: string;
    description?: string;
    category?: string;
  };
}

// Context 타입 정의
interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateProject: (id: number, updatedProject: Partial<PortfolioProject>) => void;
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  deleteProject: (id: number) => void;
  updateCategories: (categories: string[]) => void;
  updatePortfolioData: (newData: Partial<PortfolioData>) => void;
}

// 기본 데이터
const defaultPortfolioData: PortfolioData = {
  categories: ["공공", "금융", "일반 / 제조"],
  fontSize: {
    title: 18,
    description: 14,
    category: 16
  },
  fontWeight: {
    title: 600,
    description: 400,
    category: 500
  },
  fontColor: {
    title: "#1f2937",
    description: "#6b7280",
    category: "#374151"
  },
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
};

// Context 생성
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Provider 컴포넌트
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    // localStorage에서 저장된 데이터가 있으면 불러오기
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('저장된 포트폴리오 데이터를 불러오는데 실패했습니다:', error);
        return defaultPortfolioData;
      }
    }
    return defaultPortfolioData;
  });

  // 데이터 업데이트 및 localStorage 저장
  const updatePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
  };

  // 부분 데이터 업데이트
  const updatePortfolioDataPartial = (newData: Partial<PortfolioData>) => {
    const updatedData = { ...portfolioData, ...newData };
    updatePortfolioData(updatedData);
  };

  // 프로젝트 업데이트
  const updateProject = (id: number, updatedProject: Partial<PortfolioProject>) => {
    const newProjects = portfolioData.projects.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    );
    updatePortfolioData({ ...portfolioData, projects: newProjects });
  };

  // 프로젝트 추가
  const addProject = (project: Omit<PortfolioProject, 'id'>) => {
    const newId = Math.max(...portfolioData.projects.map(p => p.id), 0) + 1;
    const newProject = { ...project, id: newId };
    const newProjects = [...portfolioData.projects, newProject];
    updatePortfolioData({ ...portfolioData, projects: newProjects });
  };

  // 프로젝트 삭제
  const deleteProject = (id: number) => {
    const newProjects = portfolioData.projects.filter(project => project.id !== id);
    updatePortfolioData({ ...portfolioData, projects: newProjects });
  };

  // 카테고리 업데이트
  const updateCategories = (categories: string[]) => {
    updatePortfolioData({ ...portfolioData, categories });
  };

  const value: PortfolioContextType = {
    portfolioData,
    updateProject,
    addProject,
    deleteProject,
    updateCategories,
    updatePortfolioData: updatePortfolioDataPartial
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Hook
export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a PortfolioProvider');
  }
  return context;
}
