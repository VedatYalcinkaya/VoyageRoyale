import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { setBrandType } from "../../../store/slices/CarSlices/carBrandTypeSlice";

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

const CarBrandFilter = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  const brands = useAppSelector((state) => state.carBrandType.data);
  const selectedBrand: string[] = useAppSelector(
    (state) => state.carBrandType.brandType
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedBrand>) => {
    const {
      target: { value },
    } = event;
    const selectedBrand = event.target.value as string;
    dispatch(
      setBrandType(typeof value === "string" ? value.split(",") : value)
    );
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="brandFilter">Brand</InputLabel>
        <Select
          labelId="brandFilter"
          id="brandFilter"
          multiple
          renderValue={(selected) => selected.join(", ")}
          value={selectedBrand}
          label="Brand"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {brands.map((brand) => (
            <MenuItem value={brand.name} key={brand.id}>
              <Checkbox checked={selectedBrand.includes(brand.name)} />
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CarBrandFilter;
