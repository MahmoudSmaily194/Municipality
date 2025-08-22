import { useTranslation } from "react-i18next";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import style from "../../components/dashBoardSideBar/dashBoardSideBar.module.css";
import axiosInstance from "../../services/axiosInstance";
import { useAuthStore } from "../../stores/useAuthStore";
import useLogoutDialogStore from "../../stores/useLogoutDialogStore";

const LogoutButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { setLogoutDialog, setOnConfirm } = useLogoutDialogStore();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("Auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      logout();
      navigate("/admin/login");
    }
  };

  const handleLogoutConfirm = () => {
    setOnConfirm(handleLogout); // Set what should happen on confirm
    setLogoutDialog(true); // Open dialog
  };

  return (
    <button className={style.logoutBtn} onClick={handleLogoutConfirm}>
      <CiLogout className={style.logoutBtn_icon} />
      <p>{t("admin.sidebar.logout")}</p>
    </button>
  );
};

export default LogoutButton;
