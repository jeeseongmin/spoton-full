import { useRef } from "react";

import { Dayjs } from "dayjs";
import { IoMdCalendar } from "react-icons/io";

import DatePicker from "@/components/DatePicker";
import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { cn } from "@/utils/cn";

interface DropdownDatePickerProps {
  startDate?: Dayjs;
  date?: Dayjs;
  limit?: number;
  onChange: (day: Dayjs) => void;
}

const DropdownDatePicker = ({
  startDate,
  date,
  onChange,
}: DropdownDatePickerProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsModal = useModal();
  useOutSideClick(dropdownRef, () => optionsModal.onClose());

  return (
    <div ref={dropdownRef} className="relative h-10 flex-1">
      <div className="absolute left-0 top-11 z-50 -m-4 flex w-fit flex-col overflow-hidden p-4">
        <div
          className={cn(
            "hidden max-h-full w-[320px] animate-dropdown-open bg-white px-4 py-4 shadow *:grow",
            optionsModal.isOpen && "flex",
          )}
        >
          <DatePicker startDate={startDate} date={date} onChange={onChange} />
        </div>
      </div>

      <button
        type="button"
        className={cn(
          " absolute top-0 z-40 flex h-10 w-full select-none items-center justify-between gap-4 rounded-sm border border-gray-middle bg-white px-3 py-2.5 text-black",
        )}
        onClick={() => {
          optionsModal.onToggle();
        }}
      >
        <div>
          <span className="text-gray-dark">
            {date ? date?.format("YYYY / MM / DD") : "---- / -- / --"}
          </span>
        </div>
        <IoMdCalendar size={14} className="text-black" />
      </button>
    </div>
  );
};

export default DropdownDatePicker;
