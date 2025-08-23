import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DateConverter from "../../components/date/Date";
import LazyImage from "../../LazyLoader/LazyImg";
import { getNewsItemByAdmin, updateNewsItem } from "../../services/News";
import style from "./viewNewsItemModel.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewNewsItemModel = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch single news item
  const { data: newsItem } = useQuery({
    queryKey: ["news", slug],
    queryFn: () => getNewsItemByAdmin(slug!),
    enabled: !!slug,
  });

  // Local state for visibility
  const [visibility, setVisibility] = useState<number>();

  // Mutation for updating news item
  const { mutate: updateNewsMutate, isPending } = useMutation({
    mutationFn: ({ id, visibility }: { id: string; visibility: number }) =>
      updateNewsItem(id, visibility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", slug] });
      toast.success(t("updated"));
      navigate("../news");
    },
    onError: () => {
      toast.error(t("failed"));
    },
  });
  useEffect(() => {
    setVisibility(newsItem?.visibility?.toString() == "0" ? 0 : 1);
  }, [newsItem]);
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
          <div className={style.newsItem_visiility_update_model}>
            <select
              value={visibility}
              onChange={(e) => setVisibility(Number(e.target.value))}
            >
              <option value={0}>Private</option>
              <option value={1}>Public</option>
            </select>
            <button
              disabled={isPending}
              onClick={() =>
                newsItem?.id &&
                updateNewsMutate({
                  id: newsItem.id,
                  visibility: Number(visibility),
                })
              }
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
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
