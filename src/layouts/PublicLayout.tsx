import { Outlet } from "react-router-dom";
import PublicNav from "../components/publicNav/PublicNav";
import type { ChildrenType } from "../types/ChildrenType";
import type { FC } from "react";

const PublicLayout: FC<ChildrenType> = ({ children }) => {
  return (
    <div>
      <PublicNav />
      {children ? children : <Outlet />}
    </div>
  );
};

export default PublicLayout;
