import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Contact from "../pages/contact/Contact";
import Events from "../pages/events/Events";
import Home from "../pages/home/Home";
import News from "../pages/news/News";
import NewsItem from "../pages/news/newsItem/NewsItem";
import Report from "../pages/report/Report";
import Service from "../pages/services/Service";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsItem />} />
        <Route path="/events" element={<Events/>}/>
        <Route path="/report" element={<Report/>}/>
           <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
