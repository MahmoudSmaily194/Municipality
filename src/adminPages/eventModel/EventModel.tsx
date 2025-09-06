import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import { useCreateEvent } from "../../hooks/useEvents";
import style from "./eventModel.module.css";
const EventModel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<string>("");

  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadImage) {
      toast.error(t("toast.uploadImageError"));
      return;
    }
    const formData = new FormData();
    const localDate = new Date(date);
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
        queryClient.invalidateQueries({ queryKey: ["events"] });
        // Reset form
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setUploadImage(null);
      },
    });
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
                  <div className={style.event_title_inp_div}>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        sx={{ width: "100%",direction:"ltr" }}
                        label={t("admin.events.add.fields.datetime.label")}
                        value={date ? dayjs(date) : null}
                        onChange={(newValue) =>
                          setDate(newValue ? newValue.toISOString() : "")
                        }
                        views={["year", "month", "day", "hours", "minutes"]} // 👈 restricts to Y/M/D H:M
                        format="DD/MM/YYYY HH:mm" // 👈 controls display format
                      />
                    </LocalizationProvider>
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
                  maxLength={200}
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
