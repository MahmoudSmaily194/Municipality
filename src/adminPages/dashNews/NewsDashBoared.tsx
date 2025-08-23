import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import DeleteRowDialog from "../../components/deleteRowDialog/DeleteRowDialog";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import {
  useCreateNewsItem,
  useDeleteNewsItem,
  useGetAllNews,
} from "../../hooks/useNews";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import DateConverter from "../../components/date/Date";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import style from "./news_dashboard.module.css";

const NewsDashBoared = () => {
  const { t } = useTranslation();
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("1");
  const { openDialog, isOpen } = useDeleteDialogStore();
  const { mutate: deleteNews } = useDeleteNewsItem();

  const [filters] = useState<FetchPaginatedParamsType>({
    PageNumber: 1,
    PageSize: 9,
    SortBy: "",
    SortDirection: "asc",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  });

  const {
    data: news,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllNews(filters);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDeleteClick = (newsId: string) => {
    openDialog(newsId, () => {
      deleteNews(newsId);
    });
  };

  const { mutate, error, isError, isPending } = useCreateNewsItem();

  const handlePublish = () => {
    if (!uploadImage) {
      toast.error(t("toast.uploadImageError"));
      return;
    }
    if (!title.trim()) {
      toast.error(t("toast.enterTitleError"));
      return;
    }
    if (!description.trim()) {
      toast.error(t("toast.enterDescriptionError"));
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visibility", visibility);
    formData.append("image", uploadImage);

    mutate(formData, {
      onSuccess: () => {
        toast.success(t("toast.publishNews"));
        setTitle("");
        setDescription("");
        setVisibility("1");
        setUploadImage(null);
      },
      onError: (err: any) => {
        toast.error(
          "Failed to publish news: " + (err.message || "Unknown error")
        );
      },
    });
  };

  return (
    <>
      <div className={style.news_dashboard_page_con}>
        <div className={style.news_dashboard_page}>
          <h1>{t("admin.news.title")}</h1>
          {/* هنا ممكن تضيف جدول عرض الأخبار */}
          <div className={style.news_table_con}>
            <div className={style.news_table_wrapper}>
              <table className={style.news_table}>
                <thead>
                  <tr>
                    <th>{t("admin.news.table.headers.title")}</th>
                    <th>{t("admin.news.table.headers.date")}</th>
                    <th>{t("admin.news.table.headers.visibility")}</th>
                    <th>{t("admin.news.table.headers.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {news?.pages
                    .flatMap((page) => page.items)
                    .map((newsItem) => {
                      return (
                        <tr key={newsItem.id}>
                          <td style={{ color: "black" }}>
                            {newsItem.title?.split(" ").slice(0, 5).join(" ")}
                            ...
                          </td>
                          <td>
                            <DateConverter
                              date={new Date(newsItem.updatedAt ?? "")}
                            />
                          </td>
                          <td>
                            <button>
                              {newsItem.visibility == 0
                                ? t("admin.news.table.visibility.private")
                                : t("admin.news.table.visibility.public")}
                            </button>
                          </td>
                          <td>
                            <div>
                              <p
                                onClick={() => {
                                  navigate(`./${newsItem.slug}`);
                                }}
                                className={style.news_td_div_p}
                              >
                                {t("admin.news.table.actions.view")}
                              </p>
                              <p>|</p>
                              <p
                                onClick={() =>
                                  handleDeleteClick(newsItem.id ?? "")
                                }
                                className={style.news_td_delete_div_p}
                              >
                                {t("admin.news.table.actions.delete")}
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div ref={loaderRef} style={{ height: "20px" }}></div>
            </div>
          </div>
        </div>
        <div className={style.AddNews_Con}>
          <div className={style.AddNews}>
            <h1>{t("admin.news.add.title")} </h1>
            <input
              type="text"
              placeholder={t("admin.news.add.fields.title.label")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={150}
            />
            <textarea
              placeholder={t("admin.news.add.fields.description.label")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={1000}
            />
            <div className={style.visibility_con}>
              <p>{t("admin.news.add.fields.visibility.label")}</p>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                required
              >
                <option value="0">
                  {t("admin.news.add.fields.visibility.options.private")}
                </option>
                <option value="1">
                  {t("admin.news.add.fields.visibility.options.public")}
                </option>
              </select>
            </div>
            <div className={style.news_dashboard_uploadPhoto_con}>
              <UploadPhoto
                setUploadImage={setUploadImage}
                uploadImage={uploadImage}
                setDeleteDialog={setDeleteDialog}
              />
            </div>
            <button
              className={style.publish_news}
              onClick={handlePublish}
              disabled={isPending}
            >
              {isPending
                ? t("admin.news.add.actions.publishing")
                : t("admin.news.add.actions.publish")}
            </button>
            {isError && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {error?.message || "Error occurred"}
              </p>
            )}
          </div>
        </div>
      </div>

      {deleteDialog && (
        <DeleteDialog
          setDeleteUploadedImage={setDeleteDialog}
          setUploadedImage={setUploadImage}
        />
      )}
      {isOpen && <DeleteRowDialog />}
    </>
  );
};

export default NewsDashBoared;
