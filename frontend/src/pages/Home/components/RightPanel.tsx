import Tab from "@/components/Tab";
import DailyReservationList from "@/pages/Home/components/DailyReservationList";

const RightPanel = () => {
  return (
    <div className="h-fit w-full rounded-sm bg-white-dull px-4 pb-4 drop-shadow-base md:h-[622px] md:w-[345px]">
      <Tab variant="underlined">
        <Tab.Item label="예약 현황">
          <DailyReservationList />
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default RightPanel;
