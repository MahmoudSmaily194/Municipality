import style from "./notFound.module.css";
import img from "../../assets/notFound.png";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={style.notFound_page}>
      <div className={style.notFound_header}>
        <h1>Oops! This page doesn’t exist.</h1>
        <p>
          The page you’re looking for might have been moved or no longer exists.
          Let us help you get back on track.
        </p>
      </div>
      <img src={img} className={style.notFound_image} loading="lazy" />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to home
      </button>
    </div>
  );
};

export default NotFound;
