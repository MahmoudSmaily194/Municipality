import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import logo from "../../assets/istockphoto.png";
import style from "./publicnav.module.css";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";

const PublicNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      <nav className={style.nav}>
        <div className={style.logo_cont}>
          <img src={logo} alt="Logo" />
          <h3>{t("public.site.title")}</h3>
        </div>
        <div
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={style.menu_icon}
        >
          <RxHamburgerMenu />
        </div>

        <div className={style.nav_tags}>
          <NavLink to={"/"}>{t("public.nav.home")}</NavLink>
          <NavLink to={"/services"}>{t("public.nav.services")}</NavLink>
          <NavLink to={"/news"}>{t("public.nav.news")}</NavLink>
          <NavLink to={"/events"}>{t("public.nav.events")}</NavLink>
          <NavLink to={"/complaints"}>
            {t("public.nav.publicComplaints")}
          </NavLink>
          <NavLink to={"/contact"}>{t("public.nav.contact")}</NavLink>
          <div className={style.translate}>
            <button onClick={toggleLanguage}>
              {i18n.language === "en" ? "AR" : "EN"}
            </button>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <SideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
};

export default PublicNav;
