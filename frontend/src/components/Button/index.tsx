import { ComponentProps } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { BsPlusLg } from "react-icons/bs";
import { IoChatbubbleSharp } from "react-icons/io5";

import { cn } from "@/utils/cn";

const buttonCSS = cva(
  "delay-50 h-auto	w-fit rounded-sm px-[11px] py-[8px] text-base font-light drop-shadow-base transition duration-100",
  {
    variants: {
      variant: {
        primary:
          "cursor-pointer bg-primary text-white disabled:border-gray-light disabled:bg-gray-light disabled:text-gray-dull",
        outlined:
          "border border-white bg-white text-gray-dark disabled:border-gray-light disabled:bg-gray-light disabled:text-gray-dull",
        underlined:
          "underline underline-offset-4 drop-shadow-none disabled:text-gray-400", // underline의 경우 custom으로 색상 조정하기
        add: "flex flex-row items-center gap-1.5 border border-primary bg-white text-primary drop-shadow-none disabled:border-gray-light disabled:bg-gray-light disabled:text-gray-dull",
        kakao:
          "flex flex-row items-center gap-1.5 bg-kakaoBG px-16 py-3 font-semibold text-kakaoFont drop-shadow-none disabled:border-gray-light disabled:bg-gray-light disabled:text-gray-dull",
        custom: "px-0 py-0 drop-shadow-none",
        icon: "px-0 py-0 drop-shadow-none",
      },
    },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonCSS>;

const Button = ({
  variant,
  type,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={cn(buttonCSS({ variant }), className)}
      {...props}
    >
      {variant === "add" && <BsPlusLg size={20} />}
      {variant === "kakao" && <IoChatbubbleSharp size={20} />}
      {children}
    </button>
  );
};

export default Button;
