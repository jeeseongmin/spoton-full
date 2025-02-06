import { useEffect, useState } from "react";

import useBodyScrollLock from "@/hooks/useBodyScrollLock";

/* modal 사용을 위한 Hook */
const useModal = () => {
  /* modal 토글 상태 관련 state */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /* modal 사용 시 스크롤 방지 hook */
  const { lockScroll, openScroll } = useBodyScrollLock();

  useEffect(() => {
    if (isOpen) lockScroll();
    else openScroll();
  }, [isOpen]);

  const onOpen = () => {
    lockScroll();
    setIsOpen(true);
  };

  const onClose = () => {
    openScroll();
    setIsOpen(false);
  };

  const onToggle = () => {
    if (isOpen) onClose();
    else onOpen();
  };

  return { isOpen, onOpen, onClose, onToggle } as const;
};

export default useModal;
