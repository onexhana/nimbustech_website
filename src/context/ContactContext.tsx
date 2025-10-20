import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getContactData, saveContactData } from '../api/contact';

// Contact 섹션 타입 정의
interface ContactSection {
  title: string;
  description: string;
}

// Contact 버튼 타입 정의
interface ContactButton {
  text: string;
  type: 'inquiry' | 'hiring';
}

// 회사 정보 타입 정의
interface CompanyInfo {
  sejong: {
    title: string;
    address: string;
  };
  seoul: {
    title: string;
    address: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

// PDF 파일 타입 정의
interface PdfFile {
  name: string;
  path: string;
}

// Contact 데이터 타입 정의
interface ContactData {
  sections: ContactSection[];
  buttons: ContactButton[];
  companyInfo: CompanyInfo;
  pdfFiles: PdfFile[];
  fontSize: {
    mainTitle: number;
    subtitle: number;
    sectionTitle: number;
    sectionDescription: number;
    buttonText: number;
    companyInfo: number;
    desktopMainTitle?: number;
    desktopSubtitle?: number;
    desktopSectionTitle?: number;
    desktopSectionDescription?: number;
    desktopButtonText?: number;
    desktopCompanyInfo?: number;
  };
  colors?: {
    mainTitle?: string;
    subtitle?: string;
    sectionTitle?: string;
    sectionDescription?: string;
    buttonText?: string;
    companyInfo?: string;
    // 데스크탑 전용
    desktopMainTitle?: string;
    desktopSubtitle?: string;
    desktopSectionTitle?: string;
    desktopSectionDescription?: string;
    desktopButtonText?: string;
    desktopCompanyInfo?: string;
  };
}

// Context 타입 정의
interface ContactContextType {
  contactData: ContactData;
  updateSection: (index: number, section: Partial<ContactSection>) => Promise<void>;
  updateButton: (index: number, button: Partial<ContactButton>) => Promise<void>;
  updateCompanyInfo: (updatedInfo: Partial<CompanyInfo>) => Promise<void>;
  updatePdfFile: (index: number, file: Partial<PdfFile>) => Promise<void>;
  refreshData: () => void;
}

// 기본 데이터
const defaultContactData: ContactData = {
  sections: [
    {
      title: "TRUST",
      description: "구성원 간의 신뢰, 고객과의 신뢰를 기반으로\n모든 협업과 서비스를 책임 있게 수행합니다."
    },
    {
      title: "OWNERSHIP", 
      description: "각자의 역할에 책임을 가지고 임하며,\n스스로 문제를 해결하는 태도를 지향합니다."
    },
    {
      title: "GROWTH",
      description: "기술, AI, 프로젝트 경험을 통해\n개인과 조직이 함께 발전하는 문화를 만들어갑니다."
    }
  ],
  buttons: [
    {
      text: "고객 문의",
      type: "inquiry"
    },
    {
      text: "인재 문의", 
      type: "hiring"
    }
  ],
  companyInfo: {
    sejong: {
      title: "[세종 본사]",
      address: "집현중앙7로6, B동 1110호 (세종대명벨리온)"
    },
    seoul: {
      title: "[서울사무소]",
      address: "강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)"
    },
    contact: {
      phone: "02-555-0099",
      email: "nimbustech@nimbustech.co.kr"
    }
  },
    pdfFiles: [
      {
        name: "개인정보 처리방침",
        path: "/footer_pdf/개인정보 처리방침_v1.0.pdf"
      },
      {
        name: "님버스테크 회사소개",
        path: "/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf"
      }
    ],
    fontSize: {
      mainTitle: 30,
      subtitle: 18,
      sectionTitle: 24,
      sectionDescription: 16,
      buttonText: 20,
      companyInfo: 14
    }
};

// Context 생성
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Provider 컴포넌트
export function ContactProvider({ children }: { children: ReactNode }) {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  // 데이터 로드 함수 (새로고침용)
  const loadData = async () => {
    try {
      const data = await getContactData();
      setContactData(data);
    } catch (error) {
      console.error('Contact 데이터 로드 실패:', error);
      // 실패 시 기본 데이터 사용
      setContactData(defaultContactData);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터 새로고침 함수
  const refreshData = () => {
    setIsLoading(true);
    loadData();
  };

  // 데이터 업데이트 및 API를 통한 저장
  const updateContactData = async (newData: ContactData) => {
    setContactData(newData);
    try {
      await saveContactData(newData);
    } catch (error) {
      console.error('Contact 데이터 저장 실패:', error);
    }
  };

  // 섹션 업데이트
  const updateSection = async (index: number, section: Partial<ContactSection>) => {
    const newSections = contactData.sections.map((s, i) => 
      i === index ? { ...s, ...section } : s
    );
    await updateContactData({ ...contactData, sections: newSections });
  };

  // 버튼 업데이트
  const updateButton = async (index: number, button: Partial<ContactButton>) => {
    const newButtons = contactData.buttons.map((b, i) => 
      i === index ? { ...b, ...button } : b
    );
    await updateContactData({ ...contactData, buttons: newButtons });
  };

  // 회사 정보 업데이트
  const updateCompanyInfo = async (updatedInfo: Partial<CompanyInfo>) => {
    await updateContactData({ 
      ...contactData, 
      companyInfo: { ...contactData.companyInfo, ...updatedInfo }
    });
  };

  // PDF 파일 업데이트
  const updatePdfFile = async (index: number, file: Partial<PdfFile>) => {
    const newPdfFiles = contactData.pdfFiles.map((f, i) => 
      i === index ? { ...f, ...file } : f
    );
    await updateContactData({ ...contactData, pdfFiles: newPdfFiles });
  };

  const value: ContactContextType = {
    contactData,
    updateSection,
    updateButton,
    updateCompanyInfo,
    updatePdfFile,
    refreshData
  };

  // 로딩 중일 때는 현재 데이터로 렌더링 (동기 로딩이므로 로딩 상태가 거의 없음)
  if (isLoading) {
    return (
      <ContactContext.Provider value={{
        contactData: contactData,
        updateSection: async () => {},
        updateButton: async () => {},
        updateCompanyInfo: async () => {},
        updatePdfFile: async () => {},
        refreshData: () => {}
      }}>
        {children}
      </ContactContext.Provider>
    );
  }

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
}

// Hook
export function useContactData() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContactData must be used within a ContactProvider');
  }
  return context;
}
