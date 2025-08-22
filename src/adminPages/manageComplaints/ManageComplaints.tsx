import { useEffect, useRef } from "react";
import { useComplaints } from "../../hooks/useComplaints";
import style from "./manageComplaints.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DateConverter from "../../components/date/Date";

const ManageComplaints = () => {
  const { t } = useTranslation();
  const filters = {
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  };
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useComplaints(filters);
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

  return (
    <div className={style.ManageComplaints_page_con}>
      <div className={style.ManageComplaints_page}>
        <div className={style.ManageComplaints_header}>
          <h1>{t("admin.complaints.management.title")}</h1>
          <button
            onClick={() => {
              navigate("../issuemodel");
            }}
          >
            {t("admin.complaints.management.button")}
          </button>
        </div>
        <p>{t("admin.complaints.management.description")}</p>
        <h3>{t("admin.complaints.management.existing.title")}</h3>

        <div className={style.ManageComplaints_table_con}>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    {t(
                      "admin.complaints.management.existing.table.headers.name"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin.complaints.management.existing.table.headers.date"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin.complaints.management.existing.table.headers.type"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin.complaints.management.existing.table.headers.status.title"
                    )}
                  </th>{" "}
                  {/* This header should probably be "Status" label instead, fix below */}
                  <th>
                    {t(
                      "admin.complaints.management.existing.table.headers.actions"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.pages
                  .flatMap((page) => page.items)
                  .map((complaint) => {
                    return (
                      <tr key={complaint.id}>
                        <td style={{ color: "black" }}>{complaint.fullName}</td>
                        <td>
                          <DateConverter
                            date={new Date(complaint?.updatedAt ?? "")}
                          />
                        </td>
                        <td>{complaint.issueName}</td>
                        <td>
                          <div>
                            <p>{complaint.status}</p>
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              navigate(`./${complaint.id}`);
                            }}
                            className={style.ManageCompliants_div_viewBtn}
                          >
                            <p>
                              {t(
                                "admin.complaints.management.existing.table.actions.view"
                              )}
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
    </div>
  );
};

export default ManageComplaints;
