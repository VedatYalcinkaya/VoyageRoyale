import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setCarCarType } from '../../../store/slices/CarSlices/carCarTypeSlice';

type CarFilterProps = {};

const CarFilter = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const carTypes = useAppSelector((state) => state.carCarType.data);
  const selectedCarType = useAppSelector((state) => state.carCarType.carType);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue= event.target.value as string
    selectedValue==='all'? dispatch(setCarCarType('')):dispatch(setCarCarType(selectedValue));
   
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="carType">Car Type</InputLabel>
        <Select
          labelId="carType"
          id="carType"
          value={selectedCarType} 
          label="Car Type"
          onChange={handleChange}
        >

          <MenuItem value="all">All Car Types</MenuItem>
          {carTypes.map((type) => (
            <MenuItem value={type.name} key={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CarFilter;
