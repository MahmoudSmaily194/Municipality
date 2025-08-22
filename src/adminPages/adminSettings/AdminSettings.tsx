import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsFillMoonFill } from "react-icons/bs";
import { FaCamera, FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoSunnySharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import img from "../../assets/Admin.png";
import { useUpdateProfilePhoto } from "../../services/AuthService";
import { useAuthStore } from "../../stores/useAuthStore";
import style from "./adminSettings.module.css";

const AdminSettings = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();

  // اللغة الحالية
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // الثيم الحالي
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // صورة الرفع
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ميوتاشن رفع الصورة
  const mutation = useUpdateProfilePhoto();

  // حالة عرض نافذة التأكيد
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // تبديل الثيم
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // دالة معالجة الملف (تحضير الملف وفتح التأكيد)
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.success("Please select a valid image.");
      return;
    }
    setPendingFile(file);
    setShowConfirm(true);
  }, []);

  // تأكيد رفع الصورة
  const confirmUpload = () => {
    if (!pendingFile) return;
    setUploadImage(pendingFile);

    const formData = new FormData();
    formData.append("File", pendingFile);

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile photo updated successfully");
        setUploadImage(null);
      },
      onError: (error) => {
        alert("Failed to update profile photo.");
        console.error(error);
      },
    });

    setShowConfirm(false);
    setPendingFile(null);
  };

  // إلغاء الرفع
  const cancelUpload = () => {
    setShowConfirm(false);
    setPendingFile(null);
  };

  // عند تغير الـ input file
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
        e.target.value = "";
      }
    },
    [handleFile]
  );

  // معاينة الصورة قبل الرفع
  const imagePreviewUrl = useMemo(() => {
    return uploadImage ? URL.createObjectURL(uploadImage) : null;
  }, [uploadImage]);

  // تنظيف URL عند تغير الصورة أو تفريغها
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  return (
    <>
      <div className={style.admin_settings_page_con}>
        <div className={style.admin_settings_page}>
          <div className={style.settings_header}>
            <h2>{t("admin.settings.title")}</h2>
          </div>

          <div className={style.adminInfo_card_con}>
            <div className={style.adminInfo_card}>
              <h3>{t("admin.settings.adminInformation")}</h3>

              <div className={style.adminProfilePhoto}>
                <div className={style.adminProfilePhoto_uploade_camera}>
                  <label htmlFor="file" title={t("admin.settings.uploadPhoto")}>
                    <FaCamera className={style.adminProfilePhoto_cameraIcon} />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                  />
                </div>

                <img
                  src={
                    imagePreviewUrl
                      ? imagePreviewUrl
                      : user?.profilePhoto
                      ? user.profilePhoto
                      : img
                  }
                  alt="Admin"
                />
              </div>

              <div>
                <div>
                  <FaRegUser />
                  <p>{t("admin.settings.userName")}</p>
                </div>
                <p>{user?.name}</p>
              </div>

              <div>
                <div>
                  <HiOutlineMail />
                  <p>{t("admin.settings.email")}</p>
                </div>
                <p>{user?.email}</p>
              </div>

              <div>
                <div>
                  <MdOutlineSecurity />
                  <p>{t("admin.settings.role")}</p>
                </div>
                <p>{user?.role}</p>
              </div>
            </div>
          </div>

          <div className={style.settings_theme_toggle_con}>
            <div className={style.settings_theme_toggle}>
              <div className={style.settings_theme_toggle_text}>
                <h3>{t("admin.settings.appearance")}</h3>
                <p>{t("admin.settings.lightDarkMode")}</p>
              </div>
              <div
                className={style.theme_icon_con}
                onClick={toggleTheme}
                style={
                  theme === "light"
                    ? { color: "white", backgroundColor: "black" }
                    : { color: "yellow", backgroundColor: "white" }
                }
                title={
                  theme === "light"
                    ? t("admin.settings.switchToDark")
                    : t("admin.settings.switchToLight")
                }
              >
                {theme === "light" ? (
                  <BsFillMoonFill className={style.theme_icon} />
                ) : (
                  <IoSunnySharp className={style.theme_icon} />
                )}
              </div>
            </div>
          </div>

          <div className={style.settings_language_con}>
            <div className={style.settings_language}>
              <h2>{t("admin.settings.websiteLanguage")}</h2>

              <div>
                <input
                  type="radio"
                  id="english"
                  name="language"
                  value="en"
                  checked={lang === "en"}
                  onChange={() => setLang("en")}
                />
                <label htmlFor="english">{t("admin.settings.english")}</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="arabic"
                  name="language"
                  value="ar"
                  checked={lang === "ar"}
                  onChange={() => setLang("ar")}
                />
                <label htmlFor="arabic">{t("admin.settings.arabic")}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* نافذة التأكيد */}
      {showConfirm && (
        <div className={style.confirm_overlay}>
          <div className={style.confirm_box}>
            <h3>{t("admin.settings.confirmTitle")}</h3>
            <div className={style.confirm_buttons}>
              <button onClick={confirmUpload}>{t("admin.settings.yes")}</button>
              <button onClick={cancelUpload}>{t("admin.settings.no")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSettings;
