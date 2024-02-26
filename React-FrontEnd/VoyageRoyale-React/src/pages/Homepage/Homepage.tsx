import React from "react";
import { Grid, Container, Link, Typography } from "@mui/material";
import ReservationBox from "../../components/ReservationBox/ReservationBox";
import Faq from "../../components/HomePageComponents/Faq";
import AppShowReel from "../../components/HomePageComponents/AppShowReel";
import CarCarousel from "../../components/HomePageComponents/CarCarousel";
import { useTranslation } from "react-i18next";

type Props = {};

const Homepage = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" marginTop={5}>
        <Typography variant="h4" textAlign="center" sx={{  mb: 2 }}>
          {t("experienceLuxury")}
        </Typography>
        <img
          src={"https://i.ibb.co/GxQdWtn/Home-Cars.png"}
          alt="Custom"
          style={{ width: "90%" }}
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
              src={"https://i.ibb.co/zJFCJm7/Download-app-2.png"}
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
