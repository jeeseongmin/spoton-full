import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  useRef,
} from "react";

import { MdAccessTime } from "react-icons/md";

import AlertModal from "@/components/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { cn } from "@/utils/cn";
import {
  convertHourToText,
  convertMinuteToNumber,
  convertMinuteToText,
  convertTimeToText,
} from "@/utils/time";

interface OptionProps extends ComponentPropsWithoutRef<"button"> {
  option: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Option = ({
  option,
  isSelected,
  isDisabled = false,
  onClick,
  ...props
}: OptionProps) => {
  const selectedStyle = "bg-primary text-white border border-primary";
  const nonSelectedStyle = "bg-white text-black";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "z-20 flex w-full select-none items-center justify-center rounded-sm py-2.5 text-small font-light",
        isSelected ? selectedStyle : nonSelectedStyle,
        isDisabled && "text-gray-middle",
      )}
      disabled={isDisabled}
      {...props}
    >
      {option}
    </button>
  );
};

interface DropdownProps {
  selectedOption: number;
  onChangeOption: (option: number) => void;
  startTime: number;
  endTime: number;
  totalTime?: number;
}

const Dropdown = ({
  selectedOption,
  onChangeOption,
  startTime,
  endTime,
  totalTime,
}: DropdownProps) => {
  const placeholder = "--:--";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsModal = useModal();
  const alertModal = useModal();
  useOutSideClick(dropdownRef, () => optionsModal.onClose());

  const hour = Math.floor(selectedOption);
  const hourOptions = Array.from(
    { length: endTime - Math.round(startTime) + 1 },
    (_, index) => {
      const hourOption = index + Math.round(startTime);

      return convertHourToText(hourOption);
    },
  );
  const minuteOptions = ["00", "30"];

  const getIsDisabledOption = (option: string) => {
    const isSameStartTime =
      totalTime && hour === Math.floor(startTime) && option === "00";
    const isMidnight = totalTime && hour === 24 && option === "30";

    if (isSameStartTime || isMidnight) return true;

    return false;
  };

  const timeText = totalTime ? convertTimeToText(totalTime) : "";

  const handleClickOption = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const value = target.innerText;

    if (target.name === "hour") {
      const hourValue = parseInt(value);
      const isSameStartTime =
        totalTime !== undefined && hourValue === Math.floor(startTime);
      const isMidnight = totalTime && hourValue === 24;

      const minute = isSameStartTime
        ? 0.5
        : isMidnight
          ? 0
          : convertMinuteToNumber(selectedOption);

      onChangeOption(hourValue + minute);
    } else {
      const newMinute = value === "00" ? 0 : 0.5;

      onChangeOption(hour + newMinute);
    }
  };

  const handleClickDropdown = () => {
    if (!startTime) {
      alertModal.onOpen();

      return;
    }

    optionsModal.onToggle();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative h-10 min-w-fit flex-1 whitespace-nowrap"
    >
      <div className="absolute left-0 top-11 z-40 -m-4 flex w-fit flex-col overflow-hidden p-4">
        <div
          className={cn(
            "hidden max-h-[245px] w-[97px] animate-dropdown-open bg-white shadow *:grow",
            optionsModal.isOpen && "flex",
          )}
        >
          <div className="flex-col overflow-y-scroll overscroll-contain scrollbar-hide">
            {hourOptions.map(option => (
              <Option
                key={option}
                name="hour"
                option={option}
                isSelected={convertHourToText(hour) === option}
                onClick={handleClickOption}
              />
            ))}
          </div>
          <div className="flex-col overflow-y-scroll overscroll-contain scrollbar-hide">
            {minuteOptions.map(option => (
              <Option
                key={option}
                name="minute"
                option={option}
                isSelected={convertMinuteToText(selectedOption) === option}
                isDisabled={getIsDisabledOption(option)}
                onClick={handleClickOption}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          "absolute top-0 z-30 flex h-10 w-full select-none items-center justify-between gap-2 rounded-sm border border-gray-middle bg-white px-3 py-2.5 text-small",
          selectedOption ? "text-black" : "text-gray-dull",
        )}
        onClick={handleClickDropdown}
      >
        <div>
          <span>
            {selectedOption
              ? `${hour} : ${convertMinuteToText(selectedOption)}`
              : placeholder}
          </span>
          <span className="mx-5 text-gray-dark">{timeText}</span>
        </div>
        <MdAccessTime size={14} className="text-black" />
      </button>
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>
          시작 시간을 선택하세요.
        </AlertModal>
      )}
    </div>
  );
};

export default Dropdown;
