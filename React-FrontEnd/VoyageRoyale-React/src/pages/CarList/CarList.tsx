import React, { useEffect } from 'react';
import CarCard from '../../components/Card/CarCard';
import { Box, Grid, Stack } from '@mui/material';
import CarFilter from '../../components/Card/CarCardFilters/CarFilter';
import CarFuelFilter from '../../components/Card/CarCardFilters/CarFuelFilter';
import { useAppDispatch } from '../../store/configureStore';
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

  useEffect(() => {
    dispatch(getCarCategory());
    dispatch(getCarList());
    dispatch(getCarFuelType());
    dispatch(getCarBrandType());
    dispatch(getCarGearType());
  }, []);

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
};

export default CarList;
