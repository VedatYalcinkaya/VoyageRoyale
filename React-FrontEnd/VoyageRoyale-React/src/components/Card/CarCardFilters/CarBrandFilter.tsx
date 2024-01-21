import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { Action,  ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { setBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';



const CarBrandFilter = () => {
    const dispatch : ThunkDispatch<any, any, Action> = useAppDispatch();
    const brands = useAppSelector(state => state.carBrandType.data)


  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setBrandType(event.target.value as string));
    
  };

 
  return (
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="brandFilter">Brand Type</InputLabel>
        <Select
          labelId="brandFilter"
          id="brandFilter"
          value="brand"
          label="Brand Type"
          onChange={handleChange}
        >
        
        {brands.map((brand)=> <MenuItem value={brand.name} key={brand.id}>{brand.name}</MenuItem>)}

        </Select>
      </FormControl>
    </Box>
  );
};

export default CarBrandFilter;