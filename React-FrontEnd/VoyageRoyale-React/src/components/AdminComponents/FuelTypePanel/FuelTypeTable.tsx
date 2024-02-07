import React, { useEffect, useState } from "react";
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
import { deleteFuelType } from "../../../store/slices/deleteFuelTypeSlice";
import { getCarFuelType } from "../../../store/slices/CarSlices/carFuelTypeSlice";
import { postFuelType } from "../../../store/slices/addFuelTypeSlice";
import { updateFuelType } from "../../../store/slices/updateFuelTypeSlice";


export default function FuelTypeTable() {

  const dispatch = useAppDispatch();
  const fuelTypes = useAppSelector((state) => state.carFuelType.data);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedFuelTypeName, setEditedFuelTypeName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedFuelTypeToDelete, setSelectedFuelTypeToDelete] =
    useState<any>(null);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [updatedFuelTypeNameConfirmation, setUpdatedFuelTypeNameConfirmation] =
    useState("");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCarFuelType());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]); 


  const handleEditClick = (index: any, name: any) => {
    setEditIndex(index);
    setEditedFuelTypeName(name);
  };

  const handleInputChange = (e: any) => {
    setEditedFuelTypeName(e.target.value);
  };

  const handleSaveClick = async (fuelType: any) => {
    const updatedFuelType = { ...fuelType, name: editedFuelTypeName };

    const isExistingFuelType = fuelTypes.some(
      (item) =>
        item.name.toLowerCase() === editedFuelTypeName.toLowerCase() &&
        item.id !== fuelType.id
    );

    if (isExistingFuelType) {
      console.error("This fuel type already exists");
      return;
    }

    setUpdatedFuelTypeNameConfirmation(editedFuelTypeName);
    setIsUpdateConfirmationOpen(true);
  };

  const handleAddRowClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleDeleteClick = async (fuelType: any) => {
    setSelectedFuelTypeToDelete(fuelType);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteFuelType({ id: selectedFuelTypeToDelete.id }));
      await dispatch(getCarFuelType());
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting fuel type:", error);
    }
  };

  const handleSaveNewRecord = async () => {
    try {
      const newFuelType = { name: editedFuelTypeName };
      await dispatch(postFuelType(newFuelType));
      await dispatch(getCarFuelType());
      setEditedFuelTypeName("");
      setIsNewRecordDialogOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleUpdateConfirmation = async () => {
    try {
      const updatedFuelType = {
        ...fuelTypes[editIndex],
        name: editedFuelTypeName,
      };
      await dispatch(updateFuelType(updatedFuelType));
      await dispatch(getCarFuelType());
      setEditIndex(-1);
      setEditedFuelTypeName("");
      setIsUpdateConfirmationOpen(false);
    } catch (error) {
      console.error("Error updating fuel type:", error);
    }
  };

  const filteredFuelTypes = fuelTypes.filter((fuelType) =>
    fuelType.name?.toLowerCase() === editedFuelTypeName.toLowerCase()

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
            {filteredFuelTypes.map((fuelType, i) => (
              <TableRow
                key={fuelType.id}
                style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      value={editedFuelTypeName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    fuelType.name
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(fuelType)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(-1)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(i, fuelType.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(fuelType)}>
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
            {updatedFuelTypeNameConfirmation}"?
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
        <DialogTitle>Add a New Fuel Type Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new fuel type:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fuel Type Name"
            type="text"
            fullWidth
            value={editedFuelTypeName}
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
