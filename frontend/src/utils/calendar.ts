import dayjs, { Dayjs } from "dayjs";

/**
 * 첫쨰 날을 기준으로 해당 달의 주차 데이터를 가져오는 함수
 */
export const getWeeks = (firstDayOfMonth: Dayjs) => {
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const lastDayOfMonth = firstDayOfMonth.date(daysInMonth);

  const previousMonthDays = Array.from(
    { length: firstDayOfMonth.day() },
    (_, i) => firstDayOfMonth.date(firstDayOfMonth.day() * -1 + i + 1),
  );

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) =>
    firstDayOfMonth.date(i + 1),
  );

  const nextMonthDays = Array.from(
    { length: 6 - lastDayOfMonth.day() },
    (_, i) => firstDayOfMonth.date(daysInMonth + i + 1),
  );

  const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  const weeks = Array.from({ length: days.length / 7 }, (_, i) => [
    ...days.slice(i * 7, (i + 1) * 7),
  ]);

  return weeks;
};

/**
 * 해당 달에서 몇 번째 주의 요일인지를 가져오는 함수
 */
export const getWeekOrder = (day: Dayjs = dayjs()) => {
  let _day = day;
  let cnt = 1;
  for (let i = 0; i < 5; i++) {
    _day = _day.subtract(1, "week");
    if (_day.month() !== day.month()) {
      return cnt;
    } else cnt++;
  }
};

export const getDaysUntilNextMonth = (date: Dayjs = dayjs()) =>
  dayjs(date).add(1, "month").diff(date, "day");
