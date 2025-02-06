import { Meta, StoryObj } from "@storybook/react";

import Table from "@/components/Table";
import { tempBody, tempHeader } from "@/dummy/table";

const meta: Meta<typeof Table> = {
  title: "components/Table",
  tags: ["autodocs"],
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: function Render() {
    return <Table header={tempHeader} body={tempBody} />;
  },
};
