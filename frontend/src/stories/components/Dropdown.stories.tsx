import { useState } from "react";

import { Meta } from "@storybook/react";

import Dropdown from "@/components/Dropdown/Dropdown";
import { cells, communities, teams } from "@/dummy/organization";

const meta: Meta<typeof Dropdown> = {
  title: "components/Dropdown",
  tags: ["autodocs"],
  component: Dropdown,
  decorators: Story => (
    <div className="h-[246px] w-[301.78px]">
      <Story />
    </div>
  ),
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState("");
  const options = ["누가순", "마태순", "마가순", "요한순"];

  return (
    <Dropdown
      selectedOption={value}
      onChangeOption={setValue}
      category={"community"}
      options={options}
      disabled={false}
    />
  );
};

export const ExampleInSignUpPage = () => {
  const [community, setCommunity] = useState("");
  const [team, setTeam] = useState("");
  const [cell, setCell] = useState("");

  return (
    <div className="grid w-96 grid-cols-3 gap-2">
      <Dropdown
        selectedOption={community}
        onChangeOption={setCommunity}
        category={"community"}
        options={communities}
        disabled={false}
      />
      <Dropdown
        selectedOption={team}
        onChangeOption={setTeam}
        category={"team"}
        options={teams}
        disabled={false}
      />

      <Dropdown
        selectedOption={cell}
        onChangeOption={setCell}
        category={"cell"}
        options={cells}
        disabled={false}
      />
    </div>
  );
};

export const DisabledDropdown = () => {
  const [value, setValue] = useState("");
  const options = ["누가순", "마태순", "마가순", "요한순"];

  return (
    <Dropdown
      selectedOption={value}
      onChangeOption={setValue}
      category={"community"}
      options={options}
      disabled={true}
    />
  );
};
