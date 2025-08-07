import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ClientContactForm from "./ClientContactForm";
import RecruitApplyForm from "./RecruitApplyForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: "client" | "recruit";
}

const ContactModal = ({ isOpen, onClose, type }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 배경 블러 & 어둡게 */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-200" />
        </Transition.Child>

        {/* 모달 콘텐츠 (가운데 위치) */}
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
              {/* X CLOSE 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-xs text-[#0168b7] font-bold uppercase"
              >
                X CLOSE
              </button>

              {/* 제목 */}
              <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                {type === "client" ? "고객사 문의" : "인재 채용 지원"}
              </Dialog.Title>

              {/* 폼 삽입 */}
              {type === "client" ? <ClientContactForm /> : <RecruitApplyForm />}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactModal;
