import { ComponentPropsWithoutRef } from "react";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

interface TableFilterButton extends ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
  isNew?: boolean;
}

const TableFilterButton = ({
  children,
  isActive = false,
  className,
  isNew = false,
  ...props
}: TableFilterButton) => {
  return (
    <Button
      variant="custom"
      className={cn(
        "relative w-12 break-keep rounded-sm border border-gray-middle bg-white p-0 text-black",
        isActive && "border-primary bg-primary font-light text-white",
        className,
      )}
      {...props}
    >
      {children}
      {isNew && (
        <div className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
          N
        </div>
      )}
    </Button>
  );
};

export default TableFilterButton;
