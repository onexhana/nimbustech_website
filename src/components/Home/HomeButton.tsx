
import { useState } from 'react';
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
  // 클릭된 버튼 인덱스를 추적하고, 모두 클릭되었을 때 모달을 표시합니다.
  const [clickedSet, setClickedSet] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  
  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    console.log('Closing modal');
    setShowModal(false);
    setClickedSet(new Set());
  };
  
  // 버튼 클릭 핸들러: 클릭 인덱스를 집합에 추가하고, 모든 버튼 클릭 시 모달을 띄웁니다.
  const handleButtonClick = (idx: number) => {
    console.log('Button clicked:', idx);
    setClickedSet(prev => {
      const newSet = new Set(prev);
      newSet.add(idx);
      if (newSet.size === buttons.length) {
        setShowModal(true);
      }
      return newSet;
    });
  };
  
  // 모달 포탈 렌더링 (모든 버튼 클릭 시)
  const renderModal = () => {
    if (!showModal) return null;
    return createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">축하합니다!</h2>
            <p className="text-gray-700">모든 버튼을 클릭하셨습니다.</p>
          </div>
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
              className={`aspect-square w-full flex flex-col cursor-pointer justify-center p-8 text-center transition-colors border-b border-gray-200 ${idx !== buttons.length - 1 ? 'border-r' : ''} ${clickedSet.has(idx) ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
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
