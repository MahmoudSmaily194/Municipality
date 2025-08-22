import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "../adminPages/adminLogin/AdminLogin";
import DashBoard from "../adminPages/dashBoard/DashBoard";
import AdminLayout from "../layouts/AdminLatout";
import NewsDashBoared from "../adminPages/dashNews/NewsDashBoared";
import EventsControlPage from "../adminPages/eventsControlPage/EventsControlPage";
import EventModel from "../adminPages/eventModel/EventModel";
import ManageServices from "../adminPages/manageServices/ManageServices";
import ServiceModel from "../adminPages/serviceModel/ServiceModel";
import ManageCompliants from "../adminPages/manageComplaints/ManageComplaints";
import IssueTypeModal from "../adminPages/issueTypeModal/IssueTypeModal";
import ProtectedRoutes from "./ProtectedRoutes";
import ViewNewsItemModel from "../adminPages/viewNewsItemModel/ViewNewsItemModel";
import AdmnViewEventModel from "../adminPages/admnViewEventModel/AdmnViewEventModel";
import UpdateServiceModel from "../adminPages/updateServiceModel/UpdateServiceModel";
import ComplaintViewModel from "../adminPages/complaintViewModel/ComplaintViewModel";
import AdminSettings from "../adminPages/adminSettings/AdminSettings";
import AddServiceCategoryModel from "../adminPages/addServiceCategoryModel/AddServiceCategoryModel";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public login page */}

      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<Navigate to="login" />} />
      {/* Protected admin routes */}
      <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="news" element={<NewsDashBoared />} />
          <Route path="news/:slug" element={<ViewNewsItemModel />} />
          <Route path="events" element={<EventsControlPage />} />
          <Route path="events/:eventSlug" element={<AdmnViewEventModel />} />
          <Route path="eventmodel" element={<EventModel />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="services/:id" element={<UpdateServiceModel />} />
          <Route path="servicemodel" element={<ServiceModel />} />
          <Route path="categorymodel" element={<AddServiceCategoryModel />} />
          <Route path="complaints" element={<ManageCompliants />} />
          <Route path="issuemodel" element={<IssueTypeModal />} />
          <Route path="complaints/:id" element={<ComplaintViewModel />} />
          <Route path=":slug" element={<ViewNewsItemModel />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
