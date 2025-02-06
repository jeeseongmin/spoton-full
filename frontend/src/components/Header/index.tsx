import { useRef, useState } from "react";

import { HiUserCircle } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import {
  ADMIN_MAIN_URL,
  HOME_MAIN_URL,
  MYPAGE_MAIN_URL,
  RESERVATION_MAIN_URL,
} from "@/constants/routes";
import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

type HeaderProps = {
  onOpen: () => void;
};

const Header = ({ onOpen }: HeaderProps) => {
  const navigate = useNavigate();

  const { logout } = useLoginStore();
  const [resetUserInfo, roleId] = useUserStore(
    useShallow(state => [state.resetUserInfo, state.roleId]),
  );

  const profileRef = useRef<HTMLDivElement>(null);
  const profileModal = useModal();
  const [alertMessage] = useState("정말 로그아웃하시겠습니까?");
  const confirmModal = useModal();

  useOutSideClick(profileRef, () => profileModal.onClose());

  const spotOnLogout = () => {
    confirmModal.onOpen();
    // 유저 정보 지우기
    resetUserInfo();
    // 서비스 로그아웃
    logout();
  };

  return (
    <nav className="flex h-20 flex-row items-center justify-between border-b border-gray-middle px-4 shadow-sm sm:px-12 md:px-20 lg:px-32 xl:px-60">
      <Button
        variant="custom"
        className="h-[45px] w-[96px]"
        onClick={() => navigate(HOME_MAIN_URL)}
      >
        <img src={Logo} className="h-full w-full object-contain" />
      </Button>

      <div className="hidden flex-row items-center gap-10 md:flex">
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => navigate(RESERVATION_MAIN_URL)}
        >
          예약하기
        </Button>
        {roleId === "ROLE_ADMIN" && (
          <Button
            variant="custom"
            className="text-gray-500"
            onClick={() => navigate(ADMIN_MAIN_URL)}
          >
            통합관리
          </Button>
        )}
        <div ref={profileRef} className="relative">
          <Button
            onClick={profileModal.onToggle}
            variant="custom"
            className="text-gray-400"
          >
            <HiUserCircle size={40} />
          </Button>
          {profileModal.isOpen && (
            <div className="absolute right-0 flex h-auto w-auto flex-col items-center rounded-md border border-gray-middle bg-white shadow-sm">
              <Button
                variant="custom"
                className="h-10 w-28 border-b border-gray-middle text-small text-gray-500 hover:bg-primary hover:text-white"
                onClick={() => navigate(MYPAGE_MAIN_URL)}
              >
                마이페이지
              </Button>
              <Button
                variant="custom"
                className="h-10 w-28 text-small text-gray-500 hover:bg-primary hover:text-white"
                onClick={() => confirmModal.onOpen()}
              >
                로그아웃
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:hidden">
        <Button variant="custom" onClick={onOpen}>
          <RxHamburgerMenu size={26} />
        </Button>
      </div>
      {confirmModal.isOpen && (
        <ConfirmModal
          title="로그아웃"
          onConfirm={spotOnLogout}
          onClose={confirmModal.onClose}
        >
          {alertMessage}
        </ConfirmModal>
      )}
    </nav>
  );
};

export default Header;
