import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import PublicLayout from "../layouts/PublicLayout";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
