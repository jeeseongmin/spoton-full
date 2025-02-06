import dayjs from "dayjs";

import { ReservationField } from "@/pages/Reservation/components/ReservationDetails";
import type { ReservationByState } from "@/types/reservation";
import {
  convertTimeRangeToHHMM,
  extractHourMinuteFromHHMM,
  formatLocationWithFloor,
} from "@/utils/reservation";
import { convertMinuteToNumber, convertTimeToText } from "@/utils/time";

interface ReservationDetailsProps {
  reservation: ReservationByState;
}

const ReservationDetails = ({ reservation }: ReservationDetailsProps) => {
  const {
    rsvtDt,
    startTime,
    endTime,
    plcCd,
    plcNm,
    useCnts,
    userName,
    telNo,
    cmtNm,
    garNm,
    leafNm,
  } = reservation;

  const getTimeText = (startTime: string, endTime: string) => {
    const { hour: startHour, minute: startMinute } =
      extractHourMinuteFromHHMM(startTime);
    const { hour: endHour, minute: endMinute } =
      extractHourMinuteFromHHMM(endTime);

    const start =
      Number(startHour) + convertMinuteToNumber(Number(startMinute));
    const end = Number(endHour) + convertMinuteToNumber(Number(endMinute));

    return `${convertTimeRangeToHHMM(startTime, endTime)} ${convertTimeToText(end - start)}`;
  };

  const getOrganization = (cmtNm: string, garNm: string, leafNm: string) => {
    const garretName = garNm ? ` > ${garNm}` : "";
    const leafName = leafNm ? ` > ${leafNm}` : "";

    return cmtNm + garretName + leafName;
  };

  return (
    <>
      {/* TODO: 고정 예약 포맷에 맞춰 날짜 수정 */}
      <ReservationField
        label="날짜"
        value={dayjs(rsvtDt).locale("ko").format("YYYY년 MM월 DD일 (ddd요일)")}
      />
      <ReservationField label="시간" value={getTimeText(startTime, endTime)} />
      <ReservationField
        label="장소"
        value={formatLocationWithFloor(plcCd, plcNm)}
      />
      <ReservationField label="예약자" value={userName} />
      <ReservationField label="연락처" value={telNo} />
      <ReservationField
        label="소속"
        value={getOrganization(cmtNm, garNm, leafNm)}
      />
      <ReservationField label="사용목적" value={useCnts} />
    </>
  );
};

export default ReservationDetails;
