import dayjs from "dayjs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { RESERVATION_STATE } from "@/constants/common";
import type {
  ReservationByState,
  ReservationStateCode,
} from "@/types/reservation";
import type { CellInfo } from "@/types/table";
import { UserByState } from "@/types/user";
import {
  convertTimeRangeToHHMM,
  formatLocationWithFloor,
} from "@/utils/reservation";

export const getTableHeader = (headerList: string[]) => {
  return headerList.map((item: string) => {
    return {
      type: "header",
      name: item,
    };
  });
};

export const getTableBody = (
  titleList: string[],
  contentList: CellInfo[][],
) => {
  return contentList.map(items => {
    return items.map((item, index) => {
      return {
        ...item,
        name: titleList[index],
        type: "body",
      };
    });
  });
};

// 예약 목록 가져오기
export const getReservationBodyData = (
  reservation: ReservationByState,
  stateCode: ReservationStateCode,
  detailsMethod?: () => void,
  approveMethod?: () => void,
  rejectMethod?: () => void,
) => {
  const {
    rsvtDt,
    startTime,
    endTime,
    plcCd,
    plcNm,
    userName,
    sttCd,
    useCnts,
    cmtNm,
  } = reservation;

  const getMethodColumn = (stateCode: ReservationStateCode) => {
    switch (stateCode) {
      case "approve":
        return [
          { data: "상세", method: detailsMethod },
          {
            data: <RiDeleteBin6Line size={16} className="text-red" />,
            method: rejectMethod,
          },
        ];
      case "reject":
        return [{}, {}];
      case "request":
        return [
          { data: "승인", method: approveMethod },
          { data: "거절", method: rejectMethod },
        ];
      default:
        return [{ data: "" }, { data: "" }];
    }
  };

  return [
    { data: dayjs(rsvtDt).locale("ko").format("YYYY / MM / DD (ddd)") },
    { data: convertTimeRangeToHHMM(startTime, endTime) },
    { data: formatLocationWithFloor(plcCd, plcNm) },
    { data: cmtNm },
    { data: userName },
    { data: RESERVATION_STATE[sttCd] },
    { data: useCnts },
    ...getMethodColumn(stateCode),
  ];
};

// 나의 예약 가져오기
export const getMyReservationBodyData = (
  reservation: ReservationByState,
  stateCode: ReservationStateCode,
  rejectMethod?: () => void,
) => {
  const { rsvtDt, startTime, endTime, plcCd, plcNm, sttCd, useCnts } =
    reservation;

  const getMethodColumn = (stateCode: ReservationStateCode) => {
    switch (stateCode) {
      case "approve":
        return [{}];
      case "reject":
        return [{}];
      case "request":
        return [
          {
            data: "취소",
            method: rejectMethod,
          },
        ];
      default:
        return [{}];
    }
  };

  return [
    { data: dayjs(rsvtDt).locale("ko").format("YYYY / MM / DD (ddd)") },
    { data: convertTimeRangeToHHMM(startTime, endTime) },
    { data: formatLocationWithFloor(plcCd, plcNm) },
    { data: useCnts },
    { data: RESERVATION_STATE[sttCd] },
    ...getMethodColumn(stateCode),
  ];
};

export const getUserBodyData = (
  user: UserByState,
  detailsMethod?: () => void,
  approveMethod?: () => void,
  rejectMethod?: () => void,
) => {
  const {
    createdDate,
    userName,
    telNo,
    cmtNm,
    garNm,
    leafNm,
    userStateCodeName,
    userStateCode,
  } = user;

  const getMethodColumn = (stateCode: string) => {
    switch (stateCode) {
      // 대기
      case "00":
        return [
          { data: "승인", method: approveMethod },
          { data: "거절", method: rejectMethod },
        ];

      // 정상 (승인 완료)
      case "01":
        return [
          { data: "상세", method: detailsMethod },
          {
            data: <RiDeleteBin6Line size={16} className="text-red" />,
            method: rejectMethod,
          },
        ];
      default:
        return [{ data: "" }, { data: "" }];
    }
  };

  return [
    { data: userName },
    { data: cmtNm },
    { data: garNm },
    { data: leafNm },
    { data: telNo },
    { data: userStateCodeName },
    { data: dayjs(createdDate).locale("ko").format("YYYY / MM / DD (ddd)") },
    ...getMethodColumn(userStateCode),
  ];
};
