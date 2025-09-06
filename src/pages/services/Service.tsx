import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import NoResults from "../../components/noResults/NoResults";
import Pagination from "../../components/pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useServiceCategories, useServices } from "../../hooks/useServices";
import LazyImage from "../../LazyLoader/LazyImg";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import style from "./services.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Service = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FetchPaginatedParamsType>({
    PageNumber: 1,
    PageSize: 9,
    SortBy: "",
    SortDirection: "",
    DateFilter: "",
    SearchTerm: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [category, setCategory] = useState("");
  const { data, isLoading } = useServices(filters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesNb = data?.totalPages;
  const currentItems = data?.items;

  const { data: categories } = useServiceCategories();
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...prev,
      PageNumber: currentPage,
      CategoryId: category,
      SearchTerm: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm, category, currentPage]);

  return !isLoading ? (
    <div className={style.serv_page_con}>
      <div className={style.serv_page}>
        <div className={style.serv_page_title}>
          <h1>{t("public.services.title")}</h1>
        </div>

        <div className={style.services_con}>
          <div className={style.filter_con}>
            <FormControl className={style.servicesSelect} size="small">
              <InputLabel id="demo-select-small-label">
                {t("public.services.title")}
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label={t("public.services.title")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="" onClick={() => setCategory("")}>
                  {t("public.services.allServices")}
                </MenuItem>
                {categories?.map((category) => {
                  return (
                    <MenuItem
                      key={category.id}
                      onClick={() => setCategory(category.id)}
                      value={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div className={style.search_inp}>
              <IoMdSearch className={style.search_icon} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("public.services.search")}
                maxLength={150}
              />
            </div>
          </div>
          <div className={style.services}>
            {currentItems?.length === 0 ? (
              <NoResults />
            ) : (
              currentItems?.map((service) => (
                <div key={service.id} className={style.service}>
                  <LazyImage
                    className={style.service_image}
                    src={`${service.imageUrl}`}
                    alt={service.title}
                  />
                  <div className={style.serv_body}>
                    <h4>{service.title}</h4>
                    <p>
                      {service.description ? (
                        service.description.split(" ").length > 10 ? (
                          <>
                            {service.description
                              .split(" ")
                              .slice(0, 10)
                              .join(" ") + " "}
                            <Link
                              to={`/services/${service.id}`}
                              style={{ color: "#1A80E5" }}
                            >
                              {t("public.services.viewDetails")}
                            </Link>
                          </>
                        ) : (
                          service.description
                        )
                      ) : (
                        <>
                          <p>No details</p>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            NbOfPages={pagesNb || 1}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  ) : (
    <>
      <p>loading</p>
    </>
  );
};

export default Service;
