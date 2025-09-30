interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  image?: string; // 이미지 URL (선택적)
}

const PortfolioCard = ({ id, title, description, image }: PortfolioCardProps) => {
  // 설명이 두 줄인 카드들의 간격 조정
  const getMarginBottom = () => {
    // 설명에 줄바꿈(\n)이 있으면 두 줄 설명
    if (description.includes('\n')) {
      return '-2px'; // 두 줄 설명 카드는 간격을 줄임
    }
    return '30px'; // 한 줄 설명 카드는 기본 간격
  };

  // 모바일과 데스크톱 레이아웃 분리
  const isMobile = window.innerWidth < 768;

  // 관리자 페이지에서 설정한 개별 프로젝트 스타일 불러오기
  const getProjectStyle = (projectId: number) => {
    const savedFontStyles = localStorage.getItem('fontStyleSettings');
    const savedImageSizes = localStorage.getItem('imageSizeSettings');
    
    let fontStyle = null;
    let imageSize = null;
    
    if (savedFontStyles) {
      try {
        const fontStyles = JSON.parse(savedFontStyles);
        fontStyle = fontStyles[projectId];
      } catch (error) {
        console.error('글씨 스타일 로드 실패:', error);
      }
    }
    
    if (savedImageSizes) {
      try {
        const imageSizes = JSON.parse(savedImageSizes);
        imageSize = imageSizes[projectId];
      } catch (error) {
        console.error('이미지 크기 로드 실패:', error);
      }
    }
    
    // 기본값 반환
    return {
      fontStyle: fontStyle || {
        projectTitle: {
          web: { size: 28, weight: 700, color: "#00A3E0" },
          mobile: { size: 22, weight: 700, color: "#00A3E0" }
        },
        projectDescription: {
          web: { size: 22, weight: 600, color: "#000000" },
          mobile: { size: 16, weight: 600, color: "#000000" }
        }
      },
      imageSize: imageSize || {
        web: { width: 330, height: 250 },
        mobile: { width: 260, height: 150 }
      }
    };
  };

  // 실제 프로젝트 ID 사용
  const { fontStyle, imageSize } = getProjectStyle(id);
  
  return (
    <div 
      className="rounded-[24px] p-10 transition-all duration-300"
      style={{
        width: isMobile ? '280px' : '380px',
        height: isMobile ? '360px' : '400px',
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
      }} // 카드 최소 높이를 지정하여 내용에 따라 늘어납니다
    >
      {/* 컨텐츠 그룹 - 제목/설명/이미지 묶음 */}
      <div className="flex flex-col items-center h-full">
        {/* 제목과 설명 */}
        <div className="text-center" style={{ marginBottom: getMarginBottom() }}>
          <h3 
            className="text-center"
            style={{ 
              marginBottom: isMobile ? '0px' : '2px',
              fontSize: `${isMobile ? fontStyle.projectTitle.mobile.size : fontStyle.projectTitle.web.size}px`,
              fontWeight: isMobile ? fontStyle.projectTitle.mobile.weight : fontStyle.projectTitle.web.weight,
              color: isMobile ? fontStyle.projectTitle.mobile.color : fontStyle.projectTitle.web.color
            }}
          >
            {title}
          </h3>
          <p
            className="text-center"
            style={{ 
              marginTop: isMobile ? '0px' : '2px',
              whiteSpace: 'pre-line',
              fontSize: `${isMobile ? fontStyle.projectDescription.mobile.size : fontStyle.projectDescription.web.size}px`,
              fontWeight: isMobile ? fontStyle.projectDescription.mobile.weight : fontStyle.projectDescription.web.weight,
              color: isMobile ? fontStyle.projectDescription.mobile.color : fontStyle.projectDescription.web.color
            }}
          >
            {description}
          </p>
        </div>
        
        {/* 이미지 영역 */}
        <div
          className="bg-gray-100 rounded-[16px] overflow-hidden flex items-end justify-center"
          style={{
            width: isMobile ? `${imageSize.mobile.width}px` : `${imageSize.web.width}px`,
            height: isMobile ? `${imageSize.mobile.height}px` : `${imageSize.web.height}px`,
            marginTop: isMobile ? '-40px' : '-30px'
          }}
        >
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="object-cover rounded-[12px] w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              이미지 영역
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
