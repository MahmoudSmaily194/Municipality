import { Link } from "react-router-dom";
import { useNewsItemProvider } from "../../../stores/useNewsItemProvider";
import style from "./newsItem.module.css";
const NewsItem = () => {
  const newsItem = useNewsItemProvider((state) => state.newsItem);
  return (
    <div className={style.newsItem_page}>
      <div className={style.newsItem}>
        <h5>
          <Link to="/news">News</Link> / {newsItem.title}
        </h5>
        <h2>{newsItem.title}</h2>
        <p className={style.date}>
          published on {newsItem.date} |Source:Sawirah Municipality
        </p>
        <div style={{ backgroundImage: `url(${newsItem.url})` }}></div>
        <p>{newsItem.body}</p>
      </div>
    </div>
  );
};

export default NewsItem;
