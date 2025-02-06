import type { Dayjs } from "dayjs";

import type { DailyReservation } from "@/types/reservation";

export type CalendarState = {
  date: Dayjs;
  firstDayOfMonth: Dayjs;
  monthlyReservations: DailyReservation[];
};

export type CalendarAction = {
  setDate: (_date: Dayjs) => void;
  setFirstDayOfMonth: (_firstDayOfMonth: Dayjs) => void;
  setMonthlyReservations: (_monthlyReservations: DailyReservation[]) => void;
  resetCalendar: () => void;
  resetFirstDayOfMonth: () => void;
};
