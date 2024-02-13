import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { setGearType } from '../../../store/slices/CarSlices/carGearTypeSlice';

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



const CarGearFilter = () => {
    const dispatch: ThunkDispatch<any,any,Action> = useAppDispatch();
    const gears = useAppSelector(state => state.carGearType.data);
    const selectedGear:string[] = useAppSelector(state => state.carGearType.gearType);

    const handleChange = (event: SelectChangeEvent<typeof selectedGear>) => {
      const {
        target: { value },
      } = event;
      dispatch(setGearType( typeof value === 'string' ? value.split(',') : value,));
    };


  return (
      <Box sx={{ minWidth: 120}}>
    <FormControl fullWidth>
      <InputLabel id="gearFilter">Gear Type</InputLabel>
      <Select
        labelId="gearFilter"
        id="gearFilter"
        multiple
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        value={selectedGear}
        label="Brand Type"
        onChange={handleChange}
        MenuProps={MenuProps}
      >
      {gears.map((gear)=> <MenuItem value={gear.name} key={gear.id}>{gear.name}</MenuItem>)}
      </Select>
    </FormControl>
    </Box>
  )
}

export default CarGearFilter;