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
import { toast } from "react-toastify";
import { getAllModel } from "../../../store/slices/CarSlices/carModelSlice";
import { GetAllModelResponse } from "../../../models/ModelModel/responses/getAllModelResponse";

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

export default function ModelTable() {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state) => state.carModel.data);

  useEffect(() => {
    dispatch(getAllModel());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Num</StyledTableCell>
            <StyledTableCell>Model Name</StyledTableCell>
            <StyledTableCell>Brand Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models?.map((model: GetAllModelResponse, i: number) => (
            <StyledTableRow key={model.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{model.name}</StyledTableCell>
              <StyledTableCell>{model.id}</StyledTableCell>
              <StyledTableCell>{model.brandId}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={async () => {
                    try {
                      await dispatch(deleteRental(model.id));
                      await dispatch(getAllModel());
                      toast.error("Model Deleted");
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
