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
<<<<<<< HEAD
      className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      style={{ width: '380px', height: '459px' }} // 카드 크기 설정
=======
      className="bg-white rounded-[24px] p-10 shadow-lg border border-black hover:shadow-xl transition-shadow duration-300"
      style={{ width: '420px', height: '480px' }} // 카드 크기 설정 높이 조정하기 역할
>>>>>>> feat/sumin-portfolio
    >
      {/* 제목 */}
      <div className="text-center mb-4">
        <h3 className="text-[#00A3E0] text-[20px] font-bold">{title}</h3>
      </div>
      
      {/* 설명 텍스트 */}
      <p className="text-black text-[16px] text-center mb-6 font-medium">
        {description}
      </p>
      
      {/* 이미지 영역 */}
<<<<<<< HEAD
      <div className="w-full h-[200px] bg-gray-100 rounded-[16px] overflow-hidden">
=======
      <div className="w-full h-[200px] bg-gray-100 rounded-[16px] overflow-hidden flex items-end justify-center">
>>>>>>> feat/sumin-portfolio
        {image ? (
          <img 
            src={image} 
            alt={title}
<<<<<<< HEAD
            className="w-full h-full object-cover"
=======
            className="w-[80%] h-full object-cover rounded-[12px]"
>>>>>>> feat/sumin-portfolio
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
