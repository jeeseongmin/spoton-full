import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import Reservation from "@/components/Schedule/Reservation";
import { daysOfTheWeek } from "@/constants/calendar";
import useCalendarStore from "@/store/calendarStore";
import type { CalendarItemProps } from "@/types/calendar";
import type { DailyReservation } from "@/types/reservation";
import { getWeeks } from "@/utils/calendar";
import { cn } from "@/utils/cn";

const CalendarHead = () => (
  <thead>
    <tr className="flex items-center justify-around border-b border-gray-light">
      {daysOfTheWeek.map((dayOfTheWeek, i) => (
        <CalendarItem
          key={dayOfTheWeek}
          type="header"
          dayOfTheWeek={i}
          className="cursor-default font-medium"
        >
          {dayOfTheWeek}
        </CalendarItem>
      ))}
    </tr>
  </thead>
);

interface CalendarItemWithReseravtion extends CalendarItemProps {
  dailyReservation?: DailyReservation[];
}

const CalendarItem = ({
  children,
  dailyReservation = [],
  type,
  dayOfTheWeek,
  dayData,
  isInactive = false,
  isSelected = false,
  className,
  ...props
}: CalendarItemWithReseravtion) => {
  const isHeader = type === "header";
  const isBody = type === "body";
  const isToday = dayData?.isSame(dayjs(), "day");

  return (
    <td
      className={cn(
        "relative flex w-[14.285%] cursor-pointer flex-col items-center justify-start gap-1 border-r border-gray-light px-1 text-base font-light text-black last-of-type:border-none",
        isHeader && "h-10 items-center",
        isBody && "pt-1",
        isInactive && "text-opacity-30",
        dayOfTheWeek === 6 && "text-saturday",
        dayOfTheWeek === 0 && "text-red",
        className,
      )}
      {...props}
    >
      {
        <div
          className={`z-40 flex h-[31px] w-[31px] items-center justify-center ${isToday && "rounded-full bg-primary text-white"}`}
        >
          {children}
        </div>
      }

      {isBody && (
        <div className="z-40 h-4 w-full">
          {dailyReservation.length > 0 && (
            <Reservation reservations={dailyReservation}>
              {dailyReservation[0].data[0].plcNm}
            </Reservation>
          )}
        </div>
      )}

      <div
        className={`absolute left-0 top-0 h-full w-full ${isSelected && "rounded-sm border border-primary bg-primary-light bg-opacity-30 text-black"}`}
      ></div>
    </td>
  );
};

const Calendar = () => {
  const [
    date,
    setDate,
    firstDayOfMonth,
    setFirstDayOfMonth,
    monthlyReservations,
  ] = useCalendarStore(
    useShallow(state => [
      state.date,
      state.setDate,
      state.firstDayOfMonth,
      state.setFirstDayOfMonth,
      state.monthlyReservations,
    ]),
  );

  return (
    <table className="flex h-full w-full border-collapse flex-col">
      <CalendarHead />
      <tbody className="flex flex-1 flex-col">
        {getWeeks(firstDayOfMonth).map(week => (
          <tr
            key={week[0].valueOf()}
            className="flex grow border-b border-gray-light last-of-type:border-none"
          >
            {week.map(day => {
              const isCurrentMonth = dayjs(date).month() === day.month();
              const isInactive = !isCurrentMonth;
              const dailyReservation = monthlyReservations?.filter(
                (reservation: DailyReservation) =>
                  day.date() === dayjs(reservation.day).date() && !isInactive,
              );

              return (
                <CalendarItem
                  key={day.valueOf()}
                  type="body"
                  dailyReservation={dailyReservation}
                  dayOfTheWeek={day.day()}
                  dayData={day}
                  isInactive={isInactive}
                  isSelected={dayjs(date)?.isSame(day, "day")}
                  onClick={() => {
                    setDate(day);
                    if (isInactive) setFirstDayOfMonth(day.date(1));
                  }}
                >
                  {day.date()}
                </CalendarItem>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
