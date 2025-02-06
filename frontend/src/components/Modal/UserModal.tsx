import { Children, ComponentPropsWithoutRef } from "react";

import ModalLayout from "@/components/Layout/ModalLayout";
import { PropsWithRequiredChildren } from "@/types/common";
import { cn } from "@/utils/cn";

interface ModalContentProps extends ComponentPropsWithoutRef<"div"> {}

interface UserModalProps extends PropsWithRequiredChildren {
  onClose: () => void;
}

const Header = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex h-32 flex-col justify-center gap-2 rounded-sm bg-primary px-8 text-xl font-light text-white">
    {children}
  </div>
);

const Content = ({ children, className }: ModalContentProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

const Footer = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex items-center justify-center gap-4 pb-8">{children}</div>
);

const UserModal = ({ children, onClose }: UserModalProps) => {
  const [headerChildren, contentChildren, footerChildren] =
    Children.toArray(children);

  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="w-[507px]">
        {headerChildren}
        {contentChildren}
        {footerChildren}
      </div>
    </ModalLayout>
  );
};

UserModal.Header = Header;
UserModal.Content = Content;
UserModal.Footer = Footer;

export default UserModal;
