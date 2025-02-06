import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  useRef,
} from "react";

import type { Dayjs } from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { months } from "@/constants/calendar";
import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import useCalendarStore from "@/store/calendarStore";
import { cn } from "@/utils/cn";

interface OptionProps extends ComponentPropsWithoutRef<"button"> {
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Option = ({ children, isSelected, onClick, ...props }: OptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "z-20 flex w-20 select-none items-center justify-center rounded-sm bg-white py-2.5 text-small text-black",
      isSelected && "border border-primary bg-primary font-semibold text-white",
    )}
    {...props}
  >
    {children}
  </button>
);

interface DropdownYearMonthPickerProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  years: number[];
  onClick?: (date: Dayjs) => void;
}

const DropdownYearMonthPicker = ({
  years,
  onClick,
  className,
}: DropdownYearMonthPickerProps) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useCalendarStore(
    useShallow(state => [state.firstDayOfMonth, state.setFirstDayOfMonth]),
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsModal = useModal();
  useOutSideClick(dropdownRef, () => optionsModal.onClose());

  const handleClickOption = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const option = Number(target.dataset.option);

    if (target.name === "year") {
      setFirstDayOfMonth(firstDayOfMonth.year(option).date(1));
      onClick?.(firstDayOfMonth.year(option).date(1));

      return;
    }

    setFirstDayOfMonth(firstDayOfMonth.month(option).date(1));
    onClick?.(firstDayOfMonth.month(option).date(1));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div className="absolute left-1/2 top-8 z-50 -m-1 flex w-fit -translate-x-[calc(50%-0.25rem)] flex-col overflow-hidden p-1">
        <div
          className={cn(
            "hidden max-h-[245px] animate-dropdown-open bg-white shadow *:grow",
            optionsModal.isOpen && "flex",
          )}
        >
          <div className="flex-col overflow-y-scroll overscroll-contain scrollbar-hide">
            {years.map(option => (
              <Option
                key={option}
                name="year"
                data-option={option}
                isSelected={firstDayOfMonth.year() === option}
                onClick={handleClickOption}
              >{`${option}년`}</Option>
            ))}
          </div>
          <div className="flex-col overflow-y-scroll overscroll-contain scrollbar-hide">
            {months.map(option => (
              <Option
                key={option}
                name="month"
                data-option={option}
                isSelected={firstDayOfMonth.month() === option}
                onClick={handleClickOption}
              >{`${option + 1}월`}</Option>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={className}
        onClick={optionsModal.onToggle}
      >
        {firstDayOfMonth.format("YYYY. MM")}
      </button>
    </div>
  );
};

export default DropdownYearMonthPicker;
