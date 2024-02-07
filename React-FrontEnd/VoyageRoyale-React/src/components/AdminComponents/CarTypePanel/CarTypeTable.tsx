import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { deleteCarType } from "../../../store/slices/deleteCarTypeSlice";
import { getCarCarType } from "../../../store/slices/CarSlices/carCarTypeSlice";
import { postCarType } from "../../../store/slices/addCarTypeSlice";
import { updateCarType } from "../../../store/slices/updateCarTypeSlice";

export default function CarTypeTable() {
  const dispatch = useAppDispatch();
  const carTypes = useAppSelector((state) => state.carCarType.data);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedCarTypeName, setEditedCarTypeName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedCarTypeToDelete, setSelectedCarTypeToDelete] = useState<any>(null);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [updatedCarTypeNameConfirmation, setUpdatedCarTypeNameConfirmation] =
    useState("");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

  const handleEditClick = (index: any, name: any) => {
    setEditIndex(index);
    setEditedCarTypeName(name);
  };

  const handleInputChange = (e: any) => {
    setEditedCarTypeName(e.target.value);
  };

  const handleSaveClick = async (carType: any) => {
    const updatedCarType = { ...carType, name: editedCarTypeName };

    const isExistingCarType = carTypes.some(
      (item) =>
        item.name.toLowerCase() === editedCarTypeName.toLowerCase() &&
        item.id !== carType.id
    );

    if (isExistingCarType) {
      console.error("This car type already exists");
      return;
    }

    setUpdatedCarTypeNameConfirmation(editedCarTypeName);
    setIsUpdateConfirmationOpen(true);
  };

  const handleAddRowClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleDeleteClick = async (carType: any) => {
    setSelectedCarTypeToDelete(carType);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteCarType({ id: selectedCarTypeToDelete.id }));
      await dispatch(getCarCarType());
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting car type:", error);
    }
  };

  const handleSaveNewRecord = async () => {
    try {
      const newCarType = { name: editedCarTypeName };
      await dispatch(postCarType(newCarType));
      await dispatch(getCarCarType());
      setEditedCarTypeName("");
      setIsNewRecordDialogOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleUpdateConfirmation = async () => {
    try {
      const updatedCarType = { ...carTypes[editIndex], name: editedCarTypeName };
      await dispatch(updateCarType(updatedCarType));
      await dispatch(getCarCarType());
      setEditIndex(-1);
      setEditedCarTypeName("");
      setIsUpdateConfirmationOpen(false);
    } catch (error) {
      console.error("Error updating car type:", error);
    }
  };

  const filteredCarTypes = carTypes.filter((carType) =>
    carType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Button
        onClick={handleAddRowClick}
        variant="contained"
        color="primary"
        sx={{
          mb: 2,
          fontSize: 12,
          color: "#d4d2a9",
          backgroundColor: "#0F4037",
          "&:hover": {
            backgroundColor: "#B58B5D",
            color: "#0f4037",
          },
        }}
      >
        Add a New Record
      </Button>
      <TextField
        label="Quick Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} style={{ maxHeight: 450 }}>
        <Table aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "white", width: 50 }}>
                ID
              </TableCell>
              <TableCell style={{ backgroundColor: "white", width: 200 }}>
                Name
              </TableCell>
              <TableCell style={{ backgroundColor: "white", width: 200 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCarTypes.map((carType, i) => (
              <TableRow
                key={carType.id}
                style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      value={editedCarTypeName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    carType.name
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(carType)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(-1)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(i, carType.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(carType)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteConfirmationOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isUpdateConfirmationOpen}
        onClose={() => setIsUpdateConfirmationOpen(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update the name to "
            {updatedCarTypeNameConfirmation}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsUpdateConfirmationOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateConfirmation} color="primary" autoFocus>
            Yes, update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isNewRecordDialogOpen}
        onClose={() => setIsNewRecordDialogOpen(false)}
      >
        <DialogTitle>Add a New Car Type Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new car type:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Car Type Name"
            type="text"
            fullWidth
            value={editedCarTypeName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsNewRecordDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveNewRecord} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
