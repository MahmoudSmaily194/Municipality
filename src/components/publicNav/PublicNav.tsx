import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import logo from "../../assets/istockphoto.png";
import style from "./publicnav.module.css";
import SideBar from "./SideBar";

const PublicNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <nav className={style.nav}>
        <div className={style.logo_cont}>
          <img src={logo} alt="Logo" />
          <h3>Municipality of Sawirah</h3>
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
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/services"}>Services</NavLink>
          <NavLink to={"/news"}>News</NavLink>
          <NavLink to={"/events"}>Events</NavLink>
          <NavLink to={"/report"}>Report Issue</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink className={style.search} to={"/search"}>
            <div className={style.search}>
              <IoIosSearch style={{ height: "20px", width: "20px" }} />
            </div>
          </NavLink>
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
