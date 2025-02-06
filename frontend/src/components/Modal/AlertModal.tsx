import { PropsWithChildren } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";

interface AlertModalProps extends PropsWithChildren {
  onClose: () => void;
}

const AlertModal = ({ children, onClose }: AlertModalProps) => {
  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="relative z-50 flex h-[211px] w-[385px] flex-col items-center justify-center px-8 py-6">
        <div className="fixed right-3 top-3 p-2">
          <Button variant="icon">
            <AiOutlineClose size={18} onClick={onClose} />
          </Button>
        </div>
        <p className="break-keep pb-4 text-xl font-light text-primary">
          {children}
        </p>
        <div className="fixed bottom-6">
          <Button variant="primary" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AlertModal;
