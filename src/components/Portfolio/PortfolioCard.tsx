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
        width: '420px', 
        height: '400px', 
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)'
      }} // 카드 크기, 배경색 및 부드러운 그림자
    >
      {/* 제목 */}
      <div className="text-center" style={{ marginBottom: '0px' }}>
        <h3 className="text-[#00A3E0] text-[28px] font-bold">{title}</h3>
      </div>
      
      {/* 설명 텍스트 */}
      <p className="text-black text-[22px] text-center mb-6 font-black" style={{ marginTop: '0px' }}>
        {description}
      </p>
      
      {/* 이미지 영역 */}
      <div className="w-full h-[200px] bg-gray-100 rounded-[16px] overflow-hidden flex items-end justify-center">
        {image ? (
                  <img 
          src={image} 
          alt={title}
          className="object-cover rounded-[12px]"
          style={{ width: '300px', height: '180px' }}
        />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            이미지 영역
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
