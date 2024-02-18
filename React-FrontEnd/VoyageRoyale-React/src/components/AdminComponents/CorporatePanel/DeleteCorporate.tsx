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
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllCorporate } from "../../../store/slices/CorporateCustomerSlice/getAllCorporateSlice";
import { GetAllCorporateResponse } from "../../../models/CorporateCustomerModel/responses/getAllCorporateResponse";
import { deleteCorporate } from "../../../store/slices/CorporateCustomerSlice/deleteCorporateSlice";

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

export default function DeleteCorporate() {
  const dispatch = useAppDispatch();
  const corporates = useAppSelector(state => state.getAllCorporate.data)

  useEffect(() => {
    dispatch(getAllCorporate());
  }, []);
  console.log(corporates);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tax Number</StyledTableCell>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {corporates?.map((corporate: GetAllCorporateResponse, i: number) => (
            <StyledTableRow key={corporate.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{corporate.taxNo}</StyledTableCell>
              <StyledTableCell>{corporate.companyName}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  onClick={async () => {
                    try {
                     await dispatch(deleteCorporate(corporate.id));
                      await dispatch(getAllCorporate());
                      toast.error("Corporate Deleted");
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
