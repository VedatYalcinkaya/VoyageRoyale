import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/configureStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { deleteRental } from "../../../store/slices/deleteRentalSlice";
import { useEffect } from "react";
import { GetAllRentalResponse } from "../../../models/RentalModel/responses/getAllRentalResponse";
import { getRentals } from "../../../store/slices/getRentalSlice";

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
  const rentals = useAppSelector((state: RootState) => state.getRentals.data);

  useEffect(() => {}, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Return Date</StyledTableCell>
            <StyledTableCell>Start Kilometer</StyledTableCell>
            <StyledTableCell>End Kilometer</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals.map((rental: GetAllRentalResponse, i: number) => (
            <StyledTableRow key={rental.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{rental.startDate}</StyledTableCell>
              <StyledTableCell>{rental.endDate}</StyledTableCell>
              <StyledTableCell>{rental.returnDate}</StyledTableCell>
              <StyledTableCell>{rental.startKilometer}</StyledTableCell>
              <StyledTableCell>{rental.endKilometer}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={async () => {
                    await dispatch(deleteRental({ id: rental.id }));
                    dispatch(getRentals());
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
