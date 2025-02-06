import { ComponentPropsWithoutRef, forwardRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { IoSearch } from "react-icons/io5";

import { cn } from "@/utils/cn";

const inputCSS = cva(
  "flex w-full flex-row items-center justify-center rounded-sm border border-gray-dull px-3 py-2.5 text-sm font-light text-black placeholder:text-gray-middle disabled:bg-white-dull disabled:font-light disabled:text-gray-black",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends VariantProps<typeof inputCSS>,
    ComponentPropsWithoutRef<"input"> {
  isSearch?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, isSearch, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(inputCSS({ variant }), className)}
          {...props}
        />
        {isSearch && (
          <div className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-primary">
            <IoSearch size={22} />
          </div>
        )}
      </div>
    );
  },
);

export default Input;
