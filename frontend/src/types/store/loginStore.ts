import { Dayjs } from "dayjs";

export type LoginState = {
  kakaoToken: string;
  spotOnToken: string;
  tokenId: string;
  expiredAt: Dayjs | null; //
};

export type LoginAction = {
  saveSpotOnToken: (spotOnToken: string) => void;
  saveKakaoToken: (kakaoToken: string) => void;
  saveTokenId: (tokenId: string) => void;
  logout: () => void;
};
