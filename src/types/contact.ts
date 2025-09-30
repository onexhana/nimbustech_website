export interface InquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
}

export interface HiringData {
  name: string;
  phone: string;
  email: string;
  resume: string;
  message: string;
  agree: boolean;
}

export interface ContactSection {
  title: string;
  description: string;
}

export interface ContactButton {
  text: string;
  type: 'inquiry' | 'hiring';
}

export interface CompanyInfo {
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

export interface PdfFile {
  name: string;
  path: string;
}

export interface ContactData {
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
}

// About 페이지 관련 타입
export interface AboutCard {
  title: string;
  description: string[];
  link?: string;
  fontSize?: {
    title?: number;
    description?: number;
    mobileTitle?: number;
    mobileDescription?: number;
  };
}

export interface AboutTab {
  name: string;
  cards: AboutCard[];
}

export interface AboutData {
  mainTitle: string;
  subtitle: string;
  tabs: AboutTab[];
  fontSize: {
    mainTitle: number;
    subtitle: number;
    cardTitle: number;
    cardDescription: number;
    tabName: number;
    mobileTabName?: number;
    mobileCardTitle?: number;
    mobileCardDescription?: number;
  };
  tabActiveColor?: string;
  tabInactiveColor?: string;
  mobileTabActiveColor?: string;
  mobileTabInactiveColor?: string;
  cardBackgroundColor?: string;
  cardTitleColor?: string;
  cardDescriptionColor?: string;
  cardHoverEffect?: boolean;
  pageTitle?: string;
  metaDescription?: string;
}