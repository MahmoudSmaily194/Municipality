import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Contact from "../pages/contact/Contact";
import Events from "../pages/events/Events";
import Home from "../pages/home/Home";
import News from "../pages/news/News";
import NewsItem from "../pages/news/newsItem/NewsItem";
import Report from "../pages/report/Report";
import Service from "../pages/services/Service";
import PublicComplaints from "../pages/publicComplaints/PublicComplaints";
import NotFound from "../pages/notFound/NotFound";
import EventsViewModel from "../pages/events/eventsViewModel/EventsViewModel";
import ServiceViewModel from "../pages/services/serviceViewModel/ServiceViewModel";
import ToggleBtn from "../components/toggleBtn/ToggleBtn";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services/:id" element={<ServiceViewModel />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsItem />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventsViewModel />} />
        <Route path="/complaints" element={<PublicComplaints />} />
        <Route path="/report" element={<Report />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ToggleBtn />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
