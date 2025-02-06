import { useEffect, useState } from "react";

import { Dayjs } from "dayjs";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { fetchPlace } from "@/apis/place";
import { getReservedPlaces } from "@/apis/reservation";
import DatePicker from "@/components/DatePicker";
import { PlacesByFloor } from "@/dummy/places";
import DropdownTimePicker from "@/pages/Reservation/components/DropdownTimePicker";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";
import ReservationTabLayout from "@/pages/Reservation/components/ReservationTab/ReservationTabLayout";
import useCalendarStore from "@/store/calendarStore";
import { Place } from "@/types/place";
import { getTime } from "@/utils/reservation";

const TimeSearchTab = () => {
  const [places, setPlaces] = useState<PlacesByFloor[]>([]);
  const [reservedPlaces, setReservedPlaces] = useState<Place[]>([]);
  const { control, getValues, reset, resetField, watch } = useFormContext();
  useWatch({ name: ["date", "time"] });
  const resetFirstDayOfMonth = useCalendarStore(
    state => state.resetFirstDayOfMonth,
  );

  const isSelectedTime =
    getValues("time").length > 0 &&
    getValues("time").every((value: number) => !Number.isNaN(value));

  const placeSelectErrorMessage = isSelectedTime
    ? ""
    : "*날짜와 시간을 선택한 후 장소 선택이 가능합니다.";

  const getPlaceList = async () => {
    const res = await fetchPlace();
    setPlaces(res);
  };

  const getReservedPlaceList = async (date: Dayjs, times: number[]) => {
    if (times.some(time => isNaN(time))) return;

    const [startTime, endTime] = [
      getTime({ times, type: "startTime" }),
      getTime({ times, type: "endTime" }),
    ];

    const res = await getReservedPlaces({
      rsvtDt: date.format("YYYYMMDD"),
      startTime,
      endTime,
    });

    setReservedPlaces(res);
  };

  useEffect(() => {
    reset();
    resetFirstDayOfMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPlaceList();
  }, []);

  useEffect(() => {
    const date = getValues("date");
    const time = getValues("time");

    if (date && time.length > 0) {
      getReservedPlaceList(date, time);
    }
  }, [watch("date"), watch("time")]);

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

            return <DatePicker date={value} onChange={handleChangeDate} />;
          }}
        />
      </ReservationTabLayout.Left>
      <ReservationTabLayout.Right title="시간 선택">
        <Controller
          name="time"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangeTime = (time: number[]) => {
              onChange(time);
              resetField("place");
              resetField("purpose");
            };

            return (
              <DropdownTimePicker
                selectedDate={getValues("date")}
                selectedTimes={value}
                onChange={handleChangeTime}
                limitTime={2}
              />
            );
          }}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="장소 선택"
        errorMessage={placeSelectErrorMessage}
      >
        {isSelectedTime && (
          <Controller
            name="place"
            rules={{ required: true }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <PlacePicker
                placesByFloor={places}
                selectedPlace={value}
                onChange={onChange}
                reservedPlaces={reservedPlaces}
              />
            )}
          />
        )}
      </ReservationTabLayout.Bottom>
    </ReservationTabLayout>
  );
};

export default TimeSearchTab;
