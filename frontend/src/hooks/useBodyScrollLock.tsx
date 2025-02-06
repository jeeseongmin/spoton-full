import { useCallback } from "react";

/* 모달이 떠있는 상태에서 스크롤을 방지하는 Hook */
const useBodyScrollLock = () => {
  /* 스크롤 잠금 : 모달이 켜질 때 사용  */
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  /* 스크롤 해제 : 모달이 사라질 때 사용 */
  const openScroll = useCallback(() => {
    document.body.style.removeProperty("overflow");
  }, []);

  return { lockScroll, openScroll };
};

export default useBodyScrollLock;
