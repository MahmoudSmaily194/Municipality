import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useFetchPublicComplaints,
  usegetComplaintIssueType,
} from "../../hooks/useComplaints";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import style from "./compliants.module.css";
import LazyImage from "../../LazyLoader/LazyImg";
const PublicComplaints = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: issueTypes } = usegetComplaintIssueType();
  const [filters, setFilterInp] = useState<FetchPaginatedParamsType>({
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
    IssueTypeId: "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPublicComplaints(filters);
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

  const [viewMoreMap, setViewMoreMap] = useState<{ [id: string]: boolean }>({});

  const toggleViewMore = (id: string) => {
    setViewMoreMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className={style.pub_compls_page}>
      <div className={style.pub_compls}>
        <div className={style.public_complaints_header}>
          <h2>{t("public.complaints.title")} </h2>
          <button
            onClick={() => {
              navigate("/report");
            }}
          >
            {t("public.complaints.button")}
            <MdAddCircle className={style.addCompl_icon} />
          </button>
        </div>
        <div className={style.search_inp}>
          <input
            type="text"
            placeholder={t("public.news.search")}
            maxLength={150}
            onChange={(e) => {
              setFilterInp((prev) => ({
                ...prev,
                SearchTerm: e.target.value,
              }));
            }}
          />
          <IoIosSearch className={style.search_icon} />
        </div>
        <div className={style.filter_compl_selects}>
          <select
            onChange={(e) => {
              setFilterInp((prev) => ({
                ...prev,
                IssueTypeId: e.target.value,
              }));
            }}
          >
            <option value="">{t("public.complaints.issueType")}</option>
            {issueTypes?.map((issue) => {
              return (
                <option key={issue.id} value={issue.id}>
                  {issue.issueName}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              setFilterInp((prev) => ({
                ...prev,
                ComplaintStatus: e.target.value,
              }));
            }}
          >
            <option value="">{t("public.complaints.status.title")} </option>
            <option value="Pending">
              {t("public.complaints.status.pending")}{" "}
            </option>
            <option value="InProgress">
              {t("public.complaints.status.inProgress")}
            </option>
            <option value="Resolved">
              {t("public.complaints.status.resolved")}{" "}
            </option>
            <option value="Rejected">
              {t("public.complaints.status.rejected")}{" "}
            </option>
          </select>
          <select>
            <option value="">{t("public.complaints.date")}</option>
            <option value="">Date</option>
            <option value="">Date</option>
          </select>
        </div>

        <div className={style.copmlaints}>
          {data?.pages
            .flatMap((page) => page.items)
            .map((complaint, index) => {
              const isExpanded = viewMoreMap[complaint.id] || false;
              const words = complaint.description.split(" ");
              const shouldTruncate = words.length > 20;
              return (
                <div key={index} className={style.pub_complaint}>
                  <div className={style.complaint_text_content}>
                    <p>
                      {t("public.complaints.issueType") + ":"}

                      {complaint.issueName}
                    </p>
                    <h3>{complaint.fullName}</h3>
                    <p>
                      {shouldTruncate && !isExpanded
                        ? words.slice(0, 20).join(" ") + "..."
                        : complaint.description}
                      {shouldTruncate && (
                        <span
                          onClick={() => toggleViewMore(complaint.id)}
                          style={{
                            color: "#1A80E5",
                            fontSize: 16,
                            cursor: "pointer",
                          }}
                        >
                          &nbsp;
                          {isExpanded
                            ? t("public.events.viewLess")
                            : t("public.events.viewMore")}
                        </span>
                      )}
                    </p>
                    <div className={style.comlplaint_btns}>
                      <button> {t("public.complaints.viewDetails")}</button>
                      <button>{complaint.status}</button>
                    </div>
                  </div>
                  <LazyImage
                  className={style.img}
                    src={`${complaint.imageUrl}`}
                    alt="complaint image"
                  />
                </div>
              );
            })}
          <div ref={loaderRef} style={{ height: "20px" }}></div>

          {isFetchingNextPage && <p>Loading more Complaints...</p>}
        </div>
      </div>
    </div>
  );
};

export default PublicComplaints;
