import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/configureStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { deleteRental } from "../../../store/slices/deleteRentalSlice";
import { useEffect } from "react";
import { getCustomRentals } from "../../../store/slices/getCustomRentalSlice";
import { GetCustomRentalResponse } from "../../../models/RentalModel/responses/getCustomRentalResponse";
import toastr from "toastr";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RentalTable() {
  const dispatch = useAppDispatch();
  const rentals = useAppSelector((state) => state.getCustomRentals.data);

  useEffect(() => {
    dispatch(getCustomRentals());
  }, []);
  console.log(rentals);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Num</StyledTableCell>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell>Rental ID</StyledTableCell>
            <StyledTableCell>Car Plate</StyledTableCell>
            <StyledTableCell>Daily Price</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals?.map((rental: GetCustomRentalResponse, i: number) => (
            <StyledTableRow key={rental.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{rental.userEmail}</StyledTableCell>
              <StyledTableCell>{rental.id}</StyledTableCell>
              <StyledTableCell>{rental.carPlate}</StyledTableCell>
              <StyledTableCell>{rental.carDailyPrice}</StyledTableCell>
              <StyledTableCell>{rental.startDate}</StyledTableCell>
              <StyledTableCell>{rental.endDate}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={async () => {
                    try {
                      await dispatch(deleteRental(rental.id));
                      await dispatch(getCustomRentals());
                      toastr.error("Rental Deleted");
                    } catch (error:any) {
                      error.message;
                    }
                    
                  }}
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
