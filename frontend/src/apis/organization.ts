import { axiosInstance } from "@/apis/core";

/**
 * 조직 구성 : 캠퍼스(Campus) / 공동체(Community) / 다락방(garret) / 순(leaf)
 * 현재 평택 온누리교회만 있으므로 캠퍼스는 "PTK"로 고정
 */

// 캠퍼스 별 공동체 리스트 가져오기
export const fetchCommunity = async () => {
  try {
    const res = await axiosInstance.get(
      `/user-service/api/v1/community/list?cpsCd=PTK`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 공동체 별 다락방 목록 가져오기
export const fetchGarret = async (cmtCd: string) => {
  try {
    const res = await axiosInstance.get(
      `/user-service/api/v1/garret/list?cpsCd=PTK&cmtCd=${cmtCd}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 다락방 별 순 목록 가져오기
export const fetchLeaf = async (cmtCd: string, garCd: string) => {
  try {
    const res = await axiosInstance.get(
      `/user-service/api/v1/leaf/list?cpsCd=PTK&cmtCd=${cmtCd}&garCd=${garCd}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
