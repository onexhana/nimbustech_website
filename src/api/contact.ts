import type { InquiryData, HiringData, ContactData, AboutData } from '../types/contact';

export async function sendInquiry(data: InquiryData): Promise<void> {
  const response = await fetch('/api/contact/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '문의 전송에 실패했습니다.');
  }
}

export async function sendHiring(data: HiringData): Promise<void> {
  const response = await fetch('/api/contact/hiring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '채용 문의 전송에 실패했습니다.');
  }
}

// Contact 페이지 데이터 관리 API
export async function getContactData(): Promise<ContactData> {
  // 실제 환경에서는 서버에서 데이터를 가져옵니다
  // 현재는 로컬 스토리지에서 가져오거나 기본값을 반환합니다
  const storedData = localStorage.getItem('contactData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // 기본값 반환
  return {
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
        name: "님버스테크 회사소개서",
        path: "/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf"
      }
    ],
    fontSize: {
      mainTitle: 30,
      subtitle: 18,
      sectionTitle: 42,
      sectionDescription: 15,
      buttonText: 24,
      companyInfo: 14,
      // 데스크탑 전용
      desktopSectionTitle: 42,
      desktopSectionDescription: 21,
      desktopButtonText: 32
    }
  };
}

export async function saveContactData(data: ContactData): Promise<void> {
  // 실제 환경에서는 서버에 데이터를 저장합니다
  // 현재는 로컬 스토리지에 저장합니다
  localStorage.setItem('contactData', JSON.stringify(data));
}

// About 페이지 데이터 관리 API
export async function getAboutData(): Promise<AboutData> {
  // 실제 환경에서는 서버에서 데이터를 가져옵니다
  // 현재는 로컬 스토리지에서 가져오거나 기본값을 반환합니다
  const storedData = localStorage.getItem('aboutData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // 기본값 반환
  return {
    mainTitle: "고객 성공 리딩",
    subtitle: "신뢰성 높은 DT 서비스를 제공합니다.",
    fontSize: {
      cardTitle: 28,
      cardDescription: 22,
      mobileCardTitle: 28,
      mobileCardDescription: 22
    },
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
            ],
            link: "https://www.krbcp.com/"
          }
        ]
      }
    ],
    fontSize: {
      mainTitle: 30,
      subtitle: 18,
      cardTitle: 16,
      cardDescription: 14,
      tabName: 16
    },
    tabActiveColor: '#00A3E0',
    tabInactiveColor: '#374151',
    cardBackgroundColor: '#ffffff',
    cardTitleColor: '#000000',
    cardDescriptionColor: '#6B7280',
    cardHoverEffect: true
  };
}

export async function saveAboutData(data: AboutData): Promise<void> {
  // 실제 환경에서는 서버에 데이터를 저장합니다
  // 현재는 로컬 스토리지에 저장합니다
  localStorage.setItem('aboutData', JSON.stringify(data));
}
