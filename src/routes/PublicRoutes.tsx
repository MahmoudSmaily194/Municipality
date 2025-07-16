import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import PublicLayout from "../layouts/PublicLayout";
import Services from "../pages/services/services";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services/>}/>
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
