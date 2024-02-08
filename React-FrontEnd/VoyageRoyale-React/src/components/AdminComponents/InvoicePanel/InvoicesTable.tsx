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
import { useEffect } from "react";
import { getAllInvoice } from "../../../store/slices/getAllInvoiceSlice";
import { deleteInvoice } from "../../../store/slices/deleteInvoiceSlice";

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

export default function InvoicesTable() {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector((state) => state.getAllInvoice.data);

  useEffect(() => {
    dispatch(getAllInvoice());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 12 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Invoice Number</StyledTableCell>
            <StyledTableCell>Total Price</StyledTableCell>
            <StyledTableCell>Tax Rate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices?.map((invoice, i) => (
            <StyledTableRow key={invoice.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{invoice.invoiceNo}</StyledTableCell>
              <StyledTableCell>{invoice.totalPrice}</StyledTableCell>
              <StyledTableCell>{invoice.taxRate}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={async () => {
                    await dispatch(deleteInvoice(invoice.id));
                    dispatch(getAllInvoice());
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
