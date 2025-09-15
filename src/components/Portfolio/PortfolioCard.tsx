interface PortfolioCardProps {
  title: string;
  description: string;
  image?: string; // 이미지 URL (선택적)
}

const PortfolioCard = ({ title, description, image }: PortfolioCardProps) => {
  // 설명이 두 줄인 카드들의 간격 조정
  const getMarginBottom = () => {
    // 설명에 줄바꿈(\n)이 있으면 두 줄 설명
    if (description.includes('\n')) {
      return '-2px'; // 두 줄 설명 카드는 간격을 줄임
    }
    return '30px'; // 한 줄 설명 카드는 기본 간격
  };

  return (
    <div 
      className="rounded-[24px] p-10 transition-all duration-300"
      style={{
        width: '280px',
        height: '360px',
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
      }} // 카드 최소 높이를 지정하여 내용에 따라 늘어납니다
    >
      {/* 컨텐츠 그룹 - 제목/설명/이미지 묶음 */}
      <div className="flex flex-col items-center h-full">
        {/* 제목과 설명 */}
        <div className="text-center" style={{ marginBottom: getMarginBottom() }}>
          <h3 className="text-[#00A3E0] text-[28px] font-bold" style={{ marginBottom: '0px' }}>{title}</h3>
          <p
          className="text-black text-[22px] text-center font-black"
          style={{ marginTop: '0px', whiteSpace: 'pre-line' }}
        >
          {description}
        </p>
        </div>
        
        {/* 이미지 영역 */}
        <div
          className="bg-gray-100 rounded-[16px] overflow-hidden flex items-end justify-center"
          style={{
            width: '260px',
            height: '240px',
            marginTop: '-20px'
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
