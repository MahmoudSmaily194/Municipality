import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import AlertDialog from "../../components/alertDialog/AlertDialog";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import LocationSelector from "../../components/municipalityMap/LocationSelector";
import {
  useCreateComplaint,
  usegetComplaintIssueType,
} from "../../hooks/useComplaints";
import { useAlertDialogStore } from "../../stores/AlertDialogStore";
import type { ComplaintFormDataType } from "./ComplaintFormDataType";

import style from "./report.module.css";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";

const Report = () => {
  const { t } = useTranslation();
  const { isOpen } = useAlertDialogStore();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [deleteUploadedImage, setDeleteUploadedImage] = useState(false);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const { data } = usegetComplaintIssueType();
  const [validateInputs, setValidateInputs] = useState<{
    nameError: string | null;
    phoneError: string | null;
  }>({
    nameError: null,
    phoneError: null,
  });

  const [complaintFormData, setComplaintFormData] =
    useState<ComplaintFormDataType>({
      fullName: "",
      phoneNumber: "",
      issueTypeId: "",
      description: "",
      latitude: "",
      longitude: "",
    });

  const handleSaveLocation = (coords: [number, number]) => {
    setComplaintFormData((prev) => ({
      ...prev,
      latitude: coords[0].toString(),
      longitude: coords[1].toString(),
    }));
  };

  useEffect(() => {
    document.body.style.overflow = deleteUploadedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [deleteUploadedImage]);

  const { mutate: createComplaint, isPending } = useCreateComplaint();

  const fullNameHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    let error: string | null = null;
    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/; // Arabic + English + spaces

    if (value === "")
      error = t("public.reportForm.validation.fullName.required");
    else if (value.length < 3)
      error = t("public.reportForm.validation.fullName.minLength");
    else if (!nameRegex.test(value))
      error = t("public.reportForm.validation.fullName.lettersOnly");
    else if (value.split(" ").filter(Boolean).length < 2)
      error = t("public.reportForm.validation.fullName.firstLast");

    setValidateInputs((prev) => ({ ...prev, nameError: error }));
    setComplaintFormData((prev) => ({ ...prev, fullName: event.target.value }));
  };

  const phoneNbHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const regex = /^(3\d{6}|7[013689]\d{6}|81\d{6})$/;

    let error: string | null = null;
    if (value === "")
      error = t("public.reportForm.validation.mobileNumber.required");
    else if (!/^\d+$/.test(value))
      error = t("public.reportForm.validation.mobileNumber.digitsOnly");
    else if (value.length !== 8)
      error = t("public.reportForm.validation.mobileNumber.exactLength");
    else if (!regex.test(value))
      error = t("public.reportForm.validation.mobileNumber.invalid");

    setValidateInputs((prev) => ({ ...prev, phoneError: error }));
    setComplaintFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const scrollToError = () => {
    if (validateInputs.nameError && fullNameRef.current) {
      fullNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      fullNameRef.current.focus();
      return true;
    }
    if (validateInputs.phoneError && phoneNumberRef.current) {
      phoneNumberRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      phoneNumberRef.current.focus();
      return true;
    }
    if (
      (!complaintFormData.latitude || !complaintFormData.longitude) &&
      locationRef.current
    ) {
      locationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return true;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trigger validation
    fullNameHandleChange({
      target: { value: complaintFormData.fullName },
    } as any);
    phoneNbHandleChange({
      target: { value: complaintFormData.phoneNumber },
    } as any);

    const hasErrors = scrollToError();
    if (hasErrors) return;
    toast.success(t("public.reportForm.submit") + " ✅");
    const formData = new FormData();
    formData.append("FullName", complaintFormData.fullName);
    formData.append("PhoneNumber", `+961${complaintFormData.phoneNumber}`);
    formData.append("Description", complaintFormData.description);
    formData.append("IssueId", complaintFormData.issueTypeId);
    formData.append("Latitude", complaintFormData.latitude);
    formData.append("Longitude", complaintFormData.longitude);
    if (uploadedImage) formData.append("Image", uploadedImage);

    createComplaint(formData);
    setUploadedImage(null);
    setComplaintFormData({
      fullName: "",
      phoneNumber: "",
      issueTypeId: "",
      description: "",
      latitude: "",
      longitude: "",
    });
  };

  useEffect(() => {
    if (data && data.length > 0 && complaintFormData.issueTypeId === "") {
      setComplaintFormData((prev) => ({
        ...prev,
        issueTypeId: data[0].id,
      }));
    }
  }, [data]);

  return (
    <div className={style.report_page_con}>
      <div className={style.report_page}>
        <h1>{t("public.reportForm.title")}</h1>
        <div className={style.report_form}>
          <form onSubmit={handleSubmit}>
            <div className={style.name_phoNb_inpts}>
              <div>
                <label htmlFor="name">
                  {t("public.reportForm.fullName.label")}
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={t("public.reportForm.fullName.placeholder")}
                  ref={fullNameRef}
                  onChange={fullNameHandleChange}
                  value={complaintFormData.fullName}
                  maxLength={100}
                />
                {validateInputs.nameError && (
                  <p className={style.error}>{validateInputs.nameError}</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNb">
                  {t("public.reportForm.mobileNumber.label")}
                </label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder={t("public.reportForm.mobileNumber.placeholder")}
                  ref={phoneNumberRef}
                  onChange={phoneNbHandleChange}
                  value={complaintFormData.phoneNumber}
                  maxLength={15}
                />
                {validateInputs.phoneError && (
                  <p className={style.error}>{validateInputs.phoneError}</p>
                )}
              </div>
            </div>

            <label htmlFor="issueType">
              {t("public.reportForm.issueType.label")}
            </label>
            <select
              id="issueType"
              onChange={(event) => {
                setComplaintFormData((prev) => ({
                  ...prev,
                  issueTypeId: event.target.value,
                }));
              }}
            >
              {data?.map((issue) => {
                return (
                  <option key={issue.id} value={issue.id}>
                    {issue.issueName}
                  </option>
                );
              })}
            </select>

            <label htmlFor="description">
              {t("public.reportForm.description.label")}
            </label>
            <textarea
              id="description"
              value={complaintFormData.description}
              onChange={(event) =>
                setComplaintFormData((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              maxLength={1000}
            />

            {/* ✅ Replaced old upload logic with UploadPhoto */}
            <div className={style.uploadImg_con}>
              <UploadPhoto
                setUploadImage={setUploadedImage}
                uploadImage={uploadedImage}
                setDeleteDialog={setDeleteUploadedImage}
              />
            </div>

            <div ref={locationRef}>
              <LocationSelector onSave={handleSaveLocation} />
            </div>

            <button type="submit" disabled={isPending}>
              {isPending
                ? t("public.reportForm.submitting")
                : t("public.reportForm.submit")}
            </button>
          </form>
        </div>
      </div>

      {deleteUploadedImage && (
        <DeleteDialog
          setDeleteUploadedImage={setDeleteUploadedImage}
          setUploadedImage={setUploadedImage}
        />
      )}
      {isOpen && <AlertDialog />}
    </div>
  );
};

export default Report;
