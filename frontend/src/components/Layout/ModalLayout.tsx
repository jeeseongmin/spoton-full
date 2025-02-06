import { ComponentPropsWithRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import ReactDOM from "react-dom";

import BGInModal from "@/components/Modal/BGInModal";
import { PropsWithRequiredChildren } from "@/types/common";
import { cn } from "@/utils/cn";

const ModalPortal = ({ children }: PropsWithRequiredChildren) => {
  const element = document.getElementById("modal-root") as HTMLElement;

  return ReactDOM.createPortal(children, element);
};

const modalCSS = cva("", {
  variants: {
    variant: {
      primary:
        "absolute left-1/2 top-1/2 z-30 h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white shadow-lg",
      sidebar:
        "absolute right-0 top-0 z-30 flex h-full w-2/3 flex-col bg-white shadow-lg",
    },
  },
});

interface ModalProps
  extends VariantProps<typeof modalCSS>,
    ComponentPropsWithRef<"div"> {
  onClose: () => void; // useModal hooks에서 onClose를 가져와서 넘겨받는 props
}

/** Modal의 Wrapper에 해당하는 부분을 Layout Component로 개발했습니다.
    기본적으로 primary variant 사용하면 되고, 모달 내 컨텐츠는 크기를 알맞게 커스텀해서 사용하면 됩니다. (AlertModal 참고)
*/
const ModalLayout = ({
  children,
  onClose,
  className,
  ...props
}: ModalProps) => {
  const { variant } = props;

  return (
    <ModalPortal>
      <div
        className="fixed left-0 top-0 z-50 h-full max-h-screen w-full transition delay-150 ease-in-out"
        {...props}
      >
        <div className={cn(modalCSS({ variant }), className)}>{children}</div>
        <BGInModal onClick={onClose} />
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
