import { FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/istockphoto.png";
import style from "./footer.module.css";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className={style.footer_con}>
      <div className={style.footer}>
        <img src={logo} alt="Logo" />
        <nav>
          <div className={style.Footer_tags}>
            <NavLink to={"/"}>{t("public.nav.home")}</NavLink>
            <NavLink to={"/services"}>{t("public.nav.services")}</NavLink>
            <NavLink to={"/news"}>{t("public.nav.news")}</NavLink>
            <NavLink to={"/events"}>{t("public.nav.events")}</NavLink>
            <NavLink to={"/report"}>{t("public.nav.publicComplaints")}</NavLink>
            <NavLink to={"/contact"}>{t("public.nav.contact")}</NavLink>
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
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                width="24"
                height="24"
              />
            </a>
          </div>
        </nav>
      </div>
      <div className={style.footer_text_con}>
        <p>{t("public.footer.followUs")}</p>
        <p>{t("public.footer.contactEmail")}</p>
        <p>{t("public.footer.copyright")}</p>
      </div>
    </div>
  );
};

export default Footer;
