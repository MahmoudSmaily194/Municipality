import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DeleteRowDialog from "../../components/deleteRowDialog/DeleteRowDialog";
import { useDeleteService, useInfiniteServices } from "../../hooks/useServices";
import { useDeleteDialogStore } from "../../stores/DeleteRowDialogStore";
import type { FetchPaginatedParamsType } from "../../types/FetchNewsParamsType";
import style from "./manageServices.module.css";
const ManageServices = () => {
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

  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteServices(filters);
  const { openDialog, isOpen } = useDeleteDialogStore();
  const { mutate: deleteService } = useDeleteService();
  const handleDeleteClick = (serviceId: string) => {
    openDialog(serviceId, () => {
      deleteService(serviceId);
    });
  };
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...prev,
      PageSize: 10,
      PageNumber: 1,
      CategoryId: "",
      SearchTerm: "",
    }));
  }, []);
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
    <div className={style.ManageServices_page_con}>
      <div className={style.manageServices_page}>
        <div className={style.manageServices_header}>
          <h1>{t("admin.services.management.title")}</h1>
          <button
            onClick={() => {
              navigate("../servicemodel");
            }}
          >
            {t("admin.services.management.add.button")}
          </button>
        </div>
        <p>{t("admin.services.management.add.description")}</p>
        <div className={style.add_category}>
          <h3>{t("admin.services.management.existing.title")}</h3>
          <button
            onClick={() => {
              navigate("../categorymodel");
            }}
          >
        {t("admin.services.management.add.add")}
          </button>
        </div>
        <div className={style.manageServices_table_con}>
          <div>
            <table>
              <thead>
                <tr>
                  <th>{t("admin.services.management.name")}</th>
                  <th>{t("admin.services.management.category")}</th>
                  <th>{t("admin.services.management.status")}</th>
                  <th>{t("admin.services.management.action")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.pages
                  .flatMap((page) => page.items)
                  .map((service) => {
                    return (
                      <tr key={service.id}>
                        <td style={{ color: "black" }}>
                          {service.title.split(" ").slice(0, 5).join(" ")}
                        </td>
                        <td>
                          {service.categoryName
                            ? service.categoryName
                            : "category"}
                        </td>
                        <td>
                          {service?.status == 0
                            ? t("public.viewService.active")
                            : t("public.viewService.notActive")}
                        </td>
                        <td>
                          <div>
                            <p
                              className={style.edit_service_btn}
                              onClick={() => {
                                navigate(`./${service.id}`);
                              }}
                            >
                              {t("admin.services.management.actions.edit")}
                            </p>
                            <p> |</p>
                            <p
                              className={style.delete_service_btn}
                              onClick={() => {
                                handleDeleteClick(service.id);
                              }}
                            >
                              {t("admin.services.management.actions.delete")}
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
      {isOpen && <DeleteRowDialog />}
    </div>
  );
};

export default ManageServices;
