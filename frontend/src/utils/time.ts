/**
 * 시간(hour)을 숫자로 받아 두 자릿수 문자열로 변환하는 함수
 * @example convertHourToText(3) → "03"
 */
export const convertHourToText = (hour: number) =>
  hour < 10 ? `0${hour}` : String(hour);

/**
 * 분(0, 30)을 숫자로 받아 0 또는 0.5로 변환하는 함수
 */
export const convertMinuteToNumber = (time: number) => (time % 1 > 0 ? 0.5 : 0);

/**
 * 분(0, 30)을 두 자릿수 문자열로 변한하는 함수
 */
export const convertMinuteToText = (time: number) => {
  if (!time) return;

  return time % 1 > 0 ? "30" : "00";
};

/**
 * 시간을 숫자로 받아 시간, 분을 텍스트로 변환하는 함수
 * @example convertTimeToText(2.5) → "(2시간 30분)"
 */
export const convertTimeToText = (time: number) => {
  const totalHour = Math.floor(time);

  if (time % 1 > 0) {
    return totalHour > 0 ? `(${totalHour}시간 30분)` : "(30분)";
  }

  return `(${totalHour}시간)`;
};

export const convertTimeToHourMinuteText = (time: string) => {
  const convertedTime = String(time).padStart(6, "0");

  const [hour, minute] = [
    convertedTime.split("").slice(0, 2).join(""),
    convertedTime.split("").slice(2, 4).join(""),
  ];

  return `${hour}:${minute}`;
};
