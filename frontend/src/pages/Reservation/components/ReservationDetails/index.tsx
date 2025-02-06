import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

import type { Place } from "@/types/place";
import type { User } from "@/types/user";

interface ReservationFieldProps {
  label: string;
  value: string;
}

export const ReservationField = ({ label, value }: ReservationFieldProps) => (
  <div className="flex border-b border-b-gray-middle p-4 text-base font-light">
    <div className="min-w-20 text-primary">{label}</div>
    <div>{value}</div>
  </div>
);

interface ReservationDetailsProps {
  user: User;
}

const ReservationDetails = ({ user }: ReservationDetailsProps) => {
  const { getValues } = useFormContext();
  const userInfo = user;

  const getTimeText = (time: number[]) => {
    const [start, end] = time.length === 1 ? [time[0], time[0]] : time;

    const formatNumberToTime = (number: number) =>
      number % 1 > 0 ? `${Math.floor(number)}:30` : `${number}:00`;

    return `${formatNumberToTime(start)} ~ ${formatNumberToTime(end + 0.5)}`;
  };
  const getPlaceText = (place: Place) => {
    const { plcNm, plcCd } = place;
    const [, , floor] = plcCd.split("_");

    return `[${floor[1]}층] ${plcNm}`;
  };

  return (
    <>
      {/* TODO: 고정 예약 포맷에 맞춰 날짜 수정 */}
      <ReservationField
        label="날짜"
        value={dayjs(getValues("date"))
          .locale("ko")
          .format("YYYY년 MM월 DD일 (ddd요일)")}
      />
      <ReservationField label="시간" value={getTimeText(getValues("time"))} />
      <ReservationField label="장소" value={getPlaceText(getValues("place"))} />
      <ReservationField label="예약자" value={userInfo.userName} />
      <ReservationField label="연락처" value={userInfo.telNo} />
      <ReservationField label="공동체" value={userInfo.cmtNm} />
      <ReservationField label="다락방" value={userInfo.garNm} />
      <ReservationField label="순" value={userInfo.leafNm} />
      <ReservationField label="사용목적" value={getValues("purpose")} />
    </>
  );
};

export default ReservationDetails;
