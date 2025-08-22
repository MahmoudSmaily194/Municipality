import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import DateConverter from "../../../components/date/Date";
import { getNewsItem } from "../../../services/News";
import style from "./newsItem.module.css";
const NewsItem = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: newsItem } = useQuery({
    queryKey: ["newsItem", slug],
    queryFn: () => getNewsItem(slug!),
    enabled: !!slug, // ✅ تأكد أنه لن يعمل إلا لو slug موجود
  });
  const navigate = useNavigate();
  return (
    <div className={style.newsItem_page}>
      <div className={style.newsItem}>
        <h5>
          <a
            onClick={() => {
              navigate("/news", { replace: true });
            }}
          >
            News
          </a>
          / {newsItem?.slug}
        </h5>
        <h2>{newsItem?.title}</h2>
        <div className={style.date}>
          <span>
            {t("admin.viewEvent.publishedOn")}
            {newsItem?.updatedAt ? (
              <span>
                <DateConverter date={new Date(newsItem.updatedAt ?? "")} />
              </span>
            ) : (
              <span>Unknown date</span>
            )}
          </span>
          <strong>| </strong>
          <span>{t("admin.viewEvent.source")} </span>
        </div>
        <img src={`${ newsItem?.imageUrl}`} alt="" />
        <p>{newsItem?.description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
