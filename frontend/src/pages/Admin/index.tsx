import Layout from "@/components/Layout";
import Tab from "@/components/Tab";
import ReservationInfo from "@/pages/Admin/components/ReservationInfo";
import UserInfo from "@/pages/Admin/components/UserInfo";

const Admin = () => {
  return (
    <Layout>
      <Tab variant="enclosed">
        <Tab.Item label="회원정보 관리" className="relative">
          <UserInfo />
        </Tab.Item>
        <Tab.Item label="예약정보 관리" className="relative">
          <ReservationInfo />
        </Tab.Item>
        {/* <Tab.Item label="교회일정 관리"></Tab.Item> */}
      </Tab>
    </Layout>
  );
};

export default Admin;
