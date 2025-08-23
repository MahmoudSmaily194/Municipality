import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../LazyLoader/LazyImg";
import { useEvents } from "../../hooks/useEvents";
import style from "./events.module.css";

const Events = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const filters = {
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEvents(filters);

  const [viewMoreMap, setViewMoreMap] = useState<{ [id: string]: boolean }>({});

  const toggleViewMore = (id: string) => {
    setViewMoreMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Intersection Observer to trigger infinite scroll
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
    <div className={style.events_page}>
      <div className={style.events_con}>
        <h2> {t("public.events.title")}</h2>
        <p>{t("public.events.body")}</p>

        <div className={style.events}>
          {data?.pages
            .flatMap((page) => page.items)
            .map((event) => {
              const isExpanded = viewMoreMap[event.id] || false;
              const words = event.description.split(" ");
              const shouldTruncate = words.length > 20;

              return (
                <div key={event.id} className={style.event}>
                  <div className={style.event_text_con}>
                    <h4>{event.title}</h4>
                    <p>
                      {shouldTruncate && !isExpanded
                        ? words.slice(0, 20).join(" ") + "..."
                        : event.description}
                      {shouldTruncate && (
                        <span
                          onClick={() => toggleViewMore(event.id)}
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
                    <p className={style.date}>
                      <strong>{t("public.events.date")}</strong>&nbsp;&nbsp;{" "}
                      {new Date(event.date ?? "").toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p style={{ color: "black" }}>
                      <strong>{t("public.events.location")}</strong>&nbsp;&nbsp;
                      {event.location}
                    </p>
                    <button onClick={() => navigate(`/events/${event.slug}`)}>
                      {t("public.events.viewDetails")}
                    </button>
                  </div>
                  <div className={style.event_img_con}>
                    <LazyImage
                      className={style.event_image}
                      src={event.imageUrl}
                      alt={event.imageUrl}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={loaderRef} style={{ height: "20px" }}></div>
      </div>
    </div>
  );
};

export default Events;
