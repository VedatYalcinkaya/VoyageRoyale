import React from "react";
import { Grid, Container, Link, Typography } from "@mui/material";
import ReservationBox from "../../components/ReservationBox/ReservationBox";
import Faq from "../../components/HomePageComponents/Faq";
import AppShowReel from "../../components/HomePageComponents/AppShowReel";
import CarCarousel from "../../components/HomePageComponents/CarCarousel";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/Language/LanguageSwitcher";

type Props = {};

const Homepage = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
        <LanguageSwitcher />
      </div>
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h5" textAlign="center" sx={{ mt: 3, mb: 5 }}>
          {t("experienceLuxury")}
        </Typography>
        <img
          src={"https://i.ibb.co/FnLm0Hb/abc-hero-cars-slider31.png"}
          alt="Custom"
          style={{ width: "70%" }}
        />
        <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
          <ReservationBox />
        </Grid>
        <Grid item xs={12}>
          <CarCarousel />
        </Grid>
        <Grid item xs={12}>
          <AppShowReel />
        </Grid>
        <Grid item textAlign={"center"} xs={12} sx={{}}>
          <Link
            href={"https://www.youtube.com/shorts/M7QUm_iDNsI"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"https://i.imgur.com/aAt7WWn.png"}
              alt="Custom"
              style={{ width: "100%" }}
            />
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Faq />
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
