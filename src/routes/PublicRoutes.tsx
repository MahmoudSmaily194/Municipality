import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import PublicLayout from "../layouts/PublicLayout";
import Service from "../pages/services/Service";
import News from "../pages/news/News";


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service/>}/>
         <Route path="/news" element={<News/>}/>
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
