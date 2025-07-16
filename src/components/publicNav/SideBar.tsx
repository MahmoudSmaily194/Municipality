import { NavLink } from "react-router-dom";
import style from "./publicnav.module.css";
import { TiHome } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiNewspaperLight } from "react-icons/pi";
import { FaFlag } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

interface SidebarProps {
 isSidebarOpen : boolean;
 setIsSidebarOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({setIsSidebarOpen}: SidebarProps) => {
  return (
    <div className={style.sidebar_overlay} onClick={()=>{setIsSidebarOpen(false)}}>
      <div
        className={style.sideBar_con} 
      >
        <div className={style.sideBar_tags}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/"}
          >
            <div>
              <TiHome className={style.icon} /> <h5>Home</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/services"}
          >
            <div>
              <TfiMenuAlt className={style.icon} /> <h5>Services</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/news"}
          >
            <div>
              <PiNewspaperLight className={style.icon} />
              <h5>News</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/events"}
          >
            <div>
              <PiNewspaperLight className={style.icon} />
              <h5>Events</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/report"}
          >
            <div>
              <FaFlag className={style.icon} />
              <h5>Report Issue</h5>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to={"/contact"}
          >
            <div>
              <IoMdMail className={style.icon} />
              <h5>Contact</h5>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
