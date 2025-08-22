import type { FC } from "react";
import style from "./deleteDialog.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  setDeleteUploadedImage: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const DeleteDialog: FC<Props> = ({
  setDeleteUploadedImage,
  setUploadedImage,
}) => {
  const { t } = useTranslation();

  return (
    <div className={style.delete_dialog_con}>
      <div className={style.delete_dialog}>
        <h3>{t("public.deleteDialog.title")}</h3>
        <p>{t("public.deleteDialog.message")}</p>
        <div className={style.delete_dialog_btns}>
          <button
            onClick={() => {
              setDeleteUploadedImage(false);
            }}
            className={style.cancel_delete}
            style={{ backgroundColor: "#d1d5db", color: "#111827" }}
          >
            {t("public.deleteDialog.buttons.cancel")}
          </button>
          <button
            onClick={() => {
              setUploadedImage(null);
              setDeleteUploadedImage(false);
            }}
          >
            {t("public.deleteDialog.buttons.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
