import dayjs from "dayjs";

export const daysOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
export const daysOfTheWeekByEnglish = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const orderText = [
  "",
  "첫째 주",
  "둘째 주",
  "셋째 주",
  "넷째 주",
  "다섯째 주",
];

export const cycleTypeByEnglish = ["daily", "weekly", "monthly"];
export const cycleTypeByKorean = ["매일", "매주", "매월"];

export const scheduleYears = Array.from(
  { length: 3 },
  (_, i) => dayjs().year() - 2 + i,
);
export const reservationYears = [dayjs().year()];
export const months = Array.from({ length: 12 }, (_, i) => i);
