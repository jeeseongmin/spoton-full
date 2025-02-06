import { HttpResponse, http } from "msw";

// msw 내 GET API 테스트를 위한 임시 API
// 추후 삭제 예정
export const getHandler = async () => {
  return HttpResponse.json({
    data: "haha",
  });
};
export const getAPI = http.get("/gets", getHandler);
