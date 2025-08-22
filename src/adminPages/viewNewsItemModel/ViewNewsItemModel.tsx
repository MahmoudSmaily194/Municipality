import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DateConverter from "../../components/date/Date";
import LazyImage from "../../LazyLoader/LazyImg";
import { getNewsItemByAdmin } from "../../services/News";
import style from "./viewNewsItemModel.module.css";

const ViewNewsItemModel = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: newsItem } = useQuery({
    queryKey: ["newsItem", slug],
    queryFn: () => getNewsItemByAdmin(slug!),
    enabled: !!slug, // ✅ تأكد أنه لن يعمل إلا لو slug موجود
  });

  return (
    <div className={style.viewNewsItemModel_page}>
      <div className={style.viewNewsItemModel}>
        <LazyImage
          className={style.newsItem_img}
          src={newsItem?.imageUrl ?? ""}
          alt={newsItem?.imageUrl ?? ""}
        />
        <div>
          <h2>{t("admin.viewNewsItem.title")}</h2>
          <h3>{newsItem?.title}</h3>
        </div>
        <div>
          <h2>{t("admin.viewNewsItem.description")}</h2>
          <p>{newsItem?.description}</p>
        </div>
        <div>
          <h2>{t("admin.viewNewsItem.visibility")}</h2>
          <span>{newsItem?.visibility}</span>
        </div>
        <div>
          <h2>{t("admin.viewNewsItem.createdAt")}</h2>
          {newsItem?.updatedAt ? (
            <p>
              <DateConverter date={new Date(newsItem.updatedAt ?? "")} />
            </p>
          ) : (
            <p>Unknown date</p>
          )}
        </div>
        <button
          onClick={() => {
            navigate("../news");
          }}
        >
          {t("admin.viewNewsItem.button")}
        </button>
      </div>
    </div>
  );
};

export default ViewNewsItemModel;
