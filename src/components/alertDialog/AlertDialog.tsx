import { useEffect } from "react";
import { useAlertDialogStore } from "../../stores/AlertDialogStore";
import style from "./alertDialog.module.css";

const AlertDialog = () => {
  const { setIsOpen, actionText, isOpen } = useAlertDialogStore();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, [isOpen]);

  return (
    <div className={style.alertDialog_layer}>
      <div className={style.alertDialog}>
        <h1>{actionText}</h1>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;
