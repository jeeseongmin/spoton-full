import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { daysOfTheWeek } from "@/constants/calendar";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";
import type { DailyReservation } from "@/types/reservation";

const DailyReservationList = () => {
  const [date, monthlyReservations] = useCalendarStore(
    useShallow(state => [state.date, state.monthlyReservations]),
  );

  const [dailyReservations, setDailyReservations] = useState(
    monthlyReservations?.filter((reservation: DailyReservation) => {
      return date.date() === dayjs(reservation.day).date();
    })[0],
  );

  useEffect(() => {
    setDailyReservations(
      monthlyReservations?.filter((reservation: DailyReservation) => {
        return date.date() === dayjs(reservation.day).date();
      })[0],
    );
  }, [date, monthlyReservations]);

  return (
    <div className="flex h-fit max-h-[225px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-4 md:h-[540px] md:max-h-full md:py-8">
      <ReservationCard
        key={date.format("MM / DD")}
        date={`${date.format("MM / DD")} (${daysOfTheWeek[date.day()]})`}
        reservationList={
          dailyReservations && dailyReservations.data
            ? dailyReservations.data
            : []
        }
      />
    </div>
  );
};

export default DailyReservationList;
