import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import img from "../../assets/newsImg.png";
import NoResults from "../../components/noResults/NoResults";
import Pagination from "../../components/pagination/Pagination";
import style from "./news.module.css";
import { useNewsItemProvider } from "../../stores/useNewsItemProvider";

const News = () => {
  const newsItems = [
    {
      url: img,
      title: "Springfield's New Community Center Opens",
      body: "The new community center offers a variety of programs and activities for residents of all ages The new community center offers a variety of programs and activities for residents of all agesThe new community center offers a variety of programs and activities for residents of all agesThe new community center offers a variety of programs and activities for residents of all ages",
      date: "2025-07-01",
    },
    {
      url: img,
      title: "City Council Approves New Budget",
      body: "The budget includes funding for infrastructure improvements, public safety, and community services.",
      date: "2025-07-02",
    },
    {
      url: img,
      title: "Local Business Wins National Award",
      body: "A local business has been recognized for its innovation and contributions to the community.",
      date: "2025-07-03",
    },
    {
      url: img,
      title: "New Park Opens Downtown",
      body: "The newly built park includes walking trails, playgrounds, and a public amphitheater.",
      date: "2025-07-04",
    },
    {
      url: img,
      title: "High School Students Win Robotics Championship",
      body: "Springfield High’s robotics team placed first in the national competition held in Chicago.",
      date: "2025-07-05",
    },
    {
      url: img,
      title: "Community Hosts Charity Marathon",
      body: "Hundreds participated in a marathon fundraiser for local shelters and food banks.",
      date: "2025-07-06",
    },
    {
      url: img,
      title: "Library Launches Summer Reading Program",
      body: "The library offers incentives for young readers with author visits and workshops.",
      date: "2025-07-07",
    },
    {
      url: img,
      title: "City Announces Tree-Planting Initiative",
      body: "Volunteers will plant 2,000 new trees to improve air quality and green spaces.",
      date: "2025-07-08",
    },
    {
      url: img,
      title: "University Expands Scholarship Opportunities",
      body: "Springfield University will offer full scholarships to qualified low-income applicants.",
      date: "2025-07-09",
    },
    {
      url: img,
      title: "Local Theater Debuts New Play",
      body: "Theater fans attended the premiere of ‘River Dreams,’ an original play by a local writer.",
      date: "2025-07-10",
    },
    {
      url: img,
      title: "Farmers' Market Celebrates Anniversary",
      body: "Celebrating 10 years, the market features live music and vendor specials.",
      date: "2025-07-11",
    },
    {
      url: img,
      title: "City Reduces Public Transit Fares",
      body: "A new pricing structure aims to make transportation more affordable for daily commuters.",
      date: "2025-07-12",
    },
    {
      url: img,
      title: "Hospital Opens New Pediatric Wing",
      body: "The expansion improves access to specialized care for children in the region.",
      date: "2025-07-13",
    },
    {
      url: img,
      title: "Historic Building Restored",
      body: "The century-old courthouse reopens with modern upgrades and community exhibits.",
      date: "2025-07-14",
    },
    {
      url: img,
      title: "Local Artist Hosts Gallery Night",
      body: "Attendees enjoyed a vibrant collection of community-inspired visual art.",
      date: "2025-07-15",
    },
  ];
    const setNewsItem = useNewsItemProvider((state) => state.setNewsItem);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesNb = Math.ceil((newsItems?.length ?? 0) / 9);
  const FirstIndex = (currentPage - 1) * 9;
  const currentItems = newsItems?.slice(FirstIndex, FirstIndex + 9);
  return (
    <>
    <div>
      <div className={style.news_page_con}>
        <div className={style.news_page}>
          <div className={style.news_page_title}>
            <h1>Latest News</h1>
          </div>

          <div className={style.news_con}>
            <div className={style.news_filter_con}>
              <select>
                <option value="">Date</option>
                <option value="week">Last Week</option>
                <option value="month">last Month</option>
                <option value="year">Last Year</option>
              </select>

              <div className={style.search_inp}>
                <IoMdSearch className={style.search_icon} />{" "}
                <input type="text" placeholder="Search..." />
              </div>
            </div>
            <div className={style.news}>
              {currentItems?.length === 0 ? (
                <NoResults />
              ) : (
                currentItems?.map((newsItem, index) => (
                  <div key={index} className={style.newsItem}>
                    <img
                      src={newsItem.url || "/default.jpg"}
                      alt={newsItem.title}
                    />
                    <div className={style.newsItem_body}>
                      <h4>{newsItem.title}</h4>
                      <p>
                        {newsItem.body.split(" ").length > 20 ? (
                          <>
                            {newsItem.body.split(" ").slice(0, 20).join(" ")}{" "}
                            <Link to={`/news/${index}`} style={{ color: "blue", cursor: "pointer" }} onClick={()=>{
                              setNewsItem(newsItem)
                            }}>
                              ...view more
                            </Link>
                          </>
                        ) : (
                          newsItem.body
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Pagination
              NbOfPages={pagesNb}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
   
</>
  );
  
};

export default News;
