import { useShallow } from "zustand/react/shallow";

import { RESERVATION_STATE } from "@/constants/common";
import useUserStore from "@/store/userStore";
import type { DailyReservationData } from "@/types/reservation";
import { convertTimeToHourMinuteText } from "@/utils/time";

type ReservationCardProps = {
  date: string;
  reservationList: DailyReservationData[];
};

const ReservationCard = ({ date, reservationList }: ReservationCardProps) => {
  const [roleId] = useUserStore(useShallow(state => state.roleId));

  const CardHeader = () => {
    return (
      <div className="flex h-[33px] items-center rounded-t-[5px] bg-primary px-4 text-[15px] text-white">
        <span className=" p-0 leading-[15px]">{date}</span>
      </div>
    );
  };

  return (
    <div className="h-auto w-full rounded-[5px] drop-shadow-base">
      <CardHeader />
      {reservationList.length > 0 ? (
        <table className="h-auto w-full border-collapse bg-white">
          <tbody>
            {reservationList.map(element => {
              const {
                rsvtId,
                startTime,
                endTime,
                plcNm,
                useCnts,
                userName,
                telNo,
                sttCd,
              } = element;

              return (
                <tr
                  key={rsvtId}
                  className="border-b border-gray-middle p-4 align-top text-small last:border-none"
                >
                  <td className="h-[94px] w-[100px] gap-2 border-r border-gray-middle p-2 text-left font-semibold">
                    {sttCd && (
                      <p
                        className={`mb-1 ${sttCd === "approve" ? "text-primary" : "text-[#A30000]"}`}
                      >
                        {RESERVATION_STATE[sttCd]}
                      </p>
                    )}
                    <p>{`${convertTimeToHourMinuteText(startTime)} ~ ${convertTimeToHourMinuteText(endTime)}`}</p>
                  </td>
                  <td className="flex min-h-[94px] flex-col gap-1 p-2">
                    <p className="font-semibold">{plcNm}</p>
                    <p className="font-light text-gray-dark">{useCnts}</p>

                    {roleId === "ROLE_ADMIN" && (
                      <p className="font-light text-gray-dark">
                        {userName} / {telNo}
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex h-[94px] items-center justify-center rounded-b-[5px] bg-white text-[13px] font-light text-gray-dark">
          <p>예약 없음</p>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
