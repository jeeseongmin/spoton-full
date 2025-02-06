import { useEffect, useState } from "react";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useShallow } from "zustand/react/shallow";

import { getMonthlyReservation } from "@/apis/reservation";
import Button from "@/components/Button";
import DropdownYearMonthPicker from "@/components/DatePicker/DropdownYearMonthPicker";
import Reservation from "@/components/Schedule/Reservation";
import { scheduleYears } from "@/constants/calendar";
import Calendar from "@/pages/Home/components/Calendar";
import useCalendarStore from "@/store/calendarStore";

const Schedule = () => {
  const [
    date,
    setDate,
    firstDayOfMonth,
    setFirstDayOfMonth,
    resetCalendar,
    setMonthlyReservations,
    monthlyReservations,
  ] = useCalendarStore(
    useShallow(state => [
      state.date,
      state.setDate,
      state.firstDayOfMonth,
      state.setFirstDayOfMonth,
      state.resetCalendar,
      state.setMonthlyReservations,
      state.monthlyReservations,
    ]),
  );

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (monthlyReservations.length > 0) {
      let sum = 0;
      monthlyReservations.map(elem => {
        sum += elem.data.length;
      });
      setTotalCount(sum);
    } else {
      setTotalCount(0);
    }
  }, [monthlyReservations]);

  const goPreviousMonth = () => {
    setMonthlyReservations([]);
    setFirstDayOfMonth(date.date(0).date(1));
    setDate(date.date(0).date(1));
  };

  const goNextMonth = () => {
    setMonthlyReservations([]);
    setFirstDayOfMonth(date.date(date.daysInMonth() + 1));
    setDate(date.date(date.daysInMonth() + 1));
  };

  const getReservations = async () => {
    const reservations = await getMonthlyReservation(date.format("YYYYMM"));
    setMonthlyReservations(reservations);
  };

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDayOfMonth]);

  return (
    <div className="h-[622px] rounded-[2px] border border-gray-light px-4 py-3 md:flex-1 md:py-6">
      <div className="relative flex h-full w-full flex-col gap-3 md:gap-6">
        {/* Date Select Action */}
        <div className="flex h-8 items-center justify-center gap-2 lg:gap-12">
          <Button variant="custom" onClick={goPreviousMonth}>
            <SlArrowLeft className="text-xs md:text-small" />
          </Button>
          <DropdownYearMonthPicker
            years={scheduleYears}
            className="flex text-base font-light leading-5 md:text-xl"
            onClick={setDate}
          />
          <Button variant="custom" onClick={goNextMonth}>
            <SlArrowRight size={13} />
          </Button>

          <div className="absolute right-0 top-0 h-10">
            <Button
              variant="custom"
              onClick={resetCalendar}
              className="h-8 border border-primary px-2 text-small text-primary drop-shadow-none hover:bg-primary hover:text-white md:text-base lg:px-4"
            >
              오늘
            </Button>
          </div>
        </div>
        {/* tip */}
        <div className="flex w-full justify-between">
          <Reservation>장소 예약건</Reservation>
          {totalCount !== 0 && <p className="text-small">총 {totalCount}건</p>}
        </div>

        {/* Calendar */}
        <Calendar />
      </div>
    </div>
  );
};

export default Schedule;
