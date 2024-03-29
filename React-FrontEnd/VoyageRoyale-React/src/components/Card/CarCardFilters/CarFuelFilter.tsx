import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { setFuelType } from "../../../store/slices/CarSlices/carFuelTypeSlice";
import Checkbox from "@mui/material/Checkbox";

type CarFuelFilterProps = {};

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

const CarFuelFilter = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const fuelTypes = useAppSelector((state) => state.carFuelType.data);
  const selectedFuel: string[] = useAppSelector(
    (state) => state.carFuelType.fuelType
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedFuel>) => {
    const {
      target: { value },
    } = event;
    dispatch(setFuelType(typeof value === "string" ? value.split(",") : value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="gearFilter">Fuel</InputLabel>
        <Select
          labelId="fuelFilter"
          id="fuelFilter"
          multiple
          renderValue={(selected) => selected.join(", ")}
          value={selectedFuel}
          label="Gear Type"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {fuelTypes.map((fuel) => (
            <MenuItem value={fuel.name} key={fuel.id}>
              <Checkbox checked={selectedFuel.includes(fuel.name)} />
              {fuel.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CarFuelFilter;
