export interface User {
  id: string;
  userName: string;
  telNo: string;
  cmtNm: string;
  garNm: string;
  leafNm: string;
  cmtCd: string;
  garCd: string;
  leafCd: string;
}

export type UserResponse = {
  cmtCd: string;
  cmtNm: string;
  cpsCd: string;
  createdDate: string;
  email: string;
  garCd: string;
  garNm: string;
  lastLoginDate: string;
  laefCd: string;
  leafNm: string;
  loginFailCount: number;
  roleId: string;
  roleName: string;
  telNo: string;
  userId: string;
  userName: string;
  userStateCode: string;
  userStateCodeName: string;
};

/**
 * 사용자 상태 코드
 *
 * 00: 대기
 * 01: 정상
 * 07: 정지
 * 08: 탈퇴
 * 09: 삭제
 */
export type UserStateCode = "00" | "01" | "07" | "08" | "09";
export interface UserStateRequest {
  userId: string;
  userStateCode: string;
}

export interface UserByState
  extends Omit<UserResponse, "bldCd" | "crtId" | "crDt" | "updId" | "updDt"> {
  userName: string;
  telNo: string;
  cmtCd: string;
  cmtNm: string;
  garCd: string;
  garNm: string;
  leafCd: string;
  leafNm: string;
}

export interface UpdateUserInfoRequest {
  provider: "kakao";
  token: string;
  userName: string;
  email: string;
  telNo: string;
  cpsCd: string; // "PTK";
  cmtCd: string; // "FAITH";
  garCd: string; // "MATTHEW";
  leafCd: string; // "MATTHEW_01";
  cmtNm: string; // "FAITH";
  garNm: string; // "MATTHEW";
  leafNm: string; // "MATTHEW_01";
}
