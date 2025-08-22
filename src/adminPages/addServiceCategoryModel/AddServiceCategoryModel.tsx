import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidTrash } from "react-icons/bi";
import DeleteRowDialog from "../../components/deleteRowDialog/DeleteRowDialog";
import { useDeleteComplaintIssueType } from "../../hooks/useComplaints";
import {
  useCreateSerivceCategory,
  useDeleteServiceCategory,
  useServiceCategories,
} from "../../hooks/useServices";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";
import style from "./addServiceCategoryModel.module.css";
import toast from "react-hot-toast";
const AddServiceCategoryModel = () => {
  const { t } = useTranslation();
  const { mutate } = useCreateSerivceCategory();
  const [category, setCategory] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const { data } = useServiceCategories();
  const { mutate: deleteIssueType } = useDeleteServiceCategory();

  const { openDialog, isOpen } = useDeleteDialogStore();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmedCategory = category.trim();

    if (trimmedCategory.length < 3) {
      toast.error(t("admin.addCategory.nameLength"));
      return;
    }
    mutate(category, {
      onError: (err: any) => {
        if (err.status === 409) {
          setErrorMessage(true);
        } else {
          alert(`create service category  : ${err.message}`);
        }
      },
      onSuccess: () => {
        toast.success(t("admin.addCategory.success"));
      },
    });
    setErrorMessage(false);
    setCategory("");
  };
  const handleDeleteClick = (issueId: string) => {
    openDialog(issueId, () => {
      deleteIssueType(issueId);
    });
  };
  return (
    <div className={style.serviceCategory_page_con}>
      <div className={style.serviceCategory_page}>
        <div className={style.serviceCategory_header}>
          <h1>{t("admin.addCategory.addTitle")}</h1>
        </div>

        <div className={style.serviceCategory_body}>
          <div className={style.serviceCategory_inpts}>
            <label htmlFor="title">{t("admin.addCategory.inputLabel")}</label>
            <div className={style.serviceCategoryInpt}>
              <div>
                <input
                  type="text"
                  placeholder={t("admin.addCategory.inputPlaceholder")}
                  id="title"
                  required
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrorMessage(false);
                  }}
                  max={50}
                />
                {errorMessage && (
                  <p className={style.error}>{t("admin.addCategory.err")}</p>
                )}
              </div>
              <button onClick={handleSubmit}>
                {t("admin.addCategory.submitButton")}
              </button>
            </div>
          </div>
          <div className={style.serviceCategory_issues}>
            <h4>{t("admin.addCategory.tableTitle")}</h4>

            {data?.map((categ) => (
              <div key={categ.id} className={style.serviceCategory_issue}>
                <div>
                  <p>{categ.name}</p>
                </div>
                <BiSolidTrash
                  className={style.serviceCategory_trash_icon}
                  onClick={() => handleDeleteClick(categ.id ?? "")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen && <DeleteRowDialog />}
    </div>
  );
};

export default AddServiceCategoryModel;
