import { ComponentProps } from "react";

/* Modal Open 시에 뒤에 배경으로 깔리는 검정색 반투명 배경입니다. */
const BGInModal = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      id="modal-background"
      className="absolute left-0 top-0 z-20 h-full w-full bg-black opacity-50"
      {...props}
    ></div>
  );
};

export default BGInModal;
