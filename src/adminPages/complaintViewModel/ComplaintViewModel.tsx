import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import DateConverter from "../../components/date/Date";
import Loader from "../../components/loader/Loader";
import MunicipalityMap from "../../components/municipalityMap/MunicipalityMap";
import { useUpdateComplaint } from "../../hooks/useComplaints";
import { fetchedComplaintById } from "../../services/Complaints";
import style from "./complaintViewModel.module.css";
import ToggleBtn from "../../components/toggleBtn/ToggleBtn";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
const StatusEnum: Record<string, number> = {
  Pending: 0,
  InProgress: 1,
  Resolved: 2,
  Rejected: 3,
};

const ComplaintViewModel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate } = useUpdateComplaint();

  const { id } = useParams<{ id: string }>();

  const { data: complaint, isLoading } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchedComplaintById(id!),
    enabled: !!id,
  });

  const [status, setStatus] = useState(0);
  const [rangeInputs, setRangeInputs] = useState({
    public: Number(complaint?.visibility),
    important: Number(complaint?.importance),
  });

  useEffect(() => {
    if (complaint) {
      setStatus(
        typeof complaint.status === "string"
          ? StatusEnum[complaint.status] ?? 0
          : Number(complaint.status)
      );
      setRangeInputs({
        public: complaint.visibility === "Public" ? 1 : 0,
        important: complaint.importance == 0 ? 0 : 1,
      });
    }
  }, [complaint]);

  const handleUpdate = () => {
    if (!id || !complaint) return;

    const hasChanges =
      status !==
        (typeof complaint.status === "string"
          ? StatusEnum[complaint.status]
          : Number(complaint.status)) ||
      rangeInputs.public !== (complaint.visibility === "Public" ? 1 : 0) ||
      rangeInputs.important !== (complaint.importance == 0 ? 0 : 1);

    if (!hasChanges) {
      toast.error(t("toast.noChanges"));
      return;
    }

    mutate(
      {
        Id: id,
        updatedData: {
          status,
          visibility: rangeInputs.public,
          importance: rangeInputs.important,
        },
      },
      {
        onSuccess: () => {
          toast.success(t("toast.updatedComplaint"));
        },
      }
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.complaint_viewModel_page}>
      <div className={style.complaint_viewModel}>
        {/* Complaint Details */}
        <div className={style.complaint_viewModel_details}>
          <div className={style.complaint_viewModel_header}>
            <h3
              onClick={() => {
                navigate("../complaints", { replace: true });
              }}
              className={style.newsItem_Back}
            >
              <IoMdArrowRoundBack />
              {t("admin.viewComplaint.back")}
            </h3>
            <h2>{t("admin.viewComplaint.title")}</h2>
            <p>{t("admin.viewComplaint.manageInfo")}</p>
          </div>

          <header>
            <strong>{t("admin.viewComplaint.issueType")}</strong>
            <h4>{complaint?.issueName}</h4>
          </header>

          {complaint?.imageUrl && (
            <img src={complaint.imageUrl} alt="Complaint" />
          )}

          <div className={style.complaint_viewModel_select}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="complaint-status-label">
                <strong>{t("admin.viewComplaint.status")}</strong>
              </InputLabel>
              <Select
                labelId="complaint-status-label"
                id="complaint-status"
                label={t("admin.viewComplaint.status")}
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
              >
                <MenuItem value={0}>Pending</MenuItem>
                <MenuItem value={1}>In Progress</MenuItem>
                <MenuItem value={2}>Resolved</MenuItem>
                <MenuItem value={3}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>

          <header>
            <strong>{t("admin.viewComplaint.date")}</strong>

            <DateConverter date={new Date(complaint?.updatedAt ?? "")} />
          </header>

          <div className={style.complaint_viewModel_description}>
            <header>
              <strong>{t("admin.viewComplaint.description")}</strong>
            </header>
            <p>{complaint?.description}</p>
          </div>

          <div className={style.complaint_viewModel_userInfo}>
            <h3>
              <strong>{t("admin.viewComplaint.userInformation")}</strong>
            </h3>
            <span>
              <strong>{t("admin.viewComplaint.fullName")}:</strong>{" "}
              <span>{complaint?.fullName}</span>
            </span>
            <span>
              <strong>{t("admin.viewComplaint.phoneNumber")}:</strong>{" "}
              <span>{complaint?.phoneNumber}</span>
            </span>
          </div>

          <div className={style.complaint_view_location}>
            <h3>
              <strong>{t("admin.viewComplaint.location")}</strong>
            </h3>
            <MunicipalityMap
              position={{
                lat: complaint?.latitude || 0,
                lng: complaint?.longitude || 0,
              }}
            />
          </div>
        </div>

        {/* Admin Controls */}
        <div className={style.complaint_viewModel_adminControles_con}>
          <h3>
            <strong>{t("admin.viewComplaint.manageInfo")}</strong>
          </h3>

          <div className={style.complaint_viewModel_adminControles}>
            <div>
              <p>{t("admin.viewComplaint.public")}</p>
              <ToggleBtn
                id="public-toggle"
                value={rangeInputs.public}
                onChange={() =>
                  setRangeInputs((prev) => ({
                    ...prev,
                    public: prev.public === 1 ? 0 : 1,
                  }))
                }
              />
            </div>

            <div>
              <p>{t("admin.viewComplaint.important")}</p>

              <ToggleBtn
                id="important-toggle"
                value={rangeInputs.important}
                onChange={() =>
                  setRangeInputs((prev) => ({
                    ...prev,
                    important: prev.important === 1 ? 0 : 1,
                  }))
                }
              />
            </div>
          </div>

          <button onClick={handleUpdate}>
            {t("admin.viewComplaint.updateButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintViewModel;
