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
      className="rounded-[24px] p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      style={{ 
        width: '380px', 
        height: '459px',
        backgroundColor: '#f9fafb' // AboutCard와 동일한 배경색
      }}
    >
      {/* 제목 */}
      <div className="text-center mb-4">
        <h3 className="text-[#00A3E0] text-[20px] font-bold">{title}</h3>
      </div>
      
      {/* 설명 텍스트 */}
      <p className="text-center mb-6 font-medium"
         style={{ 
           color: '#374151', // AboutCard와 동일한 텍스트 색상
           fontSize: '16px'
         }}>
        {description}
      </p>
      
      {/* 이미지 영역 */}
      <div className="w-full h-[200px] bg-gray-100 rounded-[16px] overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
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
