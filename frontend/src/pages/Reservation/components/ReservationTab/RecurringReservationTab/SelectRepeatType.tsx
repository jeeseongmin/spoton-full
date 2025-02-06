import { Dayjs } from "dayjs";

import Button from "@/components/Button";
import {
  cycleTypeByEnglish,
  daysOfTheWeek,
  daysOfTheWeekByEnglish,
  orderText,
} from "@/constants/calendar";
import { getWeekOrder } from "@/utils/calendar";
import { cn } from "@/utils/cn";

import { cycleTypeByKorean } from "../../../../../constants/calendar";

interface SelectRepeatTypeProps {
  typeObj: TypeObj;
  selectedDate: Dayjs;
  onChange: (typeObj: TypeObj) => void;
}

type TypeObj = {
  type: string;
  option: string;
};

const SelectRepeatType = ({
  typeObj,
  selectedDate,
  onChange,
}: SelectRepeatTypeProps) => {
  const selectedStyle = "bg-primary text-white border-primary";
  const customButtonStyle = "border border-gray-middle drop-shadow-none";
  const customDayButtonStyle = "px-[10px]";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        {cycleTypeByEnglish.map((text, index) => {
          return (
            <Button
              variant="outlined"
              className={cn(
                customButtonStyle,
                `${typeObj.type === text && selectedStyle}`,
              )}
              onClick={() => onChange({ ...typeObj, type: text })}
            >
              {cycleTypeByKorean[index]}
            </Button>
          );
        })}
      </div>

      {typeObj.type === "weekly" && (
        <div className="flex flex-row flex-wrap gap-2">
          {daysOfTheWeekByEnglish.map((text, index) => {
            return (
              <Button
                variant="outlined"
                className={cn(
                  customButtonStyle,
                  customDayButtonStyle,
                  `${typeObj.option === text && selectedStyle}`,
                )}
                onClick={() => onChange({ ...typeObj, option: text })}
              >
                {daysOfTheWeek[index]}
              </Button>
            );
          })}
        </div>
      )}

      {typeObj.type === "monthly" && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === String(selectedDate.date()) && selectedStyle}`,
            )}
            onClick={() =>
              onChange({ ...typeObj, option: String(selectedDate.date()) })
            }
          >
            {selectedDate.date()}일
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === getWeekOrder(selectedDate) + "-" + selectedDate.day() && selectedStyle}`,
            )}
            onClick={() =>
              onChange({
                ...typeObj,
                option: getWeekOrder(selectedDate) + "-" + selectedDate.day(),
              })
            }
          >
            {/* {weekInfoText} */}
            {`${orderText[getWeekOrder(selectedDate) as number]} ${daysOfTheWeek[selectedDate.day()]}요일`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectRepeatType;
