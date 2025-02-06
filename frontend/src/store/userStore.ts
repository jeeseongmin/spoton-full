import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserAction, UserState } from "@/types/store/userStore";

const initialState: UserState = {
  cpsCd: "", // 캠퍼스 코드
  cmtCd: "", // 공동체 코드
  garCd: "", // 다락방 코드
  leafCd: "", // 순 코드
  email: "", // default email
  cmtNm: "", // 공동체명
  garNm: "", // 다락방명
  leafNm: "", // 순명
  roleId: "", // 역할명
  telNo: "", // 전화번호
  userName: "", // 사용자 이름
};

const useUserStore = create(
  persist<UserState & UserAction>(
    set => ({
      ...initialState,
      saveUserInfo: (userInfo: UserState) =>
        set({
          cmtCd: userInfo.cmtCd, // 공동체 코드
          cpsCd: userInfo.cpsCd, // 캠퍼스 코드
          garCd: userInfo.garCd, // 다락방 코드
          leafCd: userInfo.leafCd, // 순 코드
          email: userInfo.email,
          cmtNm: userInfo.cmtNm, // 공동체명
          garNm: userInfo.garNm, // 다락방명
          leafNm: userInfo.leafNm, //순명
          roleId: userInfo.roleId, // 역할명
          telNo: userInfo.telNo, // 전화번호
          userName: userInfo.userName, // 사용자 이름
        }),
      resetUserInfo: () =>
        set({
          cmtCd: "",
          cpsCd: "",
          garCd: "",
          leafCd: "",
          email: "",
          cmtNm: "",
          garNm: "",
          leafNm: "",
          roleId: "",
          telNo: "",
          userName: "",
        }),
    }),
    {
      name: "userStorage",
    },
  ),
);

export default useUserStore;
