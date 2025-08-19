interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string; // 이미지 URL (선택적)
}

const PortfolioCard = ({ title, description, category, image }: PortfolioCardProps) => {
  return (
    <div 
      className="rounded-[24px] p-10 transition-all duration-300"
      style={{ 
        width: '380px', 
        height: '400px', 
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
      }} // 카드 크기, 배경색 및 부드러운 그림자
    >
      {/* 컨텐츠 그룹 - 제목/설명/이미지 묶음 */}
      <div className="flex flex-col items-center">
        {/* 제목과 설명 */}
        <div className="text-center mb-4">
          <h3 className="text-[#00A3E0] text-[28px] font-bold" style={{ marginBottom: '2px' }}>{title}</h3>
          <p className="text-black text-[22px] text-center font-black" style={{ marginTop: '2px' }}>
            {description}
          </p>
        </div>
        
        {/* 이미지 영역 */}
        <div className="bg-gray-100 rounded-[16px] overflow-hidden flex items-end justify-center" style={{ width: '350px', height: '250px' }}>
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="object-cover rounded-[12px]"
              style={{ width: '350px', height: '250px' }}
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
