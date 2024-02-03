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
import { deleteModel } from '../../../store/slices/deleteModelSlice';

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


export default function BrandsTable() {
    const dispatch = useAppDispatch();
    const models = useAppSelector(state => state.carModel.data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Model Name</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model,i) => (
            <StyledTableRow key={model.id}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell >{model.name}</StyledTableCell>
              <StyledTableCell align='right'><Button onClick={()=>{dispatch(deleteModel(model.brandId))}}><DeleteIcon/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
