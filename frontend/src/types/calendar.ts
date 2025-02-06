import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { type Dayjs } from "dayjs";

export interface CalendarItemProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"td"> {
  dayOfTheWeek: number;
  dayData?: Dayjs;
  type?: string;
  isInactive?: boolean;
  isSelected?: boolean;
}
