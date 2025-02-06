import { setupWorker } from "msw/browser";

import { getAPI } from "@/mocks/testHandlers";

export const onStartWorker = () => {
  // 사용하고자 하는 handler를 아래 배열에 넣어줘야 동작
  const handlers = [getAPI];
  const worker = setupWorker(...handlers);

  return worker.start();
};
