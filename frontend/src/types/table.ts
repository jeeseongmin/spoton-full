import { ReactNode } from "react";

/**
 * Header, Body에 공통적으로 쓰이는 Cell Info Type
 */
export type CellInfo = {
  type?: string; // "header" | "body"
  name?: string; // Cell Name
  data?: string | ReactNode; // Cell Data
  method?: () => void; // Cell Method
};
