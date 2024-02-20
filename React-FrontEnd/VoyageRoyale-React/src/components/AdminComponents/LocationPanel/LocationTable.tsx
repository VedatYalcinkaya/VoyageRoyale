import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { deleteLocation } from "../../../store/slices/LocationSlices/deleteLocationSlice";
import { useEffect } from "react";
import { getCarLocations } from "../../../store/slices/CarSlices/carLocationSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f4037",
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

export default function LocationTable() {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.carLocation.data);

  useEffect(() => {
    dispatch(getCarLocations());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Latitude</StyledTableCell>
            <StyledTableCell>Longitude</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location, i) => (
            <StyledTableRow key={location.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{location.latitude}</StyledTableCell>
              <StyledTableCell>{location.longitude}</StyledTableCell>
              <StyledTableCell>{location.city}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={async () => {
                    await dispatch(deleteLocation(location));
                    dispatch(getCarLocations());
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
