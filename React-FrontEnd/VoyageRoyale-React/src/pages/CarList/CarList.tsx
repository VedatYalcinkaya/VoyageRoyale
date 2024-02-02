import React, { useEffect } from 'react';
import CarCard from '../../components/Card/CarCard';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import CarFilter from '../../components/Card/CarCardFilters/CarFilter';
import CarFuelFilter from '../../components/Card/CarCardFilters/CarFuelFilter';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getCarCategory } from '../../store/slices/CarSlices/carCategorySlice';
import { getCarList } from '../../store/slices/CarSlices/carListSlice';
import { getCarFuelType } from '../../store/slices/CarSlices/carFuelTypeSlice';
import CarBrandFilter from '../../components/Card/CarCardFilters/CarBrandFilter';
import { getCarBrandType } from '../../store/slices/CarSlices/carBrandTypeSlice';
import { getCarGearType } from '../../store/slices/CarSlices/carGearTypeSlice';
import CarGearFilter from '../../components/Card/CarCardFilters/CarGearFilter';

type Props = {};

const CarList = (props: Props) => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const selectedPickupDate= useAppSelector(state => state.reservation.pickUpDate)
  const pickup:string | null = selectedPickupDate?.substring(0,10) ?? null;
  const selectedReturnDate=useAppSelector(state => state.reservation.returnDate)
  const returnDate:string|null = selectedReturnDate?.substring(0,10) ?? null;
  const selectedPosition = useAppSelector(state => state.reservation.position?.id);
  const loading = useAppSelector(state => state.loading.requestCount);
  

  useEffect(() => {
    dispatch(getCarCategory());
    dispatch(getCarList({pickupDate:pickup,returnDate:returnDate,positionId:selectedPosition}));
    dispatch(getCarFuelType());
    dispatch(getCarBrandType());
    dispatch(getCarGearType());
 
  }, []);

  if (loading>0) {
    return(
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }else{

      return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} lg={3}>
        <Stack spacing={2} mt={2}>
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
