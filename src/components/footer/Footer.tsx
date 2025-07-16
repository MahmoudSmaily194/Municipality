import { NavLink } from "react-router-dom";
import style from "./footer.module.css";
import logo from "../../assets/istockphoto.png";
const Footer = () => {
  return (
    <div className={style.footer_con}>
        <div className={style.footer}>
          <img src={logo} alt="Logo" />
      <nav>
           <div className={style.Footer_tags}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/services"}>Services</NavLink>
          <NavLink to={"/news"}>News</NavLink>
          <NavLink to={"/events"}>Events</NavLink>
          <NavLink to={"/report"}>Report Issue</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </div>
      </nav>
    </div>
    </div>
  )
}

export default Footer;
