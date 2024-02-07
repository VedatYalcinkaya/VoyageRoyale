import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setFuelType } from '../../../store/slices/CarSlices/carFuelTypeSlice';

type CarFuelFilterProps={
}

const CarFuelFilter = () => {
  const dispatch : ThunkDispatch<any, any, Action> = useAppDispatch();
  const fuelTypes = useAppSelector(state => state.carFuelType.data);
  const selectedFuel = useAppSelector(state => state.carFuelType.fuelType);
 


  const handleChange = (event: SelectChangeEvent) => {
    const selectedFuel =event.target.value as string;
    selectedFuel=== 'all' ? dispatch(setFuelType('')) : dispatch(setFuelType(selectedFuel));
  };



  return (
    <Box sx={{ minWidth: 120}}>
    <FormControl fullWidth>
      <InputLabel id="fuelType">Fuel Type</InputLabel>
      <Select
        labelId="fuelType"
        id="fuelType"
        value={selectedFuel}
        label="Fuel Type"
        onChange={handleChange}
      >
        <MenuItem value="all">All Fuel Types</MenuItem>
        {fuelTypes.map((fuel)=><MenuItem value={fuel.name} key={fuel.id}>{fuel.name}</MenuItem>  )}

      </Select>
    </FormControl>
  </Box>
  );
};

export default CarFuelFilter;
