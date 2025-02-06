import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

interface InputLabelProps extends ComponentPropsWithoutRef<"label"> {
  text: string;
  isRequired: boolean;
}

const InputLabel = ({
  text,
  isRequired,
  className,
  ...props
}: InputLabelProps) => {
  return (
    <label className={cn("text-md", className)} {...props}>
      {text}
      {isRequired && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
export default InputLabel;
