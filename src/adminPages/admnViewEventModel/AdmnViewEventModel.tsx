import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DateConverter from "../../components/date/Date";
import { getEvent } from "../../services/Events";
import style from "./adminViewEventModel.module.css";
import LazyImage from "../../LazyLoader/LazyImg";
const AdmnViewEventModel = () => {
  const { eventSlug: slug } = useParams<{ eventSlug: string }>();
  const { t } = useTranslation();
  const { data: event } = useQuery({
    queryKey: ["events", slug],
    queryFn: () => getEvent(slug!),
    enabled: !!slug,
  });
  const navigate = useNavigate();
  return (
    <div className={style.admin_event_page}>
      <div className={style.admin_event}>
        <h5>
          <a
            onClick={() => {
              navigate("../events", { replace: true });
            }}
          >
            Events/
          </a>
          {event?.slug}
        </h5>
        <h2>{event?.title}</h2>
        <h3>
          {t("admin.viewEvent.location")} <h4>{event?.location}</h4>
        </h3>
        <div className={style.admin_event_date}>
          <span>
            {t("admin.viewEvent.date")}
            {event?.date ? (
              <span>
                {new Date(event.date ?? "").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            ) : (
              <span>Unknown date</span>
            )}
          </span>
          <strong>| </strong>
          <span>{t("admin.viewEvent.source")} </span>
        </div>
        <LazyImage
          className={style.adminViewEventModel_img}
          src={event?.imageUrl ?? ""}
          alt=""
        />
        <p>{event?.description}</p>
      </div>
    </div>
  );
};

export default AdmnViewEventModel;
