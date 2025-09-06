import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import {
  useCreateService,
  useServiceCategories,
} from "../../hooks/useServices";
import style from "./serviceModel.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type ServiceStatus = 0 | 1; // 0 = Active, 1 = Inactive

const ServiceModel = () => {
  const { t } = useTranslation();
  const { data: categ } = useServiceCategories();

  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<ServiceStatus>(0); // default active

  const { mutate: createService, isPending } = useCreateService();

  // Set default category when categories load
  useEffect(() => {
    if (categ?.length && !categoryId) {
      setCategoryId(categ[0].id);
    }
  }, [categ, categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      toast.error(t("toast.titleRequired", "Title is required"));
      return;
    }
    if (!description.trim()) {
      toast.error(t("toast.descriptionRequired", "Description is required"));
      return;
    }
    if (!categoryId) {
      toast.error(t("toast.categoryRequired", "Please select a category"));
      return;
    }
    if (!uploadImage) {
      toast.error(t("toast.uploadImageError"));
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("CategoryId", categoryId);
    formData.append("Status", status.toString());
    formData.append("Image", uploadImage);

    createService(formData, {
      onSuccess: () => {
        toast.success(t("toast.addService"));
        // Reset only after success
        setTitle("");
        setDescription("");
        setCategoryId(categ?.[0]?.id ?? "");
        setStatus(0); // back to active
        setUploadImage(null);
      },
      onError: () => {
        toast.error(
          t("toast.createServiceError", "Failed to create the service")
        );
      },
    });
  };

  return (
    <>
      <div className={style.serviceModel_page}>
        <div className={style.serviceModel}>
          <div className={style.serviceModel_header}>
            <h1>{t("admin.services.add.title")}</h1>
          </div>
          <div className={style.serviceModel_form_con}>
            <form onSubmit={handleSubmit}>
              <div className={style.serviceModel_inpts_con}>
                <label htmlFor="title">
                  {t("admin.services.add.fields.name.label")}
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder={t("admin.services.add.fields.name.placeholder")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={150}
                />

                <label htmlFor="descri">
                  {t("admin.services.add.fields.description.label")}
                </label>
                <textarea
                  id="descri"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                />

                <FormControl>
                  <InputLabel id="demo-select-small-label">
                    {t("admin.services.add.fields.category.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="categ"
                    label={t("admin.services.add.fields.category.label")}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categ?.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className={style.serviceModel_status_btns}>
                  <button
                    type="button"
                    className={status === 0 ? style.active : ""}
                    onClick={() => setStatus(0)}
                  >
                    {t("admin.services.add.fields.status.active")}
                  </button>
                  <button
                    type="button"
                    className={status === 1 ? style.active : ""}
                    onClick={() => setStatus(1)}
                  >
                    {t("admin.services.add.fields.status.inactive")}
                  </button>
                </div>

                <div className={style.serviceModel_upload_photo}>
                  <UploadPhoto
                    setUploadImage={setUploadImage}
                    uploadImage={uploadImage}
                    setDeleteDialog={setDeleteDialog}
                  />
                </div>
              </div>
              <div className={style.serviceModel_form_btns}>
                <button
                  className={style.serviceModel_addService_btn}
                  type="submit"
                  disabled={isPending}
                >
                  {isPending
                    ? t("admin.services.add.actions.sending", "Adding...")
                    : t("admin.services.add.actions.submit")}
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

export default ServiceModel;
