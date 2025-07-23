import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../components/dashBoardSideBar/DashBoardSideBar";

const AdminLayout = () => {
  return (
    <div style={{display:"flex"}}>
      <DashBoardSideBar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
