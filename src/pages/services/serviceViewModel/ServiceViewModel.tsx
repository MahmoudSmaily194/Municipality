import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import LazyImage from "../../../LazyLoader/LazyImg";
import { getService } from "../../../services/Services";
import style from "./serviceViewModel.module.css";
const ServiceViewModel = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: service } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id!),
    enabled: !!id,
    retry: false,
  });
  console.log(service);
  return (
    <div className={style.serviceViewModel_page_con}>
      <div className={style.serviceViewModel_page}>
        <h3
          onClick={() => {
            navigate("/services", { replace: true });
          }}
        >
          {t("public.viewService.back")}
        </h3>
        <h1>{service?.title}</h1>
        <p>
          {t("public.viewService.category")} {service?.categoryName}
        </p>
        <LazyImage
          className={style.serviceViewModel_img}
          src={ service?.imageUrl ?? ""}
          alt="img"
        />
        <p>{service?.description}</p>
        <div className={style.active_btn_div}>
          <strong>
            {service?.status == 0
              ? t("public.viewService.active")
              : t("public.viewService.notActive")}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ServiceViewModel;
