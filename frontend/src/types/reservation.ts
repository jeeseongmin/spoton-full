import type { Pageable, Sort } from "@/types/common";

/**
 * 예약 상태 코드
 *
 * request: 승인 대기
 * approve: 승인 완료
 * cancel: 예약 취소 (사용자 직접 취소)
 * reject: 승인 반려 (관리자 취소)
 */
export type ReservationStateCode = "request" | "approve" | "cancel" | "reject";

// 예약 요청 시 request Type
export type ReservationRequest = {
  useCnts: string; // 사용 목적
  cpsCd: string; // 캠퍼스 별 code : "PTK"로 고정
  bldCd: string; // 빌딩 별 code : "PTK_PTK"로 고정
  plcCd: string; // 장소 별 code
  rsvtDt: string; // 예약 일자 : format("YYYYMMDD")
  startTime: string; // 시작 시간 : format("hhmmss");
  endTime: string; // 종료 시간 : format("hhmmss");
  mbrId: string; // 멤버 ID
};

// 예약 요청 시 response Type
export type ReservationResponse = {
  rsvtId: number; // 1;
  useCnts: string; // "마태1순 순모임";
  cpsCd: string; // "PTK";
  bldCd: string; // "PTK_PTK";
  plcCd: string; // "PTK_PTK_0303";
  rsvtDt: string; // "20240907";
  startTime: string; // "190000";
  endTime: string; // "210000";
  mbrId: string; // "11";
  sttCd: ReservationStateCode; // "approve";
  crtId: string; // "11";
  crDt: string; // "2024-07-20T06:15:57";
  updId: string; // "11";
  updDt: string; // "2024-07-20T06:15:57";
};

export interface ReservationStateRequest {
  rsvtId: number;
  sttCd: ReservationStateCode;
}

export interface ReservedPlacesRequest {
  rsvtDt: string;
  startTime: string;
  endTime: string;
}

export interface DailyReservationData {
  rsvtId: number;
  useCnts: string;
  plcCd: string;
  plcNm: string;
  rsvtDt: string;
  startTime: string;
  endTime: string;
  mbrId: string;
  userName: string;
  sttCd: ReservationStateCode;
  telNo: string;
}

export interface DailyReservation {
  day: string;
  data: DailyReservationData[];
}

export interface ReservationByState
  extends Omit<
    ReservationResponse,
    "bldCd" | "crtId" | "crDt" | "updId" | "updDt"
  > {
  plcNm: string;
  userName: string;
  telNo: string;
  cmtCd: string;
  cmtNm: string;
  garCd: string;
  garNm: string;
  leafCd: string;
  leafNm: string;
}

export interface ReservationsByStateResponse {
  content: ReservationByState[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}
