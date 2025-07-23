import { Route, Routes } from "react-router-dom";
import AdminLogin from "../adminPages/adminLogin/AdminLogin";
import DashBoard from "../adminPages/dashBoard/DashBoard";
import AdminLayout from "../layouts/AdminLatout";
import NewsDashBoared from "../adminPages/dashNews/NewsDashBoared";
import EventsControlPage from "../adminPages/eventsControlPage/EventsControlPage";
import EventModel from "../adminPages/eventModel/EventModel";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="news" element={<NewsDashBoared/>}/>
          <Route path="events" element={<EventsControlPage/>}/>
          <Route path="eventmodel" element={<EventModel/>}/>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
