import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { HOME_MAIN_URL, LOGIN_MAIN_URL } from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";
import useLoginStore from "@/store/loginStore";
import { isValidLogin } from "@/utils/login";

declare global {
  interface Window {
    Kakao: any;
  }
}

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;

const LoginMain = () => {
  const navigate = useNavigate();
  const { kakaoToken, expiredAt } = useLoginStore();

  useEffect(() => {
    loginCheck();
  }, []);

  /**
   * 현재 가지고 있는 토큰의 유효성을 체크하는 함수
   */
  const loginCheck = async () => {
    const isValid = await isValidLogin(kakaoToken, expiredAt);
    if (isValid) {
      navigate(HOME_MAIN_URL);
    } else {
      navigate(LOGIN_MAIN_URL);
    }
  };

  useEffect(() => {
    // Initialize Kakao SDK
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_REST_API_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-[31px]">
        <h1 className="text-[32px] font-bold">Kakao</h1>
        <div className="text-center text-[15px]">
          <p className="block lg:hidden">평택온누리교회 장소예약 시스템을</p>
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>
        <Button variant="kakao" onClick={handleKakaoLogin}>
          카카오톡으로 로그인 / 회원가입
        </Button>
      </div>
    </LoginLayout>
  );
};

export default LoginMain;
