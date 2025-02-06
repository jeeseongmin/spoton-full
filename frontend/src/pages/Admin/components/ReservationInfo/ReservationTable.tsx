import { useEffect, useState } from "react";

import { putReservationState } from "@/apis/reservation";
import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import ReservationModal from "@/components/Modal/ReservationModal";
import Table from "@/components/Table";
import {
  APPROVE_RESERVATION_MESSAGE,
  CONFIRM_APPROVE_RESERVATION_MESSAGE,
  CONFIRM_REJECT_RESERVATION_MESSAGE,
  EMPTY_RESERVATION_LIST_MESSAGE,
  REJECT_RESERVATION_MESSAGE,
} from "@/constants/messages/admin";
import { REQUEST_ERROR_MESSAGE } from "@/constants/messages/common";
import useModal from "@/hooks/useModal";
import ReservationDetails from "@/pages/Admin/components/ReservationInfo/ReservationDetails";
import type {
  ReservationByState,
  ReservationStateCode,
} from "@/types/reservation";
import type { CellInfo } from "@/types/table";
import {
  getReservationBodyData,
  getTableBody,
  getTableHeader,
} from "@/utils/table";

const reservationTableHeader = [
  "날짜",
  "시간",
  "장소",
  "공동체",
  "예약자",
  "예약 상태",
  "사용 목적",
  "",
  "",
];

const header = getTableHeader(reservationTableHeader);

interface ReservationTable {
  reservations: ReservationByState[];
  updateReservations: () => void;
}
const ReservationTable = ({
  reservations,
  updateReservations,
}: ReservationTable) => {
  const [reservationBody, setReservationBody] = useState<CellInfo[][]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationByState | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const reservationModal = useModal();
  const confirmApproveModal = useModal();
  const confirmRejectModal = useModal();
  const alertModal = useModal();

  const changeReservationState = async (
    rsvtId: number,
    sttCd: ReservationStateCode,
  ) => {
    await putReservationState({ rsvtId, sttCd });
    updateReservations();
  };

  const handleConfirmApprove = () => {
    if (!selectedReservation) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeReservationState(selectedReservation?.rsvtId, "approve");
      setAlertMessage(APPROVE_RESERVATION_MESSAGE);
    }

    alertModal.onOpen();
    confirmApproveModal.onClose();
  };

  const handleConfirmReject = () => {
    if (!selectedReservation) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeReservationState(selectedReservation?.rsvtId, "reject");
      setAlertMessage(REJECT_RESERVATION_MESSAGE);
    }

    alertModal.onOpen();
    confirmRejectModal.onClose();
  };

  useEffect(() => {
    const reservationTableBody = reservations.map(reservation => {
      const { sttCd } = reservation;

      const showReservationModal = () => {
        setSelectedReservation(reservation);
        reservationModal.onOpen();
      };

      const approveReservation = () => {
        setSelectedReservation(reservation);
        confirmApproveModal.onOpen();
      };

      const rejectReservation = () => {
        setSelectedReservation(reservation);
        confirmRejectModal.onOpen();
      };

      return getReservationBodyData(
        reservation,
        sttCd,
        showReservationModal,
        approveReservation,
        rejectReservation,
      );
    });

    setReservationBody(
      getTableBody(reservationTableHeader, reservationTableBody),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  if (reservations.length === 0 && !alertModal.isOpen) {
    return (
      <div className="flex h-20 items-center justify-center">
        <div>{EMPTY_RESERVATION_LIST_MESSAGE}</div>
      </div>
    );
  }

  return (
    <>
      <Table header={header} body={reservationBody} />
      {reservationModal.isOpen && (
        <ReservationModal onClose={reservationModal.onClose}>
          <ReservationModal.Header>예약 상세 정보</ReservationModal.Header>
          <ReservationModal.Content>
            {selectedReservation && (
              <ReservationDetails reservation={selectedReservation} />
            )}
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Button variant="primary" onClick={reservationModal.onClose}>
              확인
            </Button>
          </ReservationModal.Footer>
        </ReservationModal>
      )}
      {confirmApproveModal.isOpen && (
        <ConfirmModal
          title="예약 승인"
          onConfirm={handleConfirmApprove}
          onClose={confirmApproveModal.onClose}
        >
          {CONFIRM_APPROVE_RESERVATION_MESSAGE}
        </ConfirmModal>
      )}
      {confirmRejectModal.isOpen && (
        <ConfirmModal
          title="예약 반려"
          onConfirm={handleConfirmReject}
          onClose={confirmRejectModal.onClose}
        >
          {CONFIRM_REJECT_RESERVATION_MESSAGE}
        </ConfirmModal>
      )}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </>
  );
};

export default ReservationTable;
