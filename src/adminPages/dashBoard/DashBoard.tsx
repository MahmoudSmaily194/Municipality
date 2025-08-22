import { useTranslation } from "react-i18next";
import style from "./dashboard.module.css";
import { PiMegaphoneLight } from "react-icons/pi";
import {
  useComplaints,
  useGetUnseenComplaints,
  useUpdateComplaintSeen,
} from "../../hooks/useComplaints";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllNews } from "../../hooks/useNews";
import { useEvents } from "../../hooks/useEvents";
import { useInfiniteServices } from "../../hooks/useServices";
const DashBoard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const filters = {
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetUnseenComplaints(filters);
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

  const { mutate: markAsSeen } = useUpdateComplaintSeen();

  const handleMarkSeen = (id: string) => {
    markAsSeen(id);
  };
  const { data: News } = useGetAllNews(filters);
  const { data: events } = useEvents(filters);
  const { data: services } = useInfiniteServices(filters);
  const { data: complaints } = useComplaints(filters);

  return (
    <div className={style.dashboard_page_con}>
      <div className={style.dashboard_page}>
        <h1>{t("admin.dashboard.title")}</h1>
        <h2>{t("admin.dashboard.overview")}</h2>
        <div className={style.dashboard_notification_boxes_con}>
          <div>
            <h3>{t("admin.dashboard.metrics.news.label")}</h3>
            <h2>{News?.pages[0]?.totalCount ?? 0}</h2>
          </div>
          <div>
            <h3>{t("admin.dashboard.metrics.events.label")}</h3>
            <h2>{events?.pages[0].totalCount ?? 0}</h2>
          </div>
          <div>
            <h3>{t("admin.dashboard.metrics.services.label")} </h3>
            <h2>{services?.pages[0].totalCount ?? 0}</h2>
          </div>
          <div>
            <h3>{t("admin.dashboard.metrics.complaints.label")} </h3>
            <h2>{complaints?.pages[0].totalCount ?? 0}</h2>
          </div>
        </div>
        <h2>{t("admin.dashboard.recentActivity")}</h2>

        <div className={style.dashboard_recent_ac_cont}>
          {data?.pages
            .flatMap((page) => page.items)
            .map((complaint) => {
              return (
                <div
                  key={complaint.id}
                  onClick={() => {
                    navigate(`complaints/${complaint.id}`);
                    handleMarkSeen(complaint.id);
                  }}
                  className={style.dashboard_recent_ac}
                >
                  <div className={style.icon}>
                    <PiMegaphoneLight />
                  </div>
                  <div className={style.textCon}>
                    <h5>{complaint.fullName}</h5>
                    <p>
                      {t("admin.dashboard.issueType")} {complaint.issueName}
                    </p>
                  </div>
                </div>
              );
            })}

          <div ref={loaderRef} style={{ height: "20px" }}></div>
          {isFetchingNextPage && <p>Loading more recent activity...</p>}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
