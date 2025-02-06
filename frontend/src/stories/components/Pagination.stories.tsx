import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "@/components/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "components/Pagination",
  tags: ["autodocs"],
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);

    return <Pagination count={13} page={page} onChange={setPage} />;
  },
};
