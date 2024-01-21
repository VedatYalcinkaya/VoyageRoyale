import React, { useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { getCarCategory, setCarType } from '../../../store/slices/CarSlices/carCategorySlice';
import { Action,  ThunkDispatch } from '@reduxjs/toolkit';


type CarFilterProps = {
  
};

const CarFilter = () => {
  const dispatch : ThunkDispatch<any, any, Action> = useAppDispatch();
  const carTypes = useAppSelector(state => state.carType.data)


  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setCarType(event.target.value as string));
    
  };

 
  return (
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="carType">Car Type</InputLabel>
        <Select
          labelId="carType"
          id="carType"
          value="carType"
          label="Car Type"
          onChange={handleChange}
        >
        {carTypes.map((type) =>  <MenuItem value={type.name} key={type.id}>{type.name}</MenuItem> )}
        

        </Select>
      </FormControl>
    </Box>
  );
};

export default CarFilter;
