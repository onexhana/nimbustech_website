import { useState, useEffect } from "react";

interface ButtonItem {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  imagePath: string;
}

const buttons: ButtonItem[] = [
  {
    title: "Mission&Vision",
    subtitle: "미션&비전",
    description: "우리의 존재 이유와 향하는 미래를 담습니다.",
    link: "/#about",
    imagePath: "/popup_image/Mission&Vision.jpg",
  },
  {
    title: "Core Values",
    subtitle: "핵심가치",
    description: "고객과 함께 성장하는 신뢰·책임·전문성의 가치",
    link: "/#about",
    imagePath: "/popup_image/Core%20Values.jpg",
  },
  {
    title: "Way of Working",
    subtitle: "일하는 방식",
    description: '모든 일의 궁극적인 목적은 "고객창출" 곧 "고객성공"이다!',
    link: "/#about",
    imagePath: "/popup_image/Way%20of%20Working.jpg",
  },
  {
    title: "Employee Benefits",
    subtitle: "복지 혜택",
    description:
      "최고의 열정과 패기를 갖춘 인재들과 함께 일하고 성장하는 기업",
    link: "/#about",
    imagePath: "/popup_image/Employee%20Benefits.jpg",
  },
];

export default function HomeButton() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedIdx !== null) {
        setSelectedIdx(null);
      }
    };

    if (selectedIdx !== null) {
      document.addEventListener('keydown', handleEscKey);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIdx]);

  const handleCloseModal = () => {
    setSelectedIdx(null);
  };

  const handleButtonClick = (idx: number) => {
    setSelectedIdx(idx);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderModal = () => {
    if (selectedIdx === null) return null;
    const idx = selectedIdx;
    const selectedButton = buttons[idx];
    
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999998
        }}
        onClick={handleBackdropClick}
      >
        <div 
          style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            maxWidth: '1024px',
            width: '100%',
            margin: '16px',
            maxHeight: '90vh',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* X 버튼 */}
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            aria-label="모달 닫기"
          >
            ✕
          </button>
          
          {/* 이미지 컨테이너 */}
          <div style={{ width: '100%' }}>
            <img
              src={selectedButton.imagePath}
              alt={selectedButton.subtitle}
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain',
                maxHeight: '85vh'
              }}
              onLoad={() => {}}
              onError={() => {}}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderModal()}
      <div className="w-full bg-white">
        <div className="grid grid-cols-4 border-t border-gray-200">
          {buttons.map((btn, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleButtonClick(idx)}
                className={`aspect-square w-full flex flex-col cursor-pointer justify-center p-8 text-center transition-colors border-b border-gray-200 ${
                  idx !== buttons.length - 1 ? "border-r" : ""
                } ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <div className="mb-2">
                  <h3
                    className={`font-medium text-2xl transition-colors ${
                      isSelected
                        ? "text-[#00A3E0]"
                        : "text-black hover:text-[#00A3E0]"
                    }`}
                  >
                    {btn.title}
                  </h3>
                  <p
                    className={`text-5xl font-bold mt-1 transition-colors ${
                      isSelected
                        ? "text-[#00A3E0]"
                        : "text-black hover:text-[#00A3E0]"
                    }`}
                  >
                    {btn.subtitle}
                  </p>
                </div>
                <p
                  className={`text-xl mt-2 leading-tight transition-colors ${
                    isSelected
                      ? "text-[#00A3E0]"
                      : "text-gray-600 hover:text-[#00A3E0]"
                  }`}
                >
                  {btn.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full py-16 bg-gray-100 text-center">
          <h2 className="text-5xl text-gray-300 font-light">
            Leading Customer Success
          </h2>
        </div>
      </div>
    </>
  );
}
