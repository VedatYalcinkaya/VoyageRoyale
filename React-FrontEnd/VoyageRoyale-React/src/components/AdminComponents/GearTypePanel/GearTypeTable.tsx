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
import { deleteGearType } from "../../../store/slices/deleteGearTypeSlice";
import { getCarGearType } from "../../../store/slices/CarSlices/carGearTypeSlice";
import { postGearType } from "../../../store/slices/addGearTypeSlice";
import { updateGearType } from "../../../store/slices/updateGearTypeSlice";

export default function GearTypeTable() {
  const dispatch = useAppDispatch();
  const gearTypes = useAppSelector((state) => state.carGearType.data);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedGearTypeName, setEditedGearTypeName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedGearTypeToDelete, setSelectedGearTypeToDelete] =
    useState<any>(null);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [updatedGearTypeNameConfirmation, setUpdatedGearTypeNameConfirmation] =
    useState("");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

  const handleEditClick = (index: any, name: any) => {
    setEditIndex(index);
    setEditedGearTypeName(name);
  };

  const handleInputChange = (e: any) => {
    setEditedGearTypeName(e.target.value);
  };

  const handleSaveClick = async (gearType: any) => {
    const updatedGearType = { ...gearType, name: editedGearTypeName };

    const isExistingGearType = gearTypes.some(
      (item) =>
        item.name.toLowerCase() === editedGearTypeName.toLowerCase() &&
        item.id !== gearType.id
    );

    if (isExistingGearType) {
      console.error("This geartype already exists");
      return;
    }

    setUpdatedGearTypeNameConfirmation(editedGearTypeName);
    setIsUpdateConfirmationOpen(true);
  };

  const handleAddRowClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleDeleteClick = async (gearType: any) => {
    setSelectedGearTypeToDelete(gearType);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteGearType({ id: selectedGearTypeToDelete.id }));
      await dispatch(getCarGearType());
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting gear type:", error);
    }
  };

  const handleSaveNewRecord = async () => {
    try {
      const newGearType = { name: editedGearTypeName };
      await dispatch(postGearType(newGearType));
      await dispatch(getCarGearType());
      setEditedGearTypeName("");
      setIsNewRecordDialogOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleUpdateConfirmation = async () => {
    try {
      const updatedGearType = {
        ...gearTypes[editIndex],
        name: editedGearTypeName,
      };
      await dispatch(updateGearType(updatedGearType));
      await dispatch(getCarGearType());
      setEditIndex(-1);
      setEditedGearTypeName("");
      setIsUpdateConfirmationOpen(false);
    } catch (error) {
      console.error("Error updating gear type:", error);
    }
  };

  const filteredGearTypes = gearTypes.filter((gearType) =>
    gearType.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            {filteredGearTypes.map((gearType, i) => (
              <TableRow
                key={gearType.id}
                style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      value={editedGearTypeName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    gearType.name
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(gearType)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(-1)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(i, gearType.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(gearType)}>
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
            {updatedGearTypeNameConfirmation}"?
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
        <DialogTitle>Add a New Gear Type Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new gear type:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Gear Type Name"
            type="text"
            fullWidth
            value={editedGearTypeName}
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
