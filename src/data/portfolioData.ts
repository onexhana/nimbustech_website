// 포트폴리오 프로젝트 데이터
export const portfolioProjects = [
  // 공공 카테고리 (5개)
  { 
    id: 1, 
    title: "현대자동차", 
    description: "인젠트 보안솔루션", 
    category: "공공",
    image: "/portfolio_photo/제조_현대 자동차.png"
  },
  { 
    id: 7, 
    title: "서울시청", 
    description: "스마트 시티 플랫폼 구축", 
    category: "공공"
  },
  { 
    id: 8, 
    title: "한국전력공사", 
    description: "전력망 모니터링 시스템", 
    category: "공공"
  },
  { 
    id: 9, 
    title: "국토교통부", 
    description: "교통정보 통합관리 시스템", 
    category: "공공"
  },
  { 
    id: 10, 
    title: "부산광역시", 
    description: "시민포털 서비스 개발", 
    category: "공공"
  },
  { 
    id: 11, 
    title: "한국도로공사", 
    description: "고속도로 통행료 시스템", 
    category: "공공"
  },
  { 
    id: 99, 
    title: "안녕하세요", 
    description: "공공용 카드입니다", 
    category: "공공"
  },
  // 금융 카테고리
  { id: 2, title: "신한은행", description: "모바일 뱅킹 시스템", category: "금융" },
  { id: 12, title: "KB국민은행", description: "디지털 금융 플랫폼", category: "금융" },
  { id: 13, title: "하나은행", description: "핀테크 솔루션", category: "금융" },
  
  // 일반 카테고리
  { id: 3, title: "삼성전자", description: "스마트 홈 IoT", category: "일반" },
  { id: 14, title: "LG전자", description: "AI 가전 시스템", category: "일반" },
  { id: 15, title: "네이버", description: "클라우드 서비스", category: "일반" },
  
  // 제조 카테고리
  { id: 4, title: "포스코", description: "스마트 팩토리", category: "제조" },
  { id: 16, title: "두산중공업", description: "제조 관리 시스템", category: "제조" },
  { id: 17, title: "SK하이닉스", description: "반도체 생산 시스템", category: "제조" },
  
  // 유통 카테고리
  { id: 5, title: "롯데마트", description: "옴니채널 플랫폼", category: "유통" },
  { id: 18, title: "이마트", description: "디지털 유통 시스템", category: "유통" },
  { id: 19, title: "GS25", description: "편의점 관리 시스템", category: "유통" },
  
  // 기타 카테고리
  { id: 6, title: "KT", description: "5G 네트워크 구축", category: "기타" },
  { id: 20, title: "SK텔레콤", description: "통신 인프라", category: "기타" },
  { id: 21, title: "LG유플러스", description: "모바일 서비스", category: "기타" },
];

// 카테고리 목록
export const portfolioCategories = ["공공", "금융", "일반", "제조", "유통", "기타"];
