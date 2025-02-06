import { axiosInstance } from "@/apis/core";
import type { UpdateUserInfoRequest, UserStateRequest } from "@/types/user";

export const putUserState = async (userStateRequest: UserStateRequest) => {
  try {
    await axiosInstance.put(
      "/user-service/api/v1/users/state/change",
      userStateRequest,
    );
  } catch (error) {
    console.error(error);
  }
};

// spotOnToken으로 유저 정보를 가져오는 api
export const getUserInfo = async (spotOnToken: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/user-service/api/v1/users/info/${spotOnToken}`,
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 회원정보 수정 api
export const updateUserInfo = async (
  tokenId: string,
  updateUserInfoRequest: UpdateUserInfoRequest,
) => {
  try {
    await axiosInstance.put(
      `/user-service/api/v1/users/info/${tokenId}`,
      updateUserInfoRequest,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postUsersByState = async (
  page: number = 0,
  size: number = 10,
  userStateCode: string = "",
) => {
  try {
    const res = await axiosInstance.post(
      "/user-service/api/v1/users/list/page",
      {
        cpsCd: "PTK",
        userStateCode,
      },
      {
        params: {
          page,
          size,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
