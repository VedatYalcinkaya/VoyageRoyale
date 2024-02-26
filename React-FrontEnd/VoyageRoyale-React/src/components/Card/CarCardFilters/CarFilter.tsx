import React from 'react';
import { Box, Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setCarCarType } from '../../../store/slices/CarSlices/carCarTypeSlice';

type CarFilterProps = {};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const CarFilter = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const carTypes = useAppSelector((state) => state.carCarType.data);
  const selectedCarType: string[] = useAppSelector((state) => state.carCarType.carType);

  const handleChange = (event: SelectChangeEvent<typeof selectedCarType>) => {
    const {
      target: { value },
    } = event;
    dispatch(setCarCarType( typeof value === 'string' ? value.split(',') : value,));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="carFilter">Car Type</InputLabel>
      <Select
        labelId="carFilter"
        id="carFilter"
        multiple
        renderValue={(selected) => selected.join(', ')}
        value={selectedCarType}
        label="Car Type"
        onChange={handleChange}
        MenuProps={MenuProps}
      >
      {carTypes.map((carType)=>
      <MenuItem value={carType.name} key={carType.id}>
      <Checkbox checked={selectedCarType.includes(carType.name)} />
        {carType.name}
        </MenuItem>)}
      </Select>
    </FormControl>
    </Box>
  );
};

export default CarFilter;
