import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DeleteRowDialog from "../../components/deleteRowDialog/DeleteRowDialog";
import { useDeleteEvent, useEvents } from "../../hooks/useEvents";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";
import style from "./eventsControlPage.module.css";

const EventsControlPage = () => {
  const filters = {
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEvents(filters);
  const { openDialog, isOpen } = useDeleteDialogStore();
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleDeleteClick = (eventId: string) => {
    openDialog(eventId, () => {
      deleteEvent(eventId);
    });
  };

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
    <div className={style.events_control_page_con}>
      <div className={style.events_control_page}>
        <div className={style.events_control_page_header}>
          <h1>{t("admin.events.management.title")}</h1>
          <button onClick={() => navigate("../eventmodel")}>
            {t("admin.events.management.add.button")}
          </button>
        </div>

        <p>{t("admin.events.management.add.description")}</p>

        <h3>{t("admin.events.management.existing.title")}</h3>

        <div className={style.events_control_table_con}>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    {t("admin.events.management.existing.table.headers.title")}
                  </th>
                  <th>
                    {t("admin.events.management.existing.table.headers.date")}
                  </th>
                  <th>
                    {t(
                      "admin.events.management.existing.table.headers.location"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin.events.management.existing.table.headers.actions"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic Data from React Query */}
                {data?.pages
                  .flatMap((page) => page.items)
                  .map((event) => (
                    <tr key={event.id}>
                      <td style={{ color: "black" }}>
                        {event.title.split(" ").slice(0, 5).join(" ")}
                      </td>
                      <td>
                        {new Date(event.date ?? "").toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td>{event.location}</td>
                      <td>
                        <div>
                          <p
                            onClick={() => navigate(`${event.slug}`)}
                            className={style.events_edit_btn}
                          >
                            {t(
                              "admin.events.management.existing.table.actions.view"
                            )}
                          </p>
                          <p> |</p>
                          <p
                            className={style.events_delete_btn}
                            onClick={() => handleDeleteClick(event.id ?? "")}
                          >
                            {t(
                              "admin.events.management.existing.table.actions.delete"
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Loader Trigger for Infinite Scroll */}
            <div ref={loaderRef} style={{ height: "20px" }}></div>
          </div>
        </div>
      </div>

      {isOpen && <DeleteRowDialog />}
    </div>
  );
};

export default EventsControlPage;
