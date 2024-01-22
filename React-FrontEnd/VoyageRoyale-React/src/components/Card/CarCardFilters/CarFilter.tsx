import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { setCarType } from '../../../store/slices/CarSlices/carCategorySlice';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

type CarFilterProps = {};

const CarFilter = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const carTypes = useAppSelector((state) => state.carType.data);
  const selectedCarType = useAppSelector((state) => state.carType.carType);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue= event.target.value as string
    selectedValue==='all'? dispatch(setCarType('')):dispatch(setCarType(selectedValue));
   
    
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
