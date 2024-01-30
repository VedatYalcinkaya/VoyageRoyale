import React from "react";

import { Grid, Container, Link, Typography } from "@mui/material";
import ReservationBox from "../../components/ReservationBox/ReservationBox";
import Faq from "../../components/HomePageComponents/Faq";
import AppShowReel from "../../components/HomePageComponents/AppShowReel";
import CarCarousel from "../../components/HomePageComponents/CarCarousel";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography
        sx={{
          mt: 2,
          color: "#0F4037",
          fontSize: 25,
          fontWeight: "bold",
          textAlign:"center",
          paddingLeft:10,
          paddingRight:10
        }}
      >
        Experience Timeless Luxury, Where Every Moment Becomes an Elegantly
        Crafted Memory.
      </Typography>
      <img
        src={"https://i.ibb.co/FnLm0Hb/abc-hero-cars-slider31.png"}
        alt="Custom"
        style={{ width: "70%" }}
      />
      <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
        <ReservationBox />
      </Grid>
      <Grid item xs={12} sx={{ mt: 10, mb: 10 }}>
        <CarCarousel />
      </Grid>
      <Grid item xs={12} sx={{ mt: 10, mb: 10 }}>
        <AppShowReel />
      </Grid>
      <Grid item textAlign={"center"} xs={12} sx={{ mt: 10, mb: 10 }}>
        <Link
          href={"https://www.youtube.com/shorts/M7QUm_iDNsI"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"https://i.imgur.com/aAt7WWn.png"}
            alt="Custom"
            style={{ width: "100%",  }}
          />
        </Link>
      </Grid>
      <Grid item xs={12} sx={{ mt: 10, mb: 10 }}>
        <Faq />
      </Grid>
    </Grid>
  );
};

export default Homepage;
