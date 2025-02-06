export type Place = {
  cpsCd?: string; // 캠퍼스 Code : 현재는 평택온누리만 있으므로 PTK로 고정
  bldCd?: string; // 빌딩 Code : 현재는 평택온누리 교회에 건물 하나이므로 PTK_PTK로 고정
  plcCd: string; // 장소 Code
  plcF: number; // 층 number
  plcNm: string; // 장소 Name
};
