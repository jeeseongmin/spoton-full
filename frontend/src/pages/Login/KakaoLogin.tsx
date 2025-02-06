import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchKakaoToken, spotOnLogin } from "@/apis/login";
import { fetchCommunity, fetchGarret, fetchLeaf } from "@/apis/organization";
import { getUserInfo } from "@/apis/user";
import Button from "@/components/Button";
import {
  HOME_MAIN_URL, // HOME_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
} from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

// /kakao/auth
const KakaoLogin = () => {
  const { kakaoToken, saveKakaoToken, saveSpotOnToken, saveTokenId } =
    useLoginStore();
  const { saveUserInfo } = useUserStore();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  useEffect(() => {
    getAccessCode();
  }, []);

  useEffect(() => {
    if (accessCode.length > 0) {
      getKakaoToken(accessCode);
    }
  }, [accessCode]);

  useEffect(() => {
    if (kakaoToken.length > 0) {
      getSpotOnToken();
    }
  }, [kakaoToken]);

  const getAccessCode = () => {
    const code = searchParams.get("code");
    if (code && code.length > 0) {
      setAccessCode(code);
    }
  };

  /* Access Code로 Access Token 받아오는 Kakao  API */
  const getKakaoToken = async (code: string) => {
    const token = await fetchKakaoToken(code);

    if (token) {
      saveKakaoToken(token);
    }
  };

  /** 카카오 로그인이 된 이후에 spotOn 로그인 시도 */
  const getSpotOnToken = async () => {
    // 추후 api에서 token 값 전달받을 예정
    const { status, token, tokenId } = await spotOnLogin(kakaoToken);

    // 회원가입이 안된 경우
    if (status === 412) {
      navigate(LOGIN_SIGNUP_URL, { state: kakaoToken });
    }
    // 회원가입이 된 경우 && 승인이 된 경우
    else if (status === 200) {
      const info = await getUserInfo(tokenId);
      const { cmtCd, garCd, leafCd } = info;
      let cmtNm, garNm, leafNm;
      (await fetchCommunity()).map((elem: any) => {
        if (elem.cmtCd === cmtCd) {
          cmtNm = elem.cmtNm;
        }
      });
      (await fetchGarret(cmtCd)).map((elem: any) => {
        if (elem.garCd === garCd) {
          garNm = elem.garNm;
        }
      });
      (await fetchLeaf(cmtCd, garCd)).map((elem: any) => {
        if (elem.leafCd === leafCd) {
          leafNm = elem.leafNm;
        }
      });
      const userInfo = {
        ...info,
        cmtNm,
        garNm,
        leafNm,
      };

      // 로그인 후 정보 저장
      saveUserInfo(userInfo);
      saveSpotOnToken(token);
      saveTokenId(tokenId);
      navigate(HOME_MAIN_URL);
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

  return (
    <LoginLayout>
      <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-white opacity-60">
        <div role="status" className="flex w-12 flex-row justify-center">
          <svg
            aria-hidden="true"
            className="h-24 w-24 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-[31px]">
        <h1 className="text-[32px] font-bold">Kakao</h1>
        <div className="text-center text-[15px]">
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>
        <Button variant="kakao">카카오톡으로 로그인 / 회원가입</Button>
      </div>
    </LoginLayout>
  );
};

export default KakaoLogin;
