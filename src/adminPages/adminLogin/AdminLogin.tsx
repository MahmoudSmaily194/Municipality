import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/istockphoto.png";

import style from "./adminLogin.module.css";
import { useAuthStore } from "../../stores/useAuthStore";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";

const AdminLogin = () => {
  const { t } = useTranslation();
  const [emailOrPhone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError, error } = AuthService();
  const user = useAuthStore((s) => s.user); // ← to know if user id logged in
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  // if user is  logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { emailOrPhone, password },
      {
        onSuccess: (data) => {
          // Redirect after successful login
          if (data.role === "Admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <div className={style.admin_login_page}>
      <div className={style.admin_login_form_con}>
        <div className={style.admin_login_header}>
          <img src={img} alt="Logo" />
          <h1>{t("public.branding.municipality")}</h1>
          <h2>{t("public.auth.login.title")} </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">{t("public.auth.login.email.label")}</label>
            <input
              id="email"
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <div>
            <label htmlFor="password">
              {t("public.auth.login.password.label")}{" "}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <a>{t("public.auth.login.forgot")} </a>

          <button type="submit" disabled={isPending}>
            {isPending
              ? t("public.auth.login.loggingIn")
              : t("public.auth.login.submit")}
          </button>

          {isError && (
            <p style={{ color: "red" }}>
              {t("public.auth.login.failed")}
              {(error as any)?.response?.data?.message ||
                `${" " + t("public.auth.login.tryAgain")}`}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
