import { Children } from "react";

import { ReservationLabel } from "@/pages/Reservation";
import { PropsWithRequiredChildren } from "@/types/common";
import { cn } from "@/utils/cn";

interface LayoutProps extends PropsWithRequiredChildren {
  title: string;
  errorMessage?: string;
  isLabel?: boolean;
}

const Left = ({ children, title }: LayoutProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 border-b border-gray-middle p-4 md:w-1/2 md:border-b-0 md:border-r lg:px-12",
      )}
    >
      <ReservationLabel>{title}</ReservationLabel>
      {children}
    </div>
  );
};

const Right = ({ children, title }: LayoutProps) => {
  return (
    <div
      className={cn(
        "flex max-h-96 w-full flex-col gap-2 p-4 md:z-0 md:w-1/2 lg:px-12",
      )}
    >
      <ReservationLabel>{title}</ReservationLabel>
      {children}
    </div>
  );
};

const Bottom = ({
  children,
  title,
  errorMessage,
  isLabel = false,
}: LayoutProps) => (
  <div className="flex h-fit flex-col p-4 lg:px-12">
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
      <ReservationLabel>{title}</ReservationLabel>
      {children ? (
        isLabel && (
          <div className="mb-4 flex flex-1 justify-start gap-4 text-small font-light lg:mb-0 lg:justify-end">
            <div className="flex flex-row items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-light"></div>
              <div>예약 불가</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-light"></div>
              <div>예약 진행 중</div>
            </div>
          </div>
        )
      ) : (
        <div className="text-small text-red-light">{errorMessage}</div>
      )}
    </div>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const ReservationTabLayout = ({ children }: PropsWithRequiredChildren) => {
  const [leftChildren, rightChildren, bottomChildren] =
    Children.toArray(children);

  return (
    <div>
      <div className="flex h-fit flex-col border-b border-b-gray-middle md:h-96 md:flex-row">
        {leftChildren}
        {rightChildren}
      </div>
      {bottomChildren}
    </div>
  );
};

ReservationTabLayout.Right = Right;
ReservationTabLayout.Left = Left;
ReservationTabLayout.Bottom = Bottom;

export default ReservationTabLayout;
