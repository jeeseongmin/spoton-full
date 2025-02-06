import { PropsWithChildren } from "react";

const MyPageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full p-4">
      <div className="flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default MyPageWrapper;
