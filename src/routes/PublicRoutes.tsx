import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import PublicLayout from "../layouts/PublicLayout";
import Service from "../pages/services/Service";


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service/>}/>
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
