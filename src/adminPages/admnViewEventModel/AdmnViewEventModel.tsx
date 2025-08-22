import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DateConverter from "../../components/date/Date";
import { getEvent } from "../../services/Events";
import style from "./adminViewEventModel.module.css";
const AdmnViewEventModel = () => {
  const { eventSlug: slug } = useParams<{ eventSlug: string }>();
  const { t } = useTranslation();
  const { data: event } = useQuery({
    queryKey: ["newsItem", slug],
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
              navigate("/events", { replace: true });
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
                <DateConverter date={new Date(event?.date ?? "")} />
              </span>
            ) : (
              <span>Unknown date</span>
            )}
          </span>
          <strong>| </strong>
          <span>{t("admin.viewEvent.source")} </span>
        </div>
        <img src={event?.imageUrl} alt="" />
        <p>{event?.description}</p>
      </div>
    </div>
  );
};

export default AdmnViewEventModel;
