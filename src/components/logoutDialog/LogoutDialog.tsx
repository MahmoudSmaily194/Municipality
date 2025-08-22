import useLogoutDialogStore from "../../stores/useLogoutDialogStore";
import style from "./logoutDialog.module.css";

const LogoutDialog = () => {
  const { setLogoutDialog, onConfirm } = useLogoutDialogStore();

  return (
    <div className={style.logout_dialog_con}>
      <div className={style.logout_dialog}>
        <h3>Delete item</h3>
        <p>Are you sure you want to Logout? This action cannot be undone.</p>
        <div className={style.logout_dialog_btns}>
          <button
            onClick={() => setLogoutDialog(false)}
            className={style.cancel_logout}
            style={{ backgroundColor: "#d1d5db", color: "#111827" }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm(); // Execute the callback
              setLogoutDialog(false); // Close dialog after action
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
