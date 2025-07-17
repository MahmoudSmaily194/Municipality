import { FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/istockphoto.png";
import style from "./footer.module.css";
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
   <div className={style.social_media_icons}>
  <a
    href="https://www.facebook.com/yourPage"
    target="_blank"
    rel="noopener noreferrer"
    className={style.social_media_icon}
  >
    <FaFacebookF />
  </a>
  <a
    href="https://www.instagram.com/yourPage"
    target="_blank"
    rel="noopener noreferrer"
    className={style.social_media_icon}
  >
      <img  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="24" height="24" />
  </a>
</div>
      </nav>
    </div>
    </div>
  )
}

export default Footer;
