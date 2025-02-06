import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LoginAction, LoginState } from "@/types/store/loginStore";

const initialState: LoginState = {
  kakaoToken: "", // kakao api에 쓰이는 Token
  spotOnToken: "", // spotOn api에 쓰이는 token
  tokenId: "",
  expiredAt: null,
};

const useLoginStore = create(
  persist<LoginState & LoginAction>(
    set => ({
      ...initialState,
      saveKakaoToken: (kakaoToken: string) =>
        set({
          kakaoToken,
        }), // 카카오 토큰 저장
      saveSpotOnToken: (spotOnToken: string) =>
        set({
          spotOnToken,
          expiredAt: dayjs().add(6, "hour"),
        }), // 서비스 토큰 저장 및 기본적으로 6시간 뒤로 설정
      saveTokenId: (tokenId: string) =>
        set({
          tokenId,
        }), // token-id 저장
      logout: () =>
        set({
          kakaoToken: "",
          spotOnToken: "",
          tokenId: "",
          expiredAt: null,
        }),
    }),
    {
      name: "loginStorage",
    },
  ),
);

export default useLoginStore;
