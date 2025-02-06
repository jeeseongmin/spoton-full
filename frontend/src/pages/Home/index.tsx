import { useEffect } from "react";

import Layout from "@/components/Layout";
import Schedule from "@/components/Schedule";
import RightPanel from "@/pages/Home/components/RightPanel";
import useCalendarStore from "@/store/calendarStore";

const Home = () => {
  const resetCalendar = useCalendarStore(state => state.resetCalendar);

  useEffect(() => {
    resetCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-between gap-6 pb-32 md:flex-row">
        <Schedule />
        <RightPanel />
      </div>
    </Layout>
  );
};

export default Home;
