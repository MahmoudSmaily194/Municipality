import { useIsFetching } from "@tanstack/react-query";

import { useEffect } from "react";
import style from "./loader.module.css";
type props = {
  isAppLoading?: boolean;
};
const Loader = ({ isAppLoading }: props) => {
  const isFetching = useIsFetching();
  const isLoading = !isAppLoading || isFetching > 0;

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={style.loader_overlay}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
