import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { spotOnLogin } from "@/apis/login";
import {
  HOME_MAIN_URL,
  LOGIN_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
} from "@/constants/routes";
import useLoginStore from "@/store/loginStore";

const useLoginCheck = (kakaoToken: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveSpotOnToken, saveTokenId } = useLoginStore();

  useEffect(() => {
    if (location.pathname !== "/kakao/auth") {
      if (kakaoToken.length > 0) {
        loginCheck();
      } else if (location.pathname !== "/login/main") {
        navigate(LOGIN_MAIN_URL);
      }
    }
  }, [kakaoToken]);

  const loginCheck = async () => {
    // 추후 api에서 token 값 전달받을 예정
    const { status, token, tokenId } = await spotOnLogin(kakaoToken);

    // 회원가입이 안된 경우
    if (status === 412) {
      navigate(LOGIN_SIGNUP_URL, { state: kakaoToken });
    }
    // 회원가입이 된 경우 && 승인이 된 경우
    else if (status === 200) {
      // 로그인 후 정보 저장
      saveSpotOnToken(token);
      saveTokenId(tokenId);

      if (location.pathname.includes("/login")) {
        navigate(HOME_MAIN_URL);
      }
      // navigate(HOME_MAIN_URL);
    }
    // 회원가입이 된 경우 && 승인이 안된 경우
    else if (status === 400) {
      navigate(LOGIN_QR_URL);
    }
    // provider가 유효하지 않은 경우
    else if (status === 1000) {
      // 집사님께 요청드려야 함.
    }
    // 토큰이 유효하지 않은 경우
    else if (status === 403) {
      // 에러 창 필요
    }
  };

  return <div></div>;
};

export default useLoginCheck;
