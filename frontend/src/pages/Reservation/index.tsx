import { ComponentPropsWithoutRef, useState } from "react";

import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { reservation } from "@/apis/reservation";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import ReservationModal from "@/components/Modal/ReservationModal";
import { MYPAGE_MAIN_URL } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import Banner from "@/pages/Reservation/components/Banner";
import ReservationDetails from "@/pages/Reservation/components/ReservationDetails";
import ReservationInfo from "@/pages/Reservation/components/ReservationInfo";
import ReservationTab from "@/pages/Reservation/components/ReservationTab";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";
import type { Place } from "@/types/place";
import { ReservationRequest } from "@/types/reservation";
import { cn } from "@/utils/cn";
import { getTime } from "@/utils/reservation";

export const ReservationLabel = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("min-w-28 text-base text-primary", className)}>
    {children}
  </div>
);

interface ReservationFormValues {
  date: Dayjs;
  place: Place;
  time: number[];
  userId: string;
  purpose: string;
}

const ReservationPage = () => {
  const { tokenId } = useLoginStore();
  const userInfo = useUserStore();
  const loginInfo = useLoginStore();
  const reservationModal = useModal();
  const [user] = useState({
    id: loginInfo.tokenId,
    userName: userInfo.userName,
    telNo: userInfo.telNo,
    cmtCd: userInfo.cmtCd,
    garCd: userInfo.garCd,
    leafCd: userInfo.leafCd,
    cmtNm: userInfo.cmtNm,
    garNm: userInfo.garNm,
    leafNm: userInfo.leafNm,
  });

  const methods = useForm<ReservationFormValues>({
    defaultValues: {
      date: dayjs(),
      place: undefined,
      time: [],
      userId: user.id.toString(),
      purpose: "",
    },
  });
  const { formState, reset, getValues, handleSubmit } = methods;

  const handleClickOkButton = () => {
    reservationModal.onClose();
    reset();
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          className="flex min-w-60 flex-col items-center gap-8"
          onSubmit={handleSubmit(data => {
            const reservationRequest: ReservationRequest = {
              useCnts: data.purpose,
              cpsCd: "PTK",
              bldCd: "PTK_PTK",
              plcCd: data.place.plcCd,
              rsvtDt: data.date.format("YYYYMMDD"),
              startTime: getTime({
                type: "startTime",
                times: getValues("time"),
              }),
              endTime: getTime({
                type: "endTime",
                times: getValues("time"),
              }),
              mbrId: tokenId, // 임시 멤버 id => 추후 로그인 유저 id 정보로 변경 예정
            };
            reservation(reservationRequest);
          })}
        >
          <Banner />
          <ReservationTab />
          <ReservationInfo user={user} />
          <Button
            type="submit"
            variant="outlined"
            className="w-fit text-base"
            disabled={!formState.isValid}
            onClick={reservationModal.onOpen}
          >
            예약하기
          </Button>
        </form>
        {reservationModal.isOpen && (
          <ReservationModal onClose={reservationModal.onClose}>
            <ReservationModal.Header>
              예약이 완료되었습니다.
            </ReservationModal.Header>
            <ReservationModal.Content>
              <ReservationDetails user={user} />
            </ReservationModal.Content>
            <ReservationModal.Footer>
              <Link to={`${MYPAGE_MAIN_URL}?tab=1`}>
                <Button variant="outlined">나의 예약</Button>
              </Link>
              <Button variant="primary" onClick={handleClickOkButton}>
                확인
              </Button>
            </ReservationModal.Footer>
          </ReservationModal>
        )}
      </FormProvider>
    </Layout>
  );
};

export default ReservationPage;
