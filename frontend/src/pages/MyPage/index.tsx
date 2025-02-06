import Layout from "@/components/Layout";
import Tab from "@/components/Tab";
import MyInfo from "@/pages/MyPage/components/MyInfo";
import MyReservation from "@/pages/MyPage/components/MyReservation";

const MyPage = () => {
  return (
    <Layout>
      <Tab variant="enclosed">
        <Tab.Item label="내 정보">
          <MyInfo />
        </Tab.Item>
        <Tab.Item label="나의 예약">
          <MyReservation />
        </Tab.Item>
      </Tab>
    </Layout>
  );
};

export default MyPage;
