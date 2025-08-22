import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useAuthBootstrap } from "./services/useAuthBootStrap";
import { useAuthStore } from "./stores/useAuthStore";
import Loader from "./components/loader/Loader";
import { Toaster } from "react-hot-toast";

function App() {
  useAuthBootstrap(); // ← run on load
  const isInitialized = useAuthStore((s) => s.isInitialized);
  if (!isInitialized) {
    return <Loader isAppLoading={true} />;
  }

  return (
    <>
      <Loader isAppLoading={true} />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}

export default App;
