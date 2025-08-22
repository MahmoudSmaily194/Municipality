import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../components/dashBoardSideBar/DashBoardSideBar";
import LogoutDialog from "../components/logoutDialog/LogoutDialog";
import useLogoutDialogStore from "../stores/useLogoutDialogStore";

const AdminLayout = () => {
  const {logoutDialog} =useLogoutDialogStore();
  return (
    <div style={{display:"flex"}}>
      <DashBoardSideBar />
      <Outlet />
      { logoutDialog && <LogoutDialog/>}
    </div>
  );
};

export default AdminLayout;
