import { Dayjs } from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useShallow } from "zustand/react/shallow";

import Button from "@/components/Button";
import Calendar from "@/components/DatePicker/Calendar";
import DropdownYearMonthPicker from "@/components/DatePicker/DropdownYearMonthPicker";
import { reservationYears } from "@/constants/calendar";
import useCalendarStore from "@/store/calendarStore";

interface DatePickerProps {
  startDate?: Dayjs;
  date?: Dayjs;
  limit?: number;
  onChange: (day: Dayjs) => void;
}

const DatePicker = ({ startDate, date, limit, onChange }: DatePickerProps) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useCalendarStore(
    useShallow(state => [state.firstDayOfMonth, state.setFirstDayOfMonth]),
  );
  const goPreviousMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.date(0).date(1));
  const goNextMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.date(firstDayOfMonth.daysInMonth() + 1));

  return (
    <div className="flex w-full select-none flex-col gap-2 overflow-x-auto text-small">
      <div className="flex items-center justify-center gap-2">
        <Button variant="custom" onClick={goPreviousMonth}>
          <SlArrowLeft size={10} />
        </Button>
        <DropdownYearMonthPicker
          years={reservationYears}
          className="flex font-light"
        />
        <Button variant="custom" onClick={goNextMonth}>
          <SlArrowRight size={10} />
        </Button>
      </div>
      <Calendar
        startDate={startDate}
        selectedDate={date}
        limit={limit}
        onChangeSelectedDate={onChange}
      />
    </div>
  );
};

export default DatePicker;
