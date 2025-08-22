import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getService, updateService } from "../../services/Services";
import style from "../serviceModel/serviceModel.module.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useServiceCategories } from "../../hooks/useServices";

type ServiceStatus = 0 | 1;

const UpdateServiceModel = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: service } = useQuery({
    queryKey: ["services", id],
    queryFn: () => getService(id!),
    enabled: !!id,
    retry: false,
  });

  const { data: categs } = useServiceCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<ServiceStatus>(0);
  const [uploadImage, setUploadImage] = useState<File | string | null>(null);

  useEffect(() => {
    if (service) {
      setTitle(service.title ?? "");
      setDescription(service.description ?? "");
      setCategoryId(service.categoryId ?? "");
      setStatus(service.status == 0 ? 0 : 1);
      setUploadImage(service.imageUrl ?? null);
    }
  }, [service]);

  const { mutate: updateServiceMutate, isPending } = useMutation({
    mutationFn: updateService,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
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

    // ✅ Prepare data
    let payload: any;
    if (uploadImage instanceof File) {
      // If new image uploaded → use FormData
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("CategoryId", categoryId);
      formData.append("Status", status.toString());
      formData.append("Image", uploadImage);
      payload = formData;
    } else {
      // If image unchanged → send plain object
      payload = {
        imageUrl: typeof uploadImage === "string" ? uploadImage : undefined,
        title,
        description,
        status,
        categoryId,
      };
    }

    updateServiceMutate(
      { id: id!, updatedData: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["services", id] });
          toast.success(t("toast.updateService"));
          navigate("../services");
        },
        onError: () => {
          toast.error(
            t("toast.updateServiceError", "Failed to update service")
          );
        },
      }
    );
  };

  return (
    <div className={style.serviceModel_page}>
      <div className={style.serviceModel}>
        <div className={style.serviceModel_header}>
          <h1>{t("admin.updateService.title")}</h1>
        </div>
        <div className={style.serviceModel_form_con}>
          <form onSubmit={handleSubmit}>
            <div className={style.serviceModel_inpts_con}>
              <label htmlFor="title">
                {t("admin.updateService.serviceName")}
              </label>
              <input
                id="title"
                type="text"
                placeholder={t("admin.updateService.placeholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
              />

              <label htmlFor="descri">
                {t("admin.updateService.description")}
              </label>
              <textarea
                id="descri"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
              />

              <label htmlFor="categ">{t("admin.updateService.category")}</label>
              <select
                id="categ"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categs?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className={style.serviceModel_status_btns}>
                <button
                  type="button"
                  className={status === 0 ? style.active : ""}
                  onClick={() => setStatus(0)}
                >
                  {t("admin.updateService.active")}
                </button>
                <button
                  type="button"
                  className={status === 1 ? style.active : ""}
                  onClick={() => setStatus(1)}
                >
                  {t("admin.updateService.inActive")}
                </button>
              </div>

              {/* TODO: you can add UploadPhoto component here if you want 
                  the same UX as in ServiceModel for replacing images */}
            </div>

            <div className={style.serviceModel_form_btns}>
              <button
                className={style.serviceModel_addService_btn}
                type="submit"
                disabled={isPending}
              >
                {isPending
                  ? t("admin.updateService.updating")
                  : t("admin.updateService.update")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModel;
