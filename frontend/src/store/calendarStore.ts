import dayjs from "dayjs";
import { create } from "zustand";

import { CalendarAction, CalendarState } from "@/types/store/calendarStore";

const initialState: CalendarState = {
  date: dayjs(),
  firstDayOfMonth: dayjs().date(1),
  monthlyReservations: [],
};

const useCalendarStore = create<CalendarState & CalendarAction>(set => ({
  ...initialState,
  setDate: newState => set({ date: newState }),
  setFirstDayOfMonth: newState => set({ firstDayOfMonth: newState.date(1) }),
  setMonthlyReservations: newState => {
    set({ monthlyReservations: newState });
  },
  resetCalendar: () =>
    set({
      date: initialState.date,
      firstDayOfMonth: initialState.firstDayOfMonth,
    }),
  resetFirstDayOfMonth: () =>
    set({ firstDayOfMonth: initialState.firstDayOfMonth }),
}));

export default useCalendarStore;
