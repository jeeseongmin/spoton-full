export type UserState = {
  cmtCd: string; // 공동체명
  cpsCd: string; // 캠퍼스 코드
  garCd: string; // 다락방 코드
  leafCd: string; // 순 코드
  cmtNm: string; // 캠퍼스명
  garNm: string; // 다락방명
  leafNm: string; // 순명
  email?: string; // 이메일
  roleId: string; // 역할명
  telNo: string; // 전화번호
  userName: string; // 사용자 이름
};

export type UserAction = {
  saveUserInfo: (userInfo: UserState) => void;
  resetUserInfo: () => void;
};
