import { useState } from "react";

import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import {
  ADMIN_MAIN_URL,
  MYPAGE_MAIN_URL,
  RESERVATION_MAIN_URL,
} from "@/constants/routes";
import useModal from "@/hooks/useModal";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

type MenuModalProps = {
  onClose: () => void;
};
const MenuModal = ({ onClose }: MenuModalProps) => {
  const navigate = useNavigate();
  const { logout } = useLoginStore();
  const [resetUserInfo, roleId] = useUserStore(
    useShallow(state => [state.resetUserInfo, state.roleId]),
  );
  const [alertMessage] = useState("정말 로그아웃하시겠습니까?");
  const confirmModal = useModal();

  const spotOnLogout = () => {
    confirmModal.onOpen();
    // 유저 정보 지우기
    resetUserInfo();
    // 서비스 로그아웃
    logout();
  };

  return (
    <ModalLayout variant="sidebar" onClose={onClose}>
      {/* Close Section */}
      <div className="flex h-16 w-full flex-row items-center justify-end border-b border-gray-200 px-12 py-4 text-right shadow-sm md:px-20">
        <Button variant="icon" onClick={onClose}>
          <TfiClose size={20} />
        </Button>
      </div>

      {/* Button Section */}
      <Button
        variant="custom"
        onClick={() => navigate(RESERVATION_MAIN_URL)}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        예약하기
      </Button>
      {roleId === "ROLE_ADMIN" && (
        <Button
          variant="custom"
          onClick={() => navigate(ADMIN_MAIN_URL)}
          className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
        >
          통합 관리
        </Button>
      )}
      <Button
        variant="custom"
        onClick={() => {
          navigate(MYPAGE_MAIN_URL);
          onClose();
        }}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        마이페이지
      </Button>
      <Button
        variant="custom"
        onClick={() => confirmModal.onOpen()}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        로그아웃
      </Button>
      {confirmModal.isOpen && (
        <ConfirmModal
          title="로그아웃"
          onConfirm={spotOnLogout}
          onClose={confirmModal.onClose}
        >
          {alertMessage}
        </ConfirmModal>
      )}
    </ModalLayout>
  );
};

export default MenuModal;
