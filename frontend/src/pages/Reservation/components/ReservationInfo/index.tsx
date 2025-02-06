import { ComponentPropsWithoutRef, Fragment } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { ReservationLabel } from "@/pages/Reservation";
import type { User } from "@/types/user";

interface InfoInput extends ComponentPropsWithoutRef<"label"> {
  label: string;
  isRequired?: boolean;
}

const InfoLabel = ({
  children,
  label,
  isRequired = false,
  ...props
}: InfoInput) => (
  <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
    <InputLabel
      text={label}
      isRequired={isRequired}
      className="text-base text-primary md:min-w-20"
      {...props}
    />
    <div className="flex grow flex-col flex-wrap gap-1 md:flex-row">
      {children}
    </div>
  </div>
);

interface ReservationInfoProps {
  user: User;
}

const ReservationInfo = ({ user }: ReservationInfoProps) => {
  const { register, getValues } = useFormContext();
  useWatch({ name: ["time", "place"] });

  const isShow = getValues("time").length !== 0 && getValues("place");

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm border border-gray-middle bg-white-dull p-4 text-black shadow lg:px-12">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
        <ReservationLabel>예약자 정보 입력</ReservationLabel>
        {!isShow && (
          <div className="text-small text-red-light">
            *예약 시간과 장소를 선택한 후 진행해주세요.
          </div>
        )}
      </div>
      {isShow && (
        <>
          <div className="flex grow flex-col items-start gap-9 lg:flex-row lg:items-center">
            <InfoLabel label="예약자" htmlFor="name">
              <Input
                id="name"
                disabled
                defaultValue={user.userName}
                className="w-40 border-gray-middle"
              />
            </InfoLabel>
            <InfoLabel label="연락처" htmlFor="telNo">
              <div className="flex items-center gap-1">
                {user.telNo.split("-").map((number, index, origin) => (
                  <Fragment key={number}>
                    <Input
                      id="telNo"
                      disabled
                      defaultValue={number}
                      className="w-[80px] border-gray-middle lg:w-14"
                    />
                    {index !== origin.length - 1 && <div>-</div>}
                  </Fragment>
                ))}
              </div>
            </InfoLabel>
          </div>
          <div className="flex grow flex-col items-start gap-6 lg:flex-row lg:items-center">
            <InfoLabel label="소속" htmlFor="community">
              <Input
                id="cmtCd"
                disabled
                defaultValue={user.cmtNm}
                className="w-full border-gray-middle lg:w-40"
              />
              <Input
                id="garCd"
                disabled
                defaultValue={user.garNm}
                className="w-full border-gray-middle lg:w-40"
              />
              <Input
                id="leafCd"
                disabled
                defaultValue={user.leafNm}
                className="w-full border-gray-middle lg:w-40"
              />
            </InfoLabel>
          </div>
          <div className="flex grow gap-6">
            <InfoLabel label="사용 목적" isRequired htmlFor="purpose">
              <Input
                id="purpose"
                placeholder="사용 목적을 입력하세요 (최대 15자)"
                maxLength={15}
                className="w-full border-gray-middle lg:w-[31rem]"
                {...register("purpose", { required: true, maxLength: 15 })}
              />
            </InfoLabel>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationInfo;
