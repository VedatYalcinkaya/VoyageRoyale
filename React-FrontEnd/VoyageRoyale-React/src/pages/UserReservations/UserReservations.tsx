import React from "react";
import ReservationsCard from "../../components/Card/ReservationsCard";
import { Grid, Typography } from "@mui/material";

type Props = {};

const UserReservations = (props: Props) => {
  return (
    <>
      <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">
          My Reservations
        </Typography>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
        <ReservationsCard />
        </Grid>
      </Grid>
    </>
  );
};

export default UserReservations;
