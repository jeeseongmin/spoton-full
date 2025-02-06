import dayjs from "dayjs";

import { ReservationField } from "@/pages/Reservation/components/ReservationDetails";
import { UserByState } from "@/types/user";

interface UserDetailsProps {
  user: UserByState;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  const { createdDate, userName, telNo, cmtNm, garNm, leafNm } = user;

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
        value={dayjs(createdDate)
          .locale("ko")
          .format("YYYY년 MM월 DD일 (ddd요일)")}
      />
      <ReservationField label="예약자" value={userName} />
      <ReservationField label="연락처" value={telNo} />
      <ReservationField
        label="소속"
        value={getOrganization(cmtNm, garNm, leafNm)}
      />
    </>
  );
};

export default UserDetails;
