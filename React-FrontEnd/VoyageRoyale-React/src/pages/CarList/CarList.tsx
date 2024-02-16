import React, { useEffect } from "react";
import CarCard from "../../components/Card/CarCard";
import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import CarFilter from "../../components/Card/CarCardFilters/CarFilter";
import CarFuelFilter from "../../components/Card/CarCardFilters/CarFuelFilter";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { Action } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCarList } from "../../store/slices/CarSlices/carListSlice";
import { getCarFuelType } from "../../store/slices/CarSlices/carFuelTypeSlice";
import CarBrandFilter from "../../components/Card/CarCardFilters/CarBrandFilter";
import { getCarBrandType } from "../../store/slices/CarSlices/carBrandTypeSlice";
import { getCarGearType } from "../../store/slices/CarSlices/carGearTypeSlice";
import CarGearFilter from "../../components/Card/CarCardFilters/CarGearFilter";
import { getCarCarType } from "../../store/slices/CarSlices/carCarTypeSlice";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { format } from "date-fns";
import SelectedReservationDetails from "../../components/Card/SelectedReservationDetails";
import "./CarAnimation.css";
import CarIcon from "./carIcon";
import LinearDeterminate from "./LinearDeterminate";
type Props = {};

const CarList = (props: Props) => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const selectedPickupDate = useAppSelector(
    (state) => state.reservation.pickUpDate
  );
  const pickup: string | null = selectedPickupDate?.substring(0, 10) ?? null;
  let pickUpDate: string | null = pickup;
  let formattedPickupDate: string | null = null;

  if (pickUpDate) {
    formattedPickupDate = format(new Date(pickUpDate), "MMMM do, yyyy");
  }

  const selectedCity = useAppSelector((state) => state.reservation.city);
  const city: string | null = selectedCity ?? null;

  const selectedReturnDate = useAppSelector(
    (state) => state.reservation.returnDate
  );
  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;

    let dropOffDate: string | null = returnDate;
    let formattedDropOffDate: string | null = null;
  
    if (dropOffDate) {
      formattedDropOffDate = format(new Date(dropOffDate), "MMMM do, yyyy");
    }

  const selectedPosition = useAppSelector(
    (state) => state.reservation.position?.id
  );
  const loading = useAppSelector(state => state.loading.requestCount);
 

  useEffect(() => {
    dispatch(getCarCarType());
    dispatch(
      getCarList({
        pickupDate: pickup,
        returnDate: returnDate,
        positionId: selectedPosition,
        city: city,
      })
    );
    dispatch(getCarFuelType());
    dispatch(getCarBrandType());
    dispatch(getCarGearType());
  }, []);
  console.log(loading)

  
  if (loading>0) {
    return(
      <Box     sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <LinearDeterminate/>
    </Box>
    )
  }else {
    return (
      <Grid container spacing={2}>
        <SelectedReservationDetails/>
        <Grid item xs={12} md={3} lg={3} sx={{mt:-4}}>
          <Stack spacing={1} mt={2} padding={3}>
            <Typography fontWeight="bold" textAlign={"center"}>Filter</Typography>
            <CarFuelFilter />
            <CarFilter />
            <CarBrandFilter />
            <CarGearFilter />
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={9} lg={9}>
          <CarCard />
        </Grid>
      </Grid>
    );
  }
};

export default CarList;
