import toast from "react-hot-toast";
import style from "./contactform.module.css";
import type { ContactFormType } from "../../../types/ContactFormType";
import { useState } from "react";
import { useSendEmail } from "../../../hooks/useSendEmail";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactFormType>({
    name: "",
    email: "",
    subject: "",
    body: "",
  });

  const mutation = useSendEmail();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value, // ✅ correct dynamic key update
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess() {
        toast.success("Email sent successfully!");
        setForm({ name: "", email: "", subject: "", body: "" });
      },
      onError(error: any) {
        toast.error(t("toast.emailSendFail") + error.message);
      },
    });
  };

  return (
    <div className={style.contact_con}>
      <div className={style.container}>
        <div className={style.black_bg}>
          <div className={style.text_content}>
            <h1>{t("public.home.contact.title")}</h1>
            <p>{t("public.home.contact.body")}</p>
          </div>
        </div>

        <div className={style.form_con}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("public.home.contact.fullName")}
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={50}
            />
            <input
              type="text"
              placeholder={t("public.home.contact.email")}
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={50}
            />
            <input
              type="text"
              placeholder={t("public.home.contact.subject")}
              id="subject"
              value={form.subject}
              onChange={handleChange}
              required
              maxLength={300}
            />
            <textarea
              placeholder={t("public.home.contact.message")}
              id="body"
              value={form.body}
              onChange={handleChange}
              required
              maxLength={2000}
            />

            <div className={style.chech_box_con}>
              <input type="checkbox" id="checkbox" />
              <p>
                {t("public.home.contact.accept")}
                <a href="#"> {t("public.home.contact.terms")} </a>
              </p>
            </div>

            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? t("public.home.contact.sending")
                : t("public.home.contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
