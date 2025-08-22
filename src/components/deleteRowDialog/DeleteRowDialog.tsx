import toast from "react-hot-toast";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";
import style from "../deleteDialog/deleteDialog.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const DeleteRowDialog = () => {
  const { isOpen, closeDialog, onConfirm } = useDeleteDialogStore();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleDelete = () => {
    if (onConfirm) onConfirm();
    closeDialog();
    toast.error(t("toast.deleteRow"), {
      icon: <FaRegTrashCan style={{ color: "red" }} />,
    });
  };

  return (
    <div className={style.delete_dialog_con}>
      <div className={style.delete_dialog}>
        <h3>{t("admin.deleteDialog.title")}</h3>
        <p>{t("admin.deleteDialog.message")}</p>
        <div className={style.delete_dialog_btns}>
          <button
            onClick={closeDialog}
            className={style.cancel_delete}
            style={{ backgroundColor: "#d1d5db", color: "#111827" }}
          >
            {t("admin.deleteDialog.buttons.cancel")}
          </button>
          <button onClick={handleDelete}>
            {t("admin.deleteDialog.buttons.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRowDialog;
