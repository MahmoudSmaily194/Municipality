import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoHomeFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { PiHandWavingBold, PiMegaphoneLight, PiNewspaperLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import img from "../../assets/istockphoto.png";
import LogoutButton from "../logoutBtn/LogoutButton";
import style from "./dashBoardSideBar.module.css";

const DashBoardSideBar = () => {
  const { t, i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.dir()); // "ltr" or "rtl"
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const newDir = i18n.dir();
    if (newDir !== dir) {
      setDir(newDir); // update direction, don't touch isOpen
    }
  }, [i18n.language]);

  const navItems = [
    { to: "", icon: <GoHomeFill />, label: t("admin.sidebar.dashboard") },
    { to: "news", icon: <PiNewspaperLight />, label: t("admin.sidebar.news") },
    { to: "events", icon: <MdEventNote />, label: t("admin.sidebar.events") },
    {
      to: "services",
      icon: <PiHandWavingBold />,
      label: t("admin.sidebar.services"),
    },
    {
      to: "complaints",
      icon: <PiMegaphoneLight />,
      label: t("admin.sidebar.complaints"),
    },
    {
      to: "settings",
      icon: <IoSettingsOutline />,
      label: t("admin.sidebar.settings"),
    },
  ];

  return (
    <>
      <div
        className={`${style.dashBoardSideBar_con} ${style[dir]} ${
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
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === ""}
                  className={({ isActive }) => (isActive ? style.isactive : "")}
                  onClick={() => setIsOpen(false)}
                >
                  <div>
                    {item.icon}
                    <p>{item.label}</p>
                  </div>
                </NavLink>
              ))}
              <LogoutButton />
            </nav>
          </div>
        </div>
      </div>

      {/* Hamburger icon */}
      <div
        className={style.RxHamburgerMenu_icon_cont}
        onClick={() => setIsOpen((v) => !v)}
        style={{
          [dir === "ltr" ? "right" : "left"]: "1rem",
          [dir === "ltr" ? "left" : "right"]: "auto",
        }}
      >
        <RxHamburgerMenu className={style.RxHamburgerMenu_icon} />
      </div>

      {/* Overlay */}
      <div
        className={`${style.admin_body_overlay} ${isOpen ? style.active : ""}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default DashBoardSideBar;
