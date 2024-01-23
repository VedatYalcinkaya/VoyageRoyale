import React from "react";

import { Grid, Container } from "@mui/material";
import ReservationBox from "../../components/ReservationBox/ReservationBox";
import Blog from "../../components/Blog/Blog";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <Container>
      <Grid container style={{ textAlign: "center", justifyContent: "center" }}>
        <Grid item sm={12} style={{ padding: 60, paddingLeft: 90, marginBottom:100, marginTop:100 }}>
          <ReservationBox />
        </Grid>
        <Grid item sm={12}>
          <Blog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
