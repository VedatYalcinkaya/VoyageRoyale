import React, { useEffect } from "react";
import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { Action } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { format } from "date-fns";
import Cookies from 'js-cookie';


type Props = {};

const SelectedReservationDetails = (props: Props) => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const selectedPickupDate = Cookies.get('selectedPickUpDate');
  const selectedReturnDate = Cookies.get('selectedReturnDate');
  const selectedCity = Cookies.get('selectedCity');
  const pickup: string | null = selectedPickupDate?.substring(0, 10) ?? null;
  let pickUpDate: string | null = pickup;
  let formattedPickupDate: string | null = null;

  if (pickUpDate) {
    formattedPickupDate = format(new Date(pickUpDate), "MMMM do, yyyy");
  }

  const city: string | null = selectedCity ?? null;


  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;

    let dropOffDate: string | null = returnDate;
    let formattedDropOffDate: string | null = null;
  
    if (dropOffDate) {
      formattedDropOffDate = format(new Date(dropOffDate), "MMMM do, yyyy");
    }

  const loading = useAppSelector((state) => state.loading.requestCount);
  

  if (loading > 0) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
     <>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ backgroundColor: "#0F4037", padding: 2 }}
        >
          <Grid item>
            <LocationOnOutlinedIcon
              sx={{ color: "#D4D2A9", fontSize: 15, mr: 2 }}
            ></LocationOnOutlinedIcon>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#BC9160",
                mr: 10,
                mt: -0.3,
              }}
            >
              {city}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{fontWeight: "bold", fontSize: 16, color: "#D4D2A9", mr:2 }}>
              Pick-up Date:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, color: "#BC9160",mr:5 }}>
              {formattedPickupDate}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{fontWeight: "bold", fontSize: 16, color: "#D4D2A9", mr:2 }}>
              Drop-off Date:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, color: "#BC9160" }}>
              {formattedDropOffDate}
            </Typography>
          </Grid>
        </Grid>

        </>
    );
  }
};

export default SelectedReservationDetails;
