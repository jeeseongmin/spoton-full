import { useEffect, useState } from "react";

import { putUserState } from "@/apis/user";
import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import UserModal from "@/components/Modal/UserModal";
import Table from "@/components/Table";
import {
  APPROVE_USER_MESSAGE,
  CONFIRM_APPROVE_USER_MESSAGE,
  CONFIRM_REJECT_USER_MESSAGE,
  EMPTY_USER_LIST_MESSAGE,
  REJECT_USER_MESSAGE,
} from "@/constants/messages/admin";
import { REQUEST_ERROR_MESSAGE } from "@/constants/messages/common";
import useModal from "@/hooks/useModal";
import UserDetails from "@/pages/Admin/components/UserInfo/UserDetails";
import { CellInfo } from "@/types/table";
import { UserByState } from "@/types/user";
import { getTableBody, getTableHeader, getUserBodyData } from "@/utils/table";

const userTableHeader = [
  "이름",
  "공동체",
  "다락방",
  "순",
  "연락처",
  "가입 여부",
  "가입일자",
  "",
  "",
];
const header = getTableHeader(userTableHeader);

interface UserTable {
  users: UserByState[];
  updateUsers: () => void;
}
const UserTable = ({ users, updateUsers }: UserTable) => {
  const [userBody, setUserBody] = useState<CellInfo[][]>([]);
  const [selectedUser, setSelectedUser] = useState<UserByState | null>(null);

  const [alertMessage, setAlertMessage] = useState("");
  const alertModal = useModal();
  const userModal = useModal();
  const confirmApproveModal = useModal();
  const confirmRejectModal = useModal();

  const changeUserState = async (userStateCode: string, userId: string) => {
    await putUserState({ userStateCode, userId });
    updateUsers();
  };
  const handleConfirmApprove = () => {
    if (!selectedUser) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeUserState("01", selectedUser?.userId);
      setAlertMessage(APPROVE_USER_MESSAGE);
    }

    alertModal.onOpen();
    confirmApproveModal.onClose();
  };

  const handleConfirmReject = () => {
    if (!selectedUser) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeUserState("00", selectedUser?.userId);
      setAlertMessage(REJECT_USER_MESSAGE);
    }

    alertModal.onOpen();
    confirmRejectModal.onClose();
  };

  useEffect(() => {
    const reservationTableBody = users.map(user => {
      const showUserModal = () => {
        setSelectedUser(user);
        userModal.onOpen();
      };

      const approveUser = () => {
        setSelectedUser(user);
        confirmApproveModal.onOpen();
      };

      const rejectUser = () => {
        setSelectedUser(user);
        confirmRejectModal.onOpen();
      };

      return getUserBodyData(user, showUserModal, approveUser, rejectUser);
    });

    setUserBody(getTableBody(userTableHeader, reservationTableBody));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  if (users.length === 0 && !alertModal.isOpen) {
    return (
      <div className="flex h-20 items-center justify-center">
        <div>{EMPTY_USER_LIST_MESSAGE}</div>
      </div>
    );
  }

  return (
    <>
      <Table header={header} body={userBody} />
      {userModal.isOpen && (
        <UserModal onClose={userModal.onClose}>
          <UserModal.Header>회원 상세 정보</UserModal.Header>
          <UserModal.Content>
            {selectedUser && <UserDetails user={selectedUser} />}
          </UserModal.Content>
          <UserModal.Footer>
            <Button variant="primary" onClick={userModal.onClose}>
              확인
            </Button>
          </UserModal.Footer>
        </UserModal>
      )}

      {confirmApproveModal.isOpen && (
        <ConfirmModal
          title="회원 가입 승인"
          onConfirm={handleConfirmApprove}
          onClose={confirmApproveModal.onClose}
        >
          {CONFIRM_APPROVE_USER_MESSAGE}
        </ConfirmModal>
      )}
      {confirmRejectModal.isOpen && (
        <ConfirmModal
          title="회원 가입 반려"
          onConfirm={handleConfirmReject}
          onClose={confirmRejectModal.onClose}
        >
          {CONFIRM_REJECT_USER_MESSAGE}
        </ConfirmModal>
      )}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </>
  );
};

export default UserTable;
