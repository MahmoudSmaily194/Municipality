import { NavLink } from "react-router-dom";
import style from "./publicnav.module.css";
import { TiHome } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiNewspaperLight } from "react-icons/pi";
import { FaFlag } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { RiTranslateAi2 } from "react-icons/ri";
interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ setIsSidebarOpen }: SidebarProps) => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };
  return (
    <div
      className={style.sidebar_overlay}
      onClick={() => {
        setIsSidebarOpen(false);
      }}
    >
      <div className={style.sideBar_con}>
        <div className={style.sideBar_tags}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/"}
          >
            <div>
              <TiHome className={style.icon} /> <h5>{t("public.nav.home")}</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/services"}
          >
            <div>
              <TfiMenuAlt className={style.icon} />{" "}
              <h5>{t("public.nav.services")}</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/news"}
          >
            <div>
              <PiNewspaperLight className={style.icon} />
              <h5>{t("public.nav.news")}</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/events"}
          >
            <div>
              <PiNewspaperLight className={style.icon} />
              <h5>{t("public.nav.events")}</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/complaints"}
          >
            <div>
              <FaFlag className={style.icon} />
              <h5> {t("public.nav.publicComplaints")}</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/contact"}
          >
            <div>
              <IoMdMail className={style.icon} />
              <h5>{t("public.nav.contact")}</h5>
            </div>
          </NavLink>
          <div className={style.translate_side_bar} onClick={toggleLanguage}>
            <RiTranslateAi2 className={style.icon} />
            <h5>
              {t("public.nav.translateTo")}
              <span style={{ color: "#1a80e5" }}>
                {i18n.language === "en" ? "AR" : "EN"}
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
