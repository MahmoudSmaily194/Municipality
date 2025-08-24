import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidTrash } from "react-icons/bi";
import DeleteRowDialog from "../../components/deleteRowDialog/DeleteRowDialog";
import {
  useCreateComplaintIssueType,
  useDeleteComplaintIssueType,
  usegetComplaintIssueType,
} from "../../hooks/useComplaints";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";
import style from "./IssueTypeModal.module.css";

const IssueTypeModal = () => {
  const { t } = useTranslation();
  const { mutate } = useCreateComplaintIssueType();
  const [issueType, setIssueType] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<{
    duplicate: boolean;
    empty: boolean;
  }>({ duplicate: false, empty: false });
  const { data } = usegetComplaintIssueType();
  const { mutate: deleteIssueType } = useDeleteComplaintIssueType();

  const { openDialog, isOpen } = useDeleteDialogStore();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (issueType.trim().length < 3) {
      setErrorMessage((prev) => ({
        ...prev,
        empty: true,
      }));
      return; // stop here if empty
    }

    mutate(issueType, {
      onError: (err: any) => {
        if (err.status === 409) {
          setErrorMessage((prev) => ({
            ...prev,
            duplicate: true,
          }));
        } else {
          alert(`${t("admin.issues.errorMessage")} `);
        }
      },
      onSuccess: () => {
        setIssueType("");
        setErrorMessage({ empty: false, duplicate: false });
      },
    });
  };

  const handleDeleteClick = (issueId: string) => {
    openDialog(issueId, () => {
      deleteIssueType(issueId);
    });
  };

  return (
    <div className={style.issueTypeModal_page_con}>
      <div className={style.issueTypeModal_page}>
        <div className={style.issueTypeModal_header}>
          <h1>{t("admin.issues.addTitle")}</h1>
        </div>

        <div className={style.issueTypeModal_body}>
          <div className={style.issueTypeModal_inpts}>
            <label htmlFor="title">{t("admin.issues.inputLabel")}</label>
            <div className={style.issuetypeInpt}>
              <div>
                <input
                  type="text"
                  placeholder={t("admin.issues.inputPlaceholder")}
                  id="title"
                  value={issueType}
                  onChange={(e) => {
                    setIssueType(e.target.value);
                    setErrorMessage({
                      empty: false,
                      duplicate: false,
                    });
                  }}
                  maxLength={50} // fixed attribute
                  required
                />
                {errorMessage.duplicate && (
                  <p className={style.error}>
                    {t("admin.issues.duplicateError")}
                  </p>
                )}
                {errorMessage.empty && (
                  <p className={style.error}>{t("admin.issues.empty")}</p>
                )}
              </div>
              <button onClick={handleSubmit}>
                {t("admin.issues.submitButton")}
              </button>
            </div>
          </div>
          <div className={style.issueTypeModal_issues}>
            <h4>{t("admin.issues.tableTitle")}</h4>

            {data?.map((issue) => (
              <div key={issue.id} className={style.issueTypeModal_issue}>
                <div>
                  <p>{issue.issueName}</p>
                </div>
                <BiSolidTrash
                  className={style.issueTypeModal_trash_icon}
                  onClick={() => handleDeleteClick(issue.id ?? "")}
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

export default IssueTypeModal;
