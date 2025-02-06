import { useState } from "react";

import dayjs from "dayjs";

import { daysOfTheWeek } from "@/constants/calendar";
import { myReservations } from "@/dummy/reservation";
import ReservationCard from "@/pages/Home/components/ReservationCard";

const MyReservationList = () => {
  const [myReservationList] = useState(myReservations);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      {myReservationList.map(element => {
        return (
          <ReservationCard
            date={`${dayjs(element.day).format("MM / DD")} (${daysOfTheWeek[dayjs(element.day).day()]})`}
            reservationList={element.data}
          />
        );
      })}
    </div>
  );
};

export default MyReservationList;
