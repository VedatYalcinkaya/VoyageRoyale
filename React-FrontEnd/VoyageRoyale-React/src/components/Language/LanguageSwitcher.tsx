import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";
import i18n from "../../language/language";

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();

  const setLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {});
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Box
        sx={{
          position: "fixed",
          top: 10,
          right: 10,
          display: "flex",
          gap: 1,
          flexDirection: "row",
        }}
      >
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#1f3f37", color: "white" }}
          onClick={() => setLanguage("en")}
        >
          {t("EN")}
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#1f3f37", color: "white" }}
          onClick={() => setLanguage("tr")}
        >
          {t("TR")}
        </Button>
      </Box>
    </div>
  );
};

export default LanguageSwitcher;
