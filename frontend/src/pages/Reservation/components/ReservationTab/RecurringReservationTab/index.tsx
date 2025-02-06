import { useEffect } from "react";

import dayjs from "dayjs";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { placesByFloor, reservedPlaces } from "@/dummy/places";
import DatePickerButton from "@/pages/Reservation/components/DropdownDatePicker";
import DropdownTimePicker from "@/pages/Reservation/components/DropdownTimePicker";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";
import SelectRepeatType from "@/pages/Reservation/components/ReservationTab/RecurringReservationTab/SelectRepeatType";
import ReservationTabLayout from "@/pages/Reservation/components/ReservationTab/ReservationTabLayout";
import useCalendarStore from "@/store/calendarStore";

const RecurringReservationTab = () => {
  const { control, getValues, setValue, reset } = useFormContext();
  const resetFirstDayOfMonth = useCalendarStore(
    state => state.resetFirstDayOfMonth,
  );

  useWatch({ name: ["date", "time", "startDate", "endDate"] });

  const isSelectedTime =
    getValues("time").length > 0 &&
    getValues("time").every((value: number) => !Number.isNaN(value));

  const placeSelectErrorMessage = isSelectedTime
    ? ""
    : "*날짜와 시간을 선택한 후 장소 선택이 가능합니다.";

  useEffect(() => {
    reset();
    resetFirstDayOfMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetEndDate = () => {
    setValue("endDate", "");
  };

  return (
    <ReservationTabLayout>
      <ReservationTabLayout.Left title="날짜 선택">
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex h-20 w-full flex-col gap-4 md:h-auto md:flex-row md:items-center md:gap-10">
            <div className="min-w-16">시작 날짜</div>
            <Controller
              name="startDate"
              defaultValue={dayjs()}
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePickerButton
                  date={value}
                  onChange={e => {
                    onChange(e);
                    resetEndDate();
                  }}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row md:gap-10">
            <div
              className={` flex h-full min-w-16 justify-start gap-2 ${getValues("repeatType") && getValues("repeatType") !== "daily" && "items-start md:pt-3"}`}
            >
              반복 <span className="text-red-500">*</span>
            </div>
            <Controller
              name="repeatType"
              control={control}
              defaultValue={{ type: "", option: "" }}
              render={({ field: { value, onChange } }) => (
                <SelectRepeatType
                  typeObj={value}
                  selectedDate={getValues("startDate")}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="flex h-20 w-full flex-col gap-4 md:h-auto md:flex-row md:items-center md:gap-10">
            <div className="min-w-16">종료 날짜</div>

            <div className="flex w-full flex-row gap-2">
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePickerButton
                    startDate={getValues("startDate")}
                    date={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </ReservationTabLayout.Left>
      <ReservationTabLayout.Right title="시간 선택">
        <Controller
          name="time"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DropdownTimePicker
              selectedDate={getValues("date")}
              selectedTimes={value}
              onChange={onChange}
              limitTime={2}
            />
          )}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="장소 선택"
        errorMessage={placeSelectErrorMessage}
      >
        {isSelectedTime && (
          <Controller
            name="place"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PlacePicker
                placesByFloor={placesByFloor}
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

export default RecurringReservationTab;
