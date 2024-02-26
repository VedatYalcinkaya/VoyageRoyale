import React from "react";
import { useTranslation } from "react-i18next";
import { Button,Grid } from "@mui/material";
import i18n from "../../language/language";

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();

  const setLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {});
  };

  return (
    <>
        <Button
        style={{
         
          color: i18n.language === "en" ? "#BC9160": "#051915",
        }}
        onClick={() => setLanguage("en")}
      >
        {t("EN")}
      </Button>
      <Button
        style={{
        
          color: i18n.language === "tr" ? "#BC9160": "#051915",
        }}
        onClick={() => setLanguage("tr")}
      >
        {t("TR")}
      </Button>

    </>
  );
};

export default LanguageSwitcher;
