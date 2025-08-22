import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface DateProps {
  date: Date;
}

const DateConverter: React.FC<DateProps> = ({ date }) => {
  const [display, setDisplay] = useState("");
  const { t } = useTranslation();
  const updateDisplay = () => {
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 1) {
      setDisplay(t("date.now"));
    } else if (diffInMinutes < 60) {
      setDisplay(`${Math.floor(diffInMinutes)}  ${t("date.min")}`);
    } else if (diffInMinutes < 1440) {
      setDisplay(format(date, `'${t("date.today")}'   HH:mm`, { locale: ar }));
    } else if (diffInMinutes < 2880) {
      setDisplay(
        format(date, `'${t("date.yesterDay")}' HH:mm`, { locale: ar })
      );
    } else {
      setDisplay(
        format(date, `d MMMM yyyy '${t("date.at")}' HH:mm`, { locale: ar })
      );
    }
  };

  // Update every minute
  useEffect(() => {
    updateDisplay();
    const interval = setInterval(updateDisplay, 60000);
    return () => clearInterval(interval);
  }, [date]);

  return <span>{display}</span>;
};

export default DateConverter;
