import style from "./dashBoardSideBar.module.css";
import img from "../../assets/istockphoto.png";
import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { PiNewspaperLight } from "react-icons/pi";
import { MdEventNote } from "react-icons/md";
import { PiHandWavingBold } from "react-icons/pi";
import { PiMegaphoneLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import LogoutButton from "../logoutBtn/LogoutButton";
import { useTranslation } from "react-i18next";

const DashBoardSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`${style.dashBoardSideBar_con} ${
          isOpen ? style.sidebar_open : ""
        }`}
      >
        <div className={style.dashboard_sideBar}>
          <div className={style.dashboard_sideBar_header}>
            <img src={img} alt="logo" />
            <div>
              <h3>{t("public.branding.municipality")}</h3>
              <p>{t("admin.sidebar.admin")}</p>
            </div>
          </div>
          <div className={style.dashboard_sideBar_nav_con}>
            <nav>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? style.isactive : "")}
                end
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <GoHomeFill className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.dashboard")}</p>
                </div>
              </NavLink>
              <NavLink
                to="news"
                className={({ isActive }) => (isActive ? style.isactive : "")}
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <PiNewspaperLight className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.news")}</p>
                </div>
              </NavLink>
              <NavLink
                to="events"
                className={({ isActive }) => (isActive ? style.isactive : "")}
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <MdEventNote className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.events")}</p>
                </div>
              </NavLink>
              <NavLink
                to="services"
                className={({ isActive }) => (isActive ? style.isactive : "")}
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <PiHandWavingBold className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.services")}</p>
                </div>
              </NavLink>
              <NavLink
                to="complaints"
                className={({ isActive }) => (isActive ? style.isactive : "")}
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <PiMegaphoneLight className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.complaints")}</p>
                </div>
              </NavLink>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
                to="settings"
                className={({ isActive }) => (isActive ? style.isactive : "")}
              >
                <div>
                  <IoSettingsOutline className={style.dashboard_icon} />
                  <p>{t("admin.sidebar.settings")}</p>
                </div>
              </NavLink>
              <LogoutButton />
            </nav>
          </div>
        </div>
      </div>

      {/* Hamburger menu visible only on mobile */}
      <div
        className={style.RxHamburgerMenu_icon_cont}
        onClick={() => setIsOpen((v) => !v)}
      >
        <RxHamburgerMenu className={style.RxHamburgerMenu_icon} />
      </div>

      {/* Overlay only active when sidebar open */}
      <div
        className={`${style.admin_body_overlay} ${isOpen ? style.active : ""}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default DashBoardSideBar;
