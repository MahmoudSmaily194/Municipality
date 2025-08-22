// src/routes/ProtectedRoutes.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div>Access Denied</div>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
