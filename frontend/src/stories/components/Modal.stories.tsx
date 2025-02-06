import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/Button";
import ReservationModal from "@/components/Modal/ReservationModal";
import useModal from "@/hooks/useModal";

const meta: Meta<typeof ReservationModal> = {
  title: "components/Modal/ReservationModal",
  tags: ["autodocs"],
  component: ReservationModal,
  decorators: Story => (
    <div className="h-[400px] w-full">
      <Story />
    </div>
  ),
  argTypes: {
    children: {
      description: "Header, Content, Footer로 구성됩니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReservationModal>;

export const Default: Story = {
  render: function Render() {
    const modal = useModal();

    return (
      <>
        <Button variant="primary" onClick={modal.onOpen}>
          Reservation Modal Open
        </Button>
        {modal.isOpen && (
          <ReservationModal onClose={modal.onClose}>
            <ReservationModal.Header>제목</ReservationModal.Header>
            <ReservationModal.Content>내용</ReservationModal.Content>
            <ReservationModal.Footer>
              <Button variant="primary" onClick={modal.onClose}>
                버튼
              </Button>
            </ReservationModal.Footer>
          </ReservationModal>
        )}
      </>
    );
  },
};

export const Subtitle: Story = {
  render: function Render() {
    const modal = useModal();

    return (
      <>
        <Button variant="primary" onClick={modal.onOpen}>
          예약하기
        </Button>
        {modal.isOpen && (
          <ReservationModal onClose={modal.onClose}>
            <ReservationModal.Header>
              <div>예약 불가</div>
              <div className="text-base leading-tight">
                <p>해당 기간 중 이미 예약된 내역이 있어 예약이 불가합니다.</p>
                <p>
                  <span className="font-semibold">
                    날짜 / 시간 / 장소 등을 변경
                  </span>
                  해 다시 예약해주세요
                </p>
              </div>
            </ReservationModal.Header>
            <ReservationModal.Content>내용</ReservationModal.Content>
            <ReservationModal.Footer>
              <Button variant="outlined" onClick={modal.onClose}>
                취소
              </Button>
              <Button variant="primary" onClick={modal.onClose}>
                확인
              </Button>
            </ReservationModal.Footer>
          </ReservationModal>
        )}
      </>
    );
  },
};
