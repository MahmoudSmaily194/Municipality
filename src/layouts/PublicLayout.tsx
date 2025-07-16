import { Outlet } from "react-router-dom";
import PublicNav from "../components/publicNav/PublicNav";
import type { ChildrenType } from "../types/ChildrenType";
import type { FC } from "react";
import Footer from "../components/footer/Footer";

const PublicLayout: FC<ChildrenType> = ({ children }) => {
  return (
    <>
      <PublicNav />
      {children ? children : <Outlet />}
      <Footer/>
    </>
    
  );
};

export default PublicLayout;
