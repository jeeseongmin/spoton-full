import type { ReservationResponse } from "@/types/reservation";

// 해당 시간대가 어떤 예약 상태를 가지고 있는지 체크해주는 함수
export const checkStatus = ({
  time,
  reservationList,
  status,
}: {
  time: number;
  reservationList: ReservationResponse[];
  status: string;
}) => {
  try {
    let isTrue: boolean = false;
    const thisTime = convertToTimeFormat(time);

    if (status === "isReserved") {
      reservationList.map(reservation => {
        if (
          Number(reservation.startTime) <= Number(thisTime) &&
          Number(thisTime) < Number(reservation.endTime) &&
          reservation.sttCd === "approve"
        ) {
          isTrue = true;
          throw isTrue;
        }
      });

      return isTrue;
    } else if (status === "isWaiting") {
      reservationList.map(reservation => {
        if (
          Number(reservation.startTime) <= Number(thisTime) &&
          Number(thisTime) < Number(reservation.endTime) &&
          reservation.sttCd === "request"
        ) {
          isTrue = true;
          throw isTrue;
        }
      });

      return isTrue;
    } else return false;
  } catch (e: any) {
    return e;
  }
};

/**
 * 예약 시 startTime, endTime의 형태가 "hhmmss"이므로 포맷 형태 맞추는 함수
 */
export const getTime = ({ times, type }: { times: number[]; type: string }) => {
  let time = 0;
  times.sort((a, b) => {
    return a - b;
  });

  if (type === "startTime") {
    time = times[0];

    return convertToTimeFormat(time);
  } else if (type === "endTime") {
    time = times[times.length - 1] + 0.5;

    return convertToTimeFormat(time);
  } else return "000000";
};

// 일반 시간 변수를 hhmmss의 time format을 변환시키는 함수
export const convertToTimeFormat = (time: number) => {
  const hour = String(Math.floor(time));
  const minute = Number(time) > Number(hour) ? "30" : "00";
  const second = "00";

  return `${hour}${minute}${second}`;
};

// hhmmss 형태에서 시간, 분을 추출하는 함수
export const extractHourMinuteFromHHMM = (time: string) => {
  const [hour, minute] = [time.substring(0, 2), time.substring(2, 4)];

  return {
    hour,
    minute,
  };
};

// hhmmss -> hh:mm 변환 함수
export const convertTimeToHHMM = (time: string) => {
  const { hour, minute } = extractHourMinuteFromHHMM(time);

  return `${hour}:${minute}`;
};

// 시작 시간, 끝 시간을 hh:mm ~ hh:mm 형태로 반환하는 함수
export const convertTimeRangeToHHMM = (startTime: string, endTime: string) =>
  `${convertTimeToHHMM(startTime)} ~ ${convertTimeToHHMM(endTime)}`;

// 장소 코드에서 층을 추출하는 함수
export const extractFloorFromPlaceCode = (placeCode: string) => {
  const parts = placeCode.split("_");

  if (parts.length >= 3) {
    return parts[2].substring(1, 2);
  }

  return null;
};

// 장소 코드와 이름을 받아 '[N층] 장소명' 형태로 반환하는 함수
export const formatLocationWithFloor = (plcCd: string, plcNm: string) =>
  `[${extractFloorFromPlaceCode(plcCd)}층] ${plcNm}`;
