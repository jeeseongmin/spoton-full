import { PropsWithChildren } from "react";

import type { DailyReservation } from "@/types/reservation";

type ReservationType = PropsWithChildren & {
  reservations?: DailyReservation[];
};
const Reservation = ({ children, reservations }: ReservationType) => {
  return (
    <div className="flex select-none flex-row items-center justify-start text-xs font-light leading-4 md:text-small">
      <p className="mr-1 h-[6px] w-[6px] rounded-full bg-red-500"></p>
      <p className="line-clamp-1 flex-1 text-black">{children}</p>
      {reservations && reservations[0].data.length - 1 > 0 && (
        <div className="text-red-500">+{reservations[0].data.length - 1}</div>
      )}
    </div>
  );
};

export default Reservation;
