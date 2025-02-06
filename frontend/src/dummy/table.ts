import { getTableBody, getTableHeader } from "@/utils/table";

export const titleList = ["날짜", "시간", "장소", "사용목적", "상태", ""];
export const contentList = [
  [
    { data: `2024 / 02 / 23 ~ 2024 / 12 / 31 \n매주 수요일` },
    { data: "21:00 ~ 23:00" },
    { data: "[3층] 301호 (P.W / POEM)" },
    { data: "대청 주일 예배팀 연습" },
    { data: "승인 대기" },
    { data: "취소", method: () => alert("click") },
  ],
];
export const tempHeader = getTableHeader(titleList);

export const tempBody = getTableBody(titleList, contentList);
