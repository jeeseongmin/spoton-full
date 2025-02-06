import type { Meta, StoryObj } from "@storybook/react";
import { BiCalendarEvent } from "react-icons/bi";
import { RiListUnordered } from "react-icons/ri";

import Schedule from "@/components/Schedule";
import Tab from "@/components/Tab";
import { daysOfTheWeek } from "@/constants/calendar";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

const meta: Meta<typeof Tab> = {
  title: "components/Tab",
  tags: ["autodocs"],
  component: Tab,
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Enclosed: Story = {
  render: function Render() {
    return (
      <Tab variant="enclosed">
        <Tab.Item label="장소로 검색">Content 1</Tab.Item>
        <Tab.Item label="시간으로 검색">Content 2</Tab.Item>
        <Tab.Item label="반복 예약" disabled>
          Content 3
        </Tab.Item>
      </Tab>
    );
  },
};

export const Underlined: Story = {
  render: function Render() {
    return (
      <Tab variant="underlined">
        <Tab.Item label="예약 현황">Content 1</Tab.Item>
        <Tab.Item label="나의 예약">Content 2</Tab.Item>
      </Tab>
    );
  },
};

export const Solid: Story = {
  render: function Render() {
    return (
      <Tab variant="solid">
        <Tab.Item icon={BiCalendarEvent}>Content 1</Tab.Item>
        <Tab.Item icon={RiListUnordered}>Content 2</Tab.Item>
      </Tab>
    );
  },
};

export const Overlapped: Story = {
  render: function Render() {
    const date = useCalendarStore(state => state.date);

    return (
      <Tab variant="enclosed" className="p-4">
        <Tab.Item label="예약내역 관리">
          <Tab variant="solid" querystringKey="subTab">
            <Tab.Item label="승인 요청" className="text-small">
              Content 1
            </Tab.Item>
            <Tab.Divider />
            <Tab.Item label="전체">Content 2</Tab.Item>
            <Tab.Item label="일반 예약" className="text-small">
              Content 3
            </Tab.Item>
            <Tab.Item label="반복 예약" className="text-small">
              Content 4
            </Tab.Item>
          </Tab>
        </Tab.Item>
        <Tab.Item label="교회일정 관리">
          <Tab
            variant="solid"
            querystringKey="subTab"
            className="mt-4 flex w-full gap-2"
          >
            <Tab.Item icon={BiCalendarEvent}>
              <div className="w-2/3 bg-white">
                <Schedule />
              </div>
              <div className="w-1/3">
                <div className="mb-12 flex items-center justify-center border-b-2 border-gray-middle py-6 text-black">
                  교회 일정
                </div>
                <ReservationCard
                  date={`${date.format("MM / DD")} (${daysOfTheWeek[date.day()]})`}
                  reservationList={[]}
                />
              </div>
            </Tab.Item>
            <Tab.Item icon={RiListUnordered}>Content</Tab.Item>
          </Tab>
        </Tab.Item>
      </Tab>
    );
  },
};
