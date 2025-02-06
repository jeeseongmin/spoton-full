import dayjs, { Dayjs } from "dayjs";

import { spotOnLogin } from "@/apis/login";

/**
 * 로그인 화면 상에서 이미 로그인되어있는지를 확인하여 홈 화면으로 보내주는 작업
 * @param kakaoToken
 * @param expiredAt
 * @returns
 */
export const isValidLogin = async (
  kakaoToken: string,
  expiredAt: Dayjs | null,
) => {
  const { status } = await spotOnLogin(kakaoToken);
  // 토큰이 유효하고, 회원가입이 이미 되어있으며,
  if (status === 200 && expiredAt && dayjs().isAfter(expiredAt)) {
    // 유효한 로그인
    return true;
  } else {
    // 유효하지 않은 로그인
    return false;
  }
};
