import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./contact.module.css";

import MunicipalityMap from "../../components/municipalityMap/MunicipalityMap";

import type { ContactFormType } from "../../types/ContactFormType";
import { useSendEmail } from "../../hooks/useSendEmail";
import toast from "react-hot-toast";
import { members } from "../../data/members";

const Contact = () => {
  const { t } = useTranslation();

  const position = {
    lat: 33.68632543618543,
    lng: 35.908985301202556,
  };

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
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess() {
        toast.success(t("public.contact.form.successMessage"));
        setForm({ name: "", email: "", subject: "", body: "" });
      },
      onError(error: any) {
        alert(t("public.contact.form.errorMessage") + error.message);
      },
    });
  };

  return (
    <div className={style.contact_page}>
      <div className={style.contact}>
        <div className={style.header}>
          <h1>{t("public.contact.title")}</h1>
          <p>{t("public.contact.subtitle")}</p>
        </div>

        <div className={style.general_inquiries}>
          <h3>{t("public.contact.generalInquiries.title")}</h3>
          <p>{t("public.contact.generalInquiries.description")}</p>
          <div className={style.info}>
            <div className={style.adress}>
              <h5>{t("public.contact.generalInquiries.address.label")}</h5>
              <p>{t("public.contact.generalInquiries.address.value")}</p>
            </div>
            <div className={style.phone}>
              <h5>{t("public.contact.generalInquiries.phone.label")}</h5>
              <p>{t("public.contact.generalInquiries.phone.value")}</p>
            </div>
            <div className={style.email}>
              <h5>{t("public.contact.generalInquiries.email.label")}</h5>
              <p>{t("public.contact.generalInquiries.email.value")}</p>
            </div>
          </div>
        </div>

        <div className={style.council_members_con}>
          <h3>{t("public.contact.councilMembers")}</h3>

          <div className={style.counsil_members}>
            {members.map((member, index) => (
              <div key={index} className={style.member}>
                <img src={member.url} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>

        <h3>{t("public.contact.visitUs")}</h3>
        <MunicipalityMap position={position} />

        <div className={style.contact_form_con}>
          <div className={style.contact_form}>
            <h3>{t("public.contact.form.title")}</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                {t("public.contact.form.name.label")}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t("public.contact.form.name.placeholder")}
                value={form.name}
                onChange={handleChange}
                required
                maxLength={100}
              />

              <label htmlFor="email">
                {t("public.contact.form.email.label")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("public.contact.form.email.placeholder")}
                value={form.email}
                onChange={handleChange}
                maxLength={60}
              />

              <label htmlFor="subject">
                {t("public.contact.form.subject.label")}
              </label>
              <input
                id="subject"
                type="text"
                placeholder={t("public.contact.form.subject.placeholder")}
                value={form.subject}
                onChange={handleChange}
                required
                maxLength={300}
              />

              <label htmlFor="body">
                {t("public.contact.form.message.label")}
              </label>
              <textarea
                id="body"
                placeholder={t("public.contact.form.message.placeholder")}
                value={form.body}
                onChange={handleChange}
                required
                maxLength={2000}
              />

              <button type="submit" disabled={mutation.status === "pending"}>
                {mutation.status === "pending"
                  ? t("public.contact.form.sending")
                  : t("public.contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
