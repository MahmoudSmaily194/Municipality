import type { FC } from "react";
import style from "./deleteDialog.module.css";
type Props={
    setDeleteUploadedImage: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
}
const DeleteDialog: FC<Props>= ({ 
  setDeleteUploadedImage,
  setUploadedImage,
}) => {
  return (
    <div className={style.delete_dialog_con}>
      <div className={style.delete_dialog}>
        <h3>Delete item</h3>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className={style.delete_dialog_btns}>
          <button onClick={()=>{setDeleteUploadedImage(false)}} className={style.cancel_delete} style={{backgroundColor:" #d1d5db" ,color:"#111827"}}> Cancel</button>
          <button  onClick={()=>{setUploadedImage(null) ,setDeleteUploadedImage(false)}}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
