import { PropsWithChildren } from "react";

import login from "@/assets/images/login.png";
import useLoginCheck from "@/hooks/useLoginCheck";
import useLoginStore from "@/store/loginStore";

const LoginLayout = ({ children }: PropsWithChildren) => {
  const { kakaoToken } = useLoginStore();
  useLoginCheck(kakaoToken);

  return (
    <div className="mx-auto my-auto flex h-screen w-max items-center justify-center overflow-scroll">
      <section className="flex h-[641px] w-auto flex-row rounded-[5px] border border-gray-light shadow-md lg:w-[953px]">
        <div className="relative hidden h-full w-[466px] lg:block">
          <img
            src={login}
            className="h-full w-full rounded-l-[5px] object-cover"
          />
          <div className="absolute right-0 top-0 h-full w-full rounded-l-[5px] bg-loginBG/45 px-12 py-20 text-white">
            <p className="text-[16px]">Shalom!</p>
            <p className="text-[20px] font-bold">평택 온누리교회 장소 예약</p>
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-12 pb-0 text-center">
              <div className="flex flex-col items-center justify-center text-small">
                <p>
                  “하나님의 나라를 전파하며 주 예수 그리스도에 관한 <br />
                  모든 것을 담대하게 거침없이 가르치더라”
                </p>
                <br />
                <p>사도행전 28:31</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full w-auto flex-col items-center justify-center px-12 lg:w-1/2">
          {children}
        </div>
      </section>
    </div>
  );
};

export default LoginLayout;
