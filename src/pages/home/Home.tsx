import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import fullImage from "../../assets/homeBackGround.png";
import DateConverter from "../../components/date/Date";
import { accessItems } from "../../data/accessItems";
import { useEvents } from "../../hooks/useEvents";
import { useVissibleNews } from "../../hooks/useNews";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import ContactForm from "./contactForm/ContactForm";
import style from "./home.module.css";
import ImageCarousel from "./imageCarousel/ImageCarousel";
const Home = () => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = fullImage; // This is a resolved URL path
    img.onload = () => {
      setIsLoaded(true);
    };
  }, []);
  const [filters] = useState<FetchPaginatedParamsType>({
    PageNumber: 1,
    PageSize: 5,
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  });
  const { data: news } = useVissibleNews(filters);
  const { data: events } = useEvents(filters);
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <section>
        <div className={`${style.home_intro} ${isLoaded ? style.loaded : ""}`}>
          <div className={style.home_intro_cont}>
            <h1 lang="ar">{t("public.home.title")}</h1>
            <p>{t("public.home.body")}</p>
            <button
              onClick={() => {
                navigate("/services");
              }}
            >
              {t("public.home.button")}
            </button>
          </div>
        </div>
      </section>
      <section>
        <ImageCarousel />
      </section>
      <section className={style.display_flex}>
        <div className={style.quick_access}>
          <h2>{t("public.home.quickAccess.title")}</h2>
          <div className={style.quick_access_items}>
            {accessItems(t).map(({ label, iconClass, url }) => {
              return (
                <div
                  onClick={() => {
                    navigate(url);
                  }}
                  key={label}
                  className={style.access_item}
                >
                  <div className={`${style.access_icon} ${style[iconClass]}`} />
                  <p className={style.access_label}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className={style.display_flex}>
        <div className={style.events}>
          <h2>{t("public.home.events.upcomingEvents")}</h2>
          <div className={style.events_items}>
            {events?.pages
              .flatMap((page) => page.items)
              .map((item, index) => {
                return (
                  <div key={index} className={style.event}>
                    <div className={style.event_text_cont}>
                      <h1>{item.title}</h1>
                      <p className={style.event_date}>
                        <DateConverter date={new Date(item.date ?? "")} />
                      </p>
                    </div>
                    <div
                      className={style.event_btn}
                      onClick={() => {
                        navigate(`/events/${item.slug}`);
                      }}
                    >
                      <h1>{t("public.home.events.button")}</h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section className={style.display_flex}>
        <div className={style.news}>
          <h2>{t("public.home.news.title")}</h2>
          <div className={style.news_items}>
            {news?.items.map((item) => {
              return (
                <div key={item.id} className={style.news_item}>
                  <div className={style.news_text_cont}>
                    <p className={style.news_date}>
                      <DateConverter date={new Date(item.updatedAt ?? "")} />
                    </p>
                    <h1>{item.title}</h1>
                    <p className={style.news_body}>
                      {item.description ? (
                        item.description.split(" ").length > 30 ? (
                          <>
                            {item.description.split(" ").slice(0, 30).join(" ")}
                            <Link to={`news/${item.slug}`}>
                              {t("public.home.news.readMore")}
                            </Link>
                          </>
                        ) : (
                          item.description
                        )
                      ) : null}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                    }}
                    className={`${style.home_newsItem_img}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;
