import { useState } from "react";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import style from "./eventModel.module.css";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import { useCreateEvent } from "../../hooks/useEvents";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// عدّل المسار حسب الحاجة

const EventModel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadImage) {
      toast.error(t("toast.uploadImageError"));
      return;
    }
    const formData = new FormData();
    const localDate = new Date(date); // "2025-08-22"
    formData.append("Date", localDate.toISOString());
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Location", location);
    if (uploadImage) {
      formData.append("Image", uploadImage);
    }

    createEvent(formData, {
      onSuccess: () => {
        toast.success(t("toast.publishEvent"));
      },
    });
    // Optional: Reset form after submit
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setUploadImage(null);
  };

  return (
    <>
      <div className={style.eventModel_page}>
        <div className={style.eventModel}>
          <div className={style.eventModel_header}>
            <h1>{t("admin.events.add.title")}</h1>
          </div>
          <div className={style.eventModel_form_con}>
            <form onSubmit={handleSubmit}>
              <div className={style.eventModel_inpts_con}>
                <div className={style.eventModel_form_title_date_inpts}>
                  <div>
                    <label htmlFor="title">
                      {t("admin.events.add.fields.title.label")}
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder={t(
                        "admin.events.add.fields.title.placeholder"
                      )}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={150}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date">
                      {t("admin.events.add.fields.datetime.label")}
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        paddingRight: "0.4rem",
                        width: "calc(100% - 1.4rem)",
                      }}
                      maxLength={15}
                      required
                    />
                  </div>
                </div>
                <label htmlFor="descri">
                  {t("admin.events.add.fields.description.label")}
                </label>
                <textarea
                  id="descri"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  required
                />
                <label htmlFor="loca">
                  {t("admin.events.add.fields.location.label")}
                </label>
                <input
                  id="loca"
                  type="text"
                  placeholder={t(
                    "admin.events.add.fields.location.placeholder"
                  )}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  max={200}
                />
                <div className={style.eventModel_upload_photo}>
                  <UploadPhoto
                    setUploadImage={setUploadImage}
                    uploadImage={uploadImage}
                    setDeleteDialog={setDeleteDialog}
                  />
                </div>
              </div>
              <div className={style.eventModel_form_btns}>
                <button
                  className={style.eventModel_addEvent_btn}
                  type="submit"
                  disabled={isPending}
                >
                  {isPending
                    ? "Adding..."
                    : t("admin.events.add.actions.submit")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("../events", { replace: true });
                  }}
                >
                  {t("admin.events.add.actions.close")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {deleteDialog && (
        <DeleteDialog
          setDeleteUploadedImage={setDeleteDialog}
          setUploadedImage={setUploadImage}
        />
      )}
    </>
  );
};

export default EventModel;
