
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ButtonItem {
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

const buttons: ButtonItem[] = [
  {
    title: 'Mission&Vision',
    subtitle: '미션&비전',
    description: '우리의 존재 이유와 향하는 미래를 담습니다.',
    link: '/#about',
  },
  {
    title: 'Core Values',
    subtitle: '핵심가치',
    description: '고객과 함께 성장하는 신뢰·책임·전문성의 가치',
    link: '/#about',
  },
  {
    title: 'Way of Working',
    subtitle: '일하는 방식',
    description: '모든 일의 궁극적인 목적은 "고객창출" 곧 "고객성공"이다!',
    link: '/#about',
  },
  {
    title: 'Employee Benefits',
    subtitle: '복지 혜택',
    description: '최고의 열정과 패기를 갖춘 인재들과 함께 일하고 성장하는 기업',
    link: '/#about',
  },
];

export default function HomeButton() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  // 상태 변경 디버깅을 위한 useEffect
  useEffect(() => {
    console.log('selectedIdx changed:', selectedIdx);
  }, [selectedIdx]);
  
  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedIdx(null);
  };
  
  // 버튼 클릭 핸들러
  const handleButtonClick = (idx: number) => {
    console.log('Button clicked:', idx);
    setSelectedIdx(idx);
  };
  
  // 모달 포탈 렌더링 (선택된 버튼이 있을 때만)
  const renderModal = () => {
    if (selectedIdx === null) return null;
    const idx = selectedIdx;
    return createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
          {idx === 0 ? (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">님버스테크의 <span className="text-[#00A3E0]">미션&비전</span></h2>
              <p className="text-gray-600">고객의 성공을 이끄는, 신뢰받는 디지털 파트너</p>
              <div className="flex items-center justify-between mt-6">
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-500 uppercase">MISSION</p>
                  <p className="text-xl font-semibold mt-2">미션</p>
                  <p className="mt-2 text-gray-700">신뢰성 높은 DT 서비스를 제공하여 고객 성공을 리딩한다.</p>
                </div>
                <div className="mx-8">
                  <img src="/logo.png" alt="Nimbus Tech" className="w-24 h-24 rounded-full" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-500 uppercase">VISION</p>
                  <p className="text-xl font-semibold mt-2">비전</p>
                  <p className="mt-2 text-gray-700">고객 성공을 리딩하는 DT Value Creator.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-medium text-[#00A3E0]">{buttons[idx].title}</h3>
              <p className="text-5xl font-bold mt-1">{buttons[idx].subtitle}</p>
              <p className="mt-4 text-gray-700">{buttons[idx].description}</p>
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Portal을 사용한 모달 렌더링 */}
      {renderModal()}
      {/* 버튼 그리드 */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-4 border-t border-gray-200">
          {buttons.map((btn, idx) => (
            <div
              key={idx}
              onClick={() => handleButtonClick(idx)}
              className={`aspect-square w-full flex flex-col cursor-pointer justify-center p-8 text-center transition-colors border-b border-gray-200 ${idx !== buttons.length - 1 ? 'border-r' : ''} ${selectedIdx === idx ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="mb-2">
                <h3 className="text-[#00A3E0] font-medium text-2xl">
                  {btn.title}
                </h3>
                <p className="text-5xl font-bold mt-1">
                  {btn.subtitle}
                </p>
              </div>
              <p className="text-xl text-gray-600 mt-2 leading-tight">
                {btn.description}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full py-16 bg-gray-100 text-center">
          <h2 className="text-5xl text-gray-300 font-light">Leading Customer Success</h2>
        </div>
      </div>
    </>
  );
}
