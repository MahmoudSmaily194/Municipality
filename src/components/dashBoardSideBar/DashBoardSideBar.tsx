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

const DashBoardSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              <h3>Municipality of Sawirah</h3>
              <p>Admin</p>
            </div>
          </div>
          <div className={style.dashboard_sideBar_nav_con}>
            <nav>
              <NavLink to="">
                <div>
                  <GoHomeFill className={style.dashboard_icon} />
                  <p>Dashboard</p>
                </div>
              </NavLink>
              <NavLink to="news">
                <div>
                  <PiNewspaperLight className={style.dashboard_icon} />
                  <p>News</p>
                </div>
              </NavLink>
              <NavLink to="events">
                <div>
                  <MdEventNote className={style.dashboard_icon} />
                  <p>Events</p>
                </div>
              </NavLink>
              <NavLink to="services">
                <div>
                  <PiHandWavingBold className={style.dashboard_icon} />
                  <p>Services</p>
                </div>
              </NavLink>
              <NavLink to="complaints">
                <div>
                  <PiMegaphoneLight className={style.dashboard_icon} />
                  <p>Complaints</p>
                </div>
              </NavLink>
              <NavLink to="settings">
                <div>
                  <IoSettingsOutline className={style.dashboard_icon} />
                  <p>Settings</p>
                </div>
              </NavLink>
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
        className={`${style.admin_body_overlay} ${
          isOpen ? style.active : ""
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default DashBoardSideBar;
