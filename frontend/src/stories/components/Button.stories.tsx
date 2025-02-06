import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/Button";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    variant: {
      description:
        "상황에 따라 원하는 버튼 스타일을 선택 사용할 수 있는 상태값입니다.",
      table: {
        type: { summary: "string", reuqired: true },
      },
      control: {
        type: "radio",
        options: ["primary", "radio"],
      },
    },
    disabled: {
      description: "버튼 사용 상태를 제어할 수 있는 disabled 상태값입니다.",
      table: {
        type: { summary: "boolean" },
      },
      control: {
        type: "boolean",
        options: [true, false],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "Primary 버튼",
  args: {
    children: "확인하기",
    variant: "primary",
  },
};

export const Outlined: Story = {
  name: "Outlined 버튼",
  args: {
    children: "확인하기",
    variant: "outlined",
  },
};

export const Underlined: Story = {
  name: "Underlined 버튼",
  args: {
    children: "승인",
    variant: "underlined",
  },
};

export const Add: Story = {
  name: "Add 버튼",
  args: {
    children: "추가하기",
    variant: "add",
  },
};

export const Kakao: Story = {
  name: "Kakao Login 버튼",
  args: {
    children: "카카오톡으로 로그인 / 회원가입",
    variant: "kakao",
  },
};
