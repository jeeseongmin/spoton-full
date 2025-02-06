import { useEffect, useState } from "react";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { getReservationByUsers, putReservationState } from "@/apis/reservation";
import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";
import useLoginStore from "@/store/loginStore";
import { ReservationByState, ReservationStateCode } from "@/types/reservation";
import { CellInfo } from "@/types/table";
import {
  getMyReservationBodyData,
  getTableBody,
  getTableHeader,
} from "@/utils/table";

const reservationTableHeader = ["날짜", "시간", "장소", "사용목적", "상태", ""];
const header = getTableHeader(reservationTableHeader);

const MyReservation = () => {
  const { tokenId } = useLoginStore();
  const [reservationBody, setReservationBody] = useState<CellInfo[][]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationByState | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const [reservations, setReservations] = useState([]);

  const confirmModal = useModal();
  const alertModal = useModal();

  const changeReservationState = async (
    rsvtId: number,
    sttCd: ReservationStateCode,
  ) => {
    await putReservationState({ rsvtId, sttCd });
    getMyReservation();
  };

  useEffect(() => {
    const reservationTableBody = reservations.map(reservation => {
      const { sttCd } = reservation;

      const cancelReservation = () => {
        setSelectedReservation(reservation);
        confirmModal.onOpen();
      };

      return getMyReservationBodyData(reservation, sttCd, cancelReservation);
    });

    setReservationBody(
      getTableBody(reservationTableHeader, reservationTableBody),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  useEffect(() => {
    getMyReservation();
  }, []);

  const getMyReservation = async () => {
    const { content } = await getReservationByUsers(0, 10, tokenId);
    setReservations(content);
  };

  const onConfirm = () => {
    if (!selectedReservation) {
      setAlertMessage("요청을 처리할 수 없습니다. 다시 시도해 주세요.");
    } else {
      changeReservationState(selectedReservation?.rsvtId, "cancel");
      setAlertMessage("예약이 취소되었습니다.");
    }

    alertModal.onOpen();
    confirmModal.onClose();
  };

  return (
    <MyPageWrapper>
      <div className="flex h-96 w-full flex-col justify-between p-4">
        <Table header={header} body={reservationBody} />
        <div className="flex items-center justify-center gap-4">
          <Button variant="icon" className="text-gray-dark">
            <MdArrowBackIosNew size={14} />
          </Button>
          <p className="text-base font-semibold">1</p>
          <Button variant="icon" className="text-gray-dark">
            <MdArrowForwardIos size={14} />
          </Button>
        </div>
      </div>
      {confirmModal.isOpen && (
        <ConfirmModal
          title="예약 취소"
          onConfirm={onConfirm}
          onClose={confirmModal.onClose}
        >
          해당 예약을 취소하려면 확인 버튼을 클릭하세요
        </ConfirmModal>
      )}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </MyPageWrapper>
  );
};

export default MyReservation;
