import { PropsWithChildren } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";

interface ConfirmModalProps extends PropsWithChildren {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  children,
  title,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="relative flex h-[211px] w-[385px] flex-col items-center justify-center px-8 py-6">
        <div className="fixed right-3 top-3 p-2">
          <Button variant="icon">
            <AiOutlineClose size={18} onClick={onClose} />
          </Button>
        </div>
        <div className="flex flex-col gap-2 pb-8 text-center">
          <p className="text-xl text-primary">{title}</p>
          <p className="break-keep">{children}</p>
        </div>

        <div className="fixed bottom-6 flex flex-row gap-4">
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
