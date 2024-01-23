import React from "react";

import { Grid, Container, Link, Typography } from "@mui/material";
import ReservationBox from "../../components/ReservationBox/ReservationBox";
import Blog from "../../components/Blog/Blog";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <Container>
      <Grid container style={{ textAlign: "center", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ mt: 2, color: "#0F4037" }}>
        Experience Timeless Luxury, Where Every Moment Becomes an Elegantly Crafted Memory.
        </Typography>
        <img
          src={"https://i.ibb.co/FnLm0Hb/abc-hero-cars-slider31.png"}
          alt="Custom"
          style={{ width: "80%" }}
        />
        <Grid
          item
          sm={12}
          style={{
            padding: 60,
            paddingLeft: 90,
            marginBottom: 100,
          }}
        >
          <ReservationBox />
        </Grid>
        <Grid item sm={12}>
          <Link
            href={"https://www.youtube.com/shorts/M7QUm_iDNsI"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"https://i.ibb.co/hH3LwHm/Download-app.jpg"}
              alt="Custom"
              style={{ width: "100%" }}
            />
          </Link>
          <Blog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
