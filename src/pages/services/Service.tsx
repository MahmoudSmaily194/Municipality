import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import NoResults from "../../components/noResults/NoResults";
import Pagination from "../../components/pagination/Pagination";
import LazyImage from "../../LazyLoader/LazyImg";
import { useFilteredServices } from "../../services/useFilteredServices";
import { useServiceFilterStore } from "../../stores/useServiceFilterStore";
import style from "./services.module.css";

const Service = () => {
  const { query, category, setQuery, setCategory } = useServiceFilterStore();
  const { data } = useFilteredServices();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesNb = Math.ceil((data?.length ?? 0) / 15);
  const FirstIndex = (currentPage - 1) * 15;
  const currentItems = data?.slice(FirstIndex, FirstIndex + 15);
  useEffect(() => {
    setCurrentPage(1);
  }, [query, category]);
  return (
    <div className={style.serv_page_con}>
      <div className={style.serv_page}>
        <div className={style.serv_page_title}>
          <h1>City Services</h1>
        </div>

        <div className={style.services_con}>
          <div className={style.filter_con}>
            <ul>
              <li onClick={() => setCategory("")}>All Services</li>
              <li onClick={() => setCategory("public")}>Public Works</li>
              <li onClick={() => setCategory("permits")}>Permits</li>
              <li onClick={() => setCategory("finance")}>Finance</li>
              <li onClick={() => setCategory("parks")}>Parks & Recreation</li>
            </ul>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="public">Public Works</option>
              <option value="permits">Permits</option>
              <option value="finance">Finance</option>
              <option value="parks">Parks & Recreation</option>
            </select>
            <div className={style.search_inp}>
              <IoMdSearch className={style.search_icon} />{" "}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className={style.services}>
            {currentItems?.length === 0 ? (
              <NoResults />
            ) : (
              currentItems?.map((service, index) => (
                <div key={index} className={style.service}>
                  <LazyImage src={service.url} alt={service.title} />
                  <div className={style.serv_body}>
                    <h4>{service.title}</h4>
                    <p>{service.details}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            NbOfPages={pagesNb}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Service;
