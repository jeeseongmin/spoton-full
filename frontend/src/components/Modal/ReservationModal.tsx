import { Children, ComponentPropsWithoutRef } from "react";

import ModalLayout from "@/components/Layout/ModalLayout";
import { PropsWithRequiredChildren } from "@/types/common";
import { cn } from "@/utils/cn";

interface ModalContentProps extends ComponentPropsWithoutRef<"div"> {}

interface ReservationModalProps extends PropsWithRequiredChildren {
  onClose: () => void;
}

const Header = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex h-32 flex-col justify-center gap-2 rounded-sm bg-primary px-8 text-xl font-light text-white">
    {children}
  </div>
);

const Content = ({ children, className }: ModalContentProps) => (
  <div className={cn("max-h-[70vh] overflow-y-scroll p-4", className)}>
    {children}
  </div>
);

const Footer = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex h-fit items-center justify-center gap-4 pb-8 pt-4">
    {children}
  </div>
);

const ReservationModal = ({ children, onClose }: ReservationModalProps) => {
  const [headerChildren, contentChildren, footerChildren] =
    Children.toArray(children);

  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="flex h-full min-w-60 flex-col md:w-[507px]">
        {headerChildren}
        {contentChildren}
        {footerChildren}
      </div>
    </ModalLayout>
  );
};

ReservationModal.Header = Header;
ReservationModal.Content = Content;
ReservationModal.Footer = Footer;

export default ReservationModal;
