import { useEffect, useState } from "react";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { fetchPlace } from "@/apis/place";
import { fetchReservation } from "@/apis/reservation";
import DatePicker from "@/components/DatePicker";
import { PlacesByFloor, type SelectedPlace } from "@/dummy/places";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";
import TimeTablePicker from "@/pages/Reservation/components/ReservationTab/PlaceSearchTab/TimeTablePicker";
import ReservationTabLayout from "@/pages/Reservation/components/ReservationTab/ReservationTabLayout";
import useCalendarStore from "@/store/calendarStore";
import useUserStore from "@/store/userStore";
import { Place } from "@/types/place";
import { getDaysUntilNextMonth } from "@/utils/calendar";

const PlaceSearchTab = () => {
  const [placeList, setPlaceList] = useState<PlacesByFloor[]>([]);
  const [reservationList, setReservationList] = useState([]);
  const { control, getValues, reset, watch, resetField } = useFormContext();
  useWatch({ name: "place" });
  const resetFirstDayOfMonth = useCalendarStore(
    state => state.resetFirstDayOfMonth,
  );
  const roleId = useUserStore(state => state.roleId);
  console.log("dayjs().daysInMonth()", dayjs().daysInMonth());
  console.log("roleId", roleId);

  const timeSelectErrorMessage = getValues("place")
    ? ""
    : "*날짜와 장소를 선택한 후 시간 선택이 가능합니다.";

  useEffect(() => {
    getPlaceList();
  }, []);

  useEffect(() => {
    reset();
    resetFirstDayOfMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlaceList = async () => {
    const res = await fetchPlace();
    setPlaceList(res);
  };

  useEffect(() => {
    const date = getValues("date");
    const place = getValues("place");

    if (date && place) {
      getReservationList(date, place);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("date"), watch("place")]);

  const getReservationList = async (date: Dayjs, place: Place) => {
    const res = await fetchReservation(date.format("YYYYMMDD"), place.plcCd);

    setReservationList(res);
  };

  return (
    <ReservationTabLayout>
      <ReservationTabLayout.Left title="날짜 선택">
        <Controller
          name="date"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangeDate = (date: Dayjs) => {
              onChange(date);
              resetField("place");
              resetField("time");
              resetField("purpose");
            };

            return (
              <DatePicker
                date={value}
                onChange={handleChangeDate}
                limit={
                  roleId === "ROLE_ADMIN" || roleId === "ROLE_MINISTRY"
                    ? undefined
                    : getDaysUntilNextMonth()
                }
              />
            );
          }}
        />
      </ReservationTabLayout.Left>
      <ReservationTabLayout.Right title="장소 선택">
        <Controller
          name="place"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangePlace = (place: SelectedPlace) => {
              onChange(place);
              resetField("time");
              resetField("purpose");
            };

            return (
              <PlacePicker
                placesByFloor={placeList}
                selectedPlace={value}
                onChange={handleChangePlace}
              />
            );
          }}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="예약 시간 선택"
        errorMessage={timeSelectErrorMessage}
        isLabel
      >
        {getValues("place") && (
          <Controller
            name="time"
            rules={{ required: true }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimeTablePicker
                selectedDate={getValues("date")}
                reservationList={reservationList}
                selectedTimes={value}
                onChange={onChange}
              />
            )}
          />
        )}
      </ReservationTabLayout.Bottom>
    </ReservationTabLayout>
  );
};

export default PlaceSearchTab;
