import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { setGearType } from '../../../store/slices/CarSlices/carGearTypeSlice';




const CarGearFilter = () => {
    const dispatch: ThunkDispatch<any,any,Action> = useAppDispatch();
    const gears = useAppSelector(state => state.carGearType.data)

    const handleChange = (event:SelectChangeEvent) => {
        dispatch(setGearType(event.target.value as string));
    }


  return (
      <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="gearFilter">Gear Type</InputLabel>
        <Select
          labelId="gearFilter"
          id="gearFilter"
          value="gear"
          label="Gear Type"
          onChange={handleChange}
        >
        
        {gears.map((gear)=> <MenuItem value={gear.name} key={gear.id}>{gear.name}</MenuItem>)}

        </Select>
      </FormControl>
    </Box>
  )
}

export default CarGearFilter;