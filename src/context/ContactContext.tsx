import { createContext, useContext, useState, ReactNode } from 'react';

// Contact 섹션 타입 정의
interface ContactSection {
  title: string;
  description: string;
}

// Contact 버튼 타입 정의
interface ContactButton {
  text: string;
  type: string;
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
}

// Context 타입 정의
interface ContactContextType {
  contactData: ContactData;
  updateSection: (index: number, section: Partial<ContactSection>) => void;
  updateButton: (index: number, button: Partial<ContactButton>) => void;
  updateCompanyInfo: (updatedInfo: Partial<CompanyInfo>) => void;
  updatePdfFile: (index: number, file: Partial<PdfFile>) => void;
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
      text: "고객사 직원",
      type: "inquiry"
    },
    {
      text: "인재 채용", 
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
  ]
};

// Context 생성
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Provider 컴포넌트
export function ContactProvider({ children }: { children: ReactNode }) {
  const [contactData, setContactData] = useState<ContactData>(() => {
    // localStorage에서 저장된 데이터가 있으면 불러오기
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('저장된 Contact 데이터를 불러오는데 실패했습니다:', error);
        return defaultContactData;
      }
    }
    return defaultContactData;
  });

  // 데이터 업데이트 및 localStorage 저장
  const updateContactData = (newData: ContactData) => {
    setContactData(newData);
    localStorage.setItem('contactData', JSON.stringify(newData));
  };

  // 섹션 업데이트
  const updateSection = (index: number, section: Partial<ContactSection>) => {
    const newSections = contactData.sections.map((s, i) => 
      i === index ? { ...s, ...section } : s
    );
    updateContactData({ ...contactData, sections: newSections });
  };

  // 버튼 업데이트
  const updateButton = (index: number, button: Partial<ContactButton>) => {
    const newButtons = contactData.buttons.map((b, i) => 
      i === index ? { ...b, ...button } : b
    );
    updateContactData({ ...contactData, buttons: newButtons });
  };

  // 회사 정보 업데이트
  const updateCompanyInfo = (updatedInfo: Partial<CompanyInfo>) => {
    updateContactData({ 
      ...contactData, 
      companyInfo: { ...contactData.companyInfo, ...updatedInfo }
    });
  };

  // PDF 파일 업데이트
  const updatePdfFile = (index: number, file: Partial<PdfFile>) => {
    const newPdfFiles = contactData.pdfFiles.map((f, i) => 
      i === index ? { ...f, ...file } : f
    );
    updateContactData({ ...contactData, pdfFiles: newPdfFiles });
  };

  const value: ContactContextType = {
    contactData,
    updateSection,
    updateButton,
    updateCompanyInfo,
    updatePdfFile
  };

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
