import Tab from "@/components/Tab";
import PlaceSearchTab from "@/pages/Reservation/components/ReservationTab/PlaceSearchTab";
// import RecurringReservationTab from "@/pages/Reservation/components/ReservationTab/RecurringReservationTab";
import TimeSearchTab from "@/pages/Reservation/components/ReservationTab/TimeSearchTab";

const ReservationTab = () => {
  return (
    <Tab variant="enclosed">
      <Tab.Item label="장소로 검색">
        <PlaceSearchTab />
      </Tab.Item>
      <Tab.Item label="시간으로 검색">
        <TimeSearchTab />
      </Tab.Item>
      {/* <Tab.Item label="반복 예약">
        <RecurringReservationTab />
      </Tab.Item> */}
    </Tab>
  );
};

export default ReservationTab;
