import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import NoResults from "../../components/noResults/NoResults";
import Pagination from "../../components/pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useVissibleNews } from "../../hooks/useNews";
import LazyImage from "../../LazyLoader/LazyImg";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import style from "./news.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const News = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FetchPaginatedParamsType>({
    PageNumber: 1,
    PageSize: 9,
    SortBy: "",
    SortDirection: "",
    ComplaintStatus: "",
    DateFilter: "",
    SearchTerm: "",
  });
  const [date, setDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const { data, isLoading } = useVissibleNews(filters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesNb = data?.totalPages;
  const news = data?.items ?? [];
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      PageNumber: currentPage,
      DateFilter: date,
      SearchTerm: debouncedSearchTerm,
    }));
  }, [currentPage, date, debouncedSearchTerm]);
  return !isLoading ? (
    <>
      <div>
        <div className={style.news_page_con}>
          <div className={style.news_page}>
            <div className={style.news_page_title}>
              <h1>{t("public.news.title")}</h1>
            </div>

            <div className={style.news_con}>
              <div className={style.news_filter_con}>
                <FormControl className={style.newsSelect } sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    {t("public.news.date.title")}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label={t("public.news.date.title")}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value="">{t("public.news.date.title")}</MenuItem>
                    <MenuItem value="today">
                      {t("public.news.date.today")}
                    </MenuItem>
                    <MenuItem value="lastweek">
                      {t("public.news.date.lastWeek")}
                    </MenuItem>
                    <MenuItem value="lastmonth">
                      {t("public.news.date.lastMonth")}
                    </MenuItem>
                    <MenuItem value="lastyear">
                      {t("public.news.date.lastYear")}
                    </MenuItem>
                  </Select>
                </FormControl>
                <div className={style.search_inp}>
                  <IoMdSearch className={style.search_icon} />
                  <input
                    type="search"
                    placeholder={t("public.news.search")}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    maxLength={150}
                  />
                </div>
              </div>
              <div className={style.news}>
                {news?.length == 0 ? (
                  <div className={style.news_nores}>
                    <NoResults />
                  </div>
                ) : (
                  news.map((newsItem) => {
                    return (
                      <div key={newsItem.id} className={style.newsItem}>
                        <div className={style.newsItem_img_con}>
                          <LazyImage
                            className={style.newsItem_img}
                            src={
                              newsItem.imageUrl ? `${newsItem.imageUrl}` : ""
                            }
                            alt={newsItem.imageUrl ? newsItem.imageUrl : ""}
                          />
                        </div>
                        <div className={style.newsItem_body}>
                          <h4>{newsItem.title}</h4>
                          <p>
                            {newsItem.description ? (
                              newsItem.description.split(" ").length > 20 ? (
                                <>
                                  {newsItem.description
                                    .split(" ")
                                    .slice(0, 20)
                                    .join(" ")}
                                  <Link
                                    to={`/news/${encodeURIComponent(
                                      newsItem.slug
                                    )}`}
                                    style={{ color: "blue", cursor: "pointer" }}
                                    onClick={() => {
                                      console.log(
                                        ` slug:${encodeURIComponent(
                                          newsItem.slug
                                        )}`
                                      );
                                    }}
                                  >
                                    {t("public.news.viewMore")}
                                  </Link>
                                </>
                              ) : (
                                newsItem.description
                              )
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <Pagination
                NbOfPages={pagesNb ? pagesNb : 1}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <p>isLoading</p>
    </>
  );
};

export default News;
