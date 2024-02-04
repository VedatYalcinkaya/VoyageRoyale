import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { deleteCar } from '../../../store/slices/deleteCarSlice';
import { getAllCar } from '../../../store/slices/CarSlices/getAllCarSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CarsTable() {
    const dispatch = useAppDispatch();
    const cars = useAppSelector(state => state.getAllCar.data);

  useEffect(()=>{
  
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>

            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Plate</StyledTableCell>
            <StyledTableCell>Brand Name</StyledTableCell>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell>Gear</StyledTableCell>
            <StyledTableCell>Fuel</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Year</StyledTableCell>
            
        </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car,i) => (
            <StyledTableRow key={car.id}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>

              <StyledTableCell >{car.plate}</StyledTableCell>
              <StyledTableCell >{car.brandName}</StyledTableCell>
              <StyledTableCell >{car.colorName}</StyledTableCell>
              <StyledTableCell >{car.gearTypeName}</StyledTableCell>
              <StyledTableCell >{car.fuelTypeName}</StyledTableCell>
              <StyledTableCell >{car.dailyPrice}</StyledTableCell>
              <StyledTableCell >{car.year}</StyledTableCell>


              <StyledTableCell align='right'><Button onClick={
                async()=>{await dispatch(deleteCar(car.id)); 
                dispatch(getAllCar())}}><DeleteIcon/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
