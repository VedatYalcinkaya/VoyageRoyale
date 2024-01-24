import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { Action,  ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { setBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';



const CarBrandFilter = () => {
    const dispatch : ThunkDispatch<any, any, Action> = useAppDispatch();
    const brands = useAppSelector(state => state.carBrandType.data)
    const selectedBrand = useAppSelector(state => state.carBrandType.brandType);


  const handleChange = (event: SelectChangeEvent) => {
    const selectedBrand = event.target.value as string;
    selectedBrand === 'all'? dispatch(setBrandType('')):dispatch(setBrandType(selectedBrand));
  };

 
  return (
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="brandFilter">Brand Type</InputLabel>
        <Select
          labelId="brandFilter"
          id="brandFilter"
          value={selectedBrand}
          label="Brand Type"
          onChange={handleChange}
        >
        <MenuItem value="all">All Brands</MenuItem>
        {brands.map((brand)=> <MenuItem value={brand.name} key={brand.id}>{brand.name}</MenuItem>)}

        </Select>
      </FormControl>
    </Box>
  );
};

export default CarBrandFilter;