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
import toastr from "toastr";
import { getAllCustomer } from "../../../store/slices/CustomerSlices/getAllCustomersSlice";
import { GetAllCustomerResponse } from "../../../models/CustomerModel/responses/getAllCustomerResponse";
import { deleteCustomer } from "../../../store/slices/CustomerSlices/deleteCustomerSlice";

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

export default function DeleteCustomer() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(state => state.getAllCustomer.data)

  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);
  console.log(customers);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Identity Number</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Birth Date</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customer: GetAllCustomerResponse, i: number) => (
            <StyledTableRow key={customer.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{customer.tcNo}</StyledTableCell>
              <StyledTableCell>{customer.firstName}</StyledTableCell>
              <StyledTableCell>{customer.lastName}</StyledTableCell>
              <StyledTableCell>{customer.birthDate}</StyledTableCell>
              <StyledTableCell>{customer.userEmail}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  onClick={async () => {
                    try {
                     await dispatch(deleteCustomer(customer.id));
                      await dispatch(getAllCustomer());
                      toastr.error("Customer Deleted");
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
