import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import style from "./pagination.module.css";
import type { Dispatch, SetStateAction } from "react";
type PaginationProps = {
  NbOfPages: number;
 setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({
  NbOfPages,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {

 const handlePageClick = (page: number) => {
    if (page >= 1 && page <= NbOfPages) {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < NbOfPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const btns = () => {
    let buttons = [];
    if (NbOfPages <= 5) {
      buttons = Array.from({ length: NbOfPages }, (_, i) => i + 1);
    } else {
      const first = Math.max(currentPage - 1, 1);
      const second = currentPage;
      const beforeLast = NbOfPages - 1;
      const last = NbOfPages;
      if (currentPage <= 2) {
        // Near the beginning
        buttons = [1, 2, "...", beforeLast, last];
      } else if (currentPage >= NbOfPages - 1) {
        // Near the end
        buttons = [1, 2, "...", beforeLast, last];
      } else {
        // In the middle
        buttons = [first, second, "...", beforeLast, last];
      }
    }

    return buttons.map((page, index) => {
      if (page === "...") {
        return (
          <div key={`dots-${index}`} className={style.dots}>
            ...
          </div>
        );
      }
      return (
        <button
          key={page}
          className={`${style.pageBtn}  ${page === currentPage ? style.active :""}`}
          onClick={() => handlePageClick(Number(page))}
        >
          {page}
        </button>
      )
    });
  };

  return (
      <div className={style.pagination}>
      <button onClick={handlePrev} disabled={currentPage === 1} className={style.pagi_arrow_btns}>
      <FaAngleLeft/>
      </button>
      {btns()}
      <button onClick={handleNext} disabled={currentPage === NbOfPages} className={style.pagi_arrow_btns} >
        <FaAngleRight/>
      </button>
    </div>
  );
};

export default Pagination;
