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
import { deleteColor } from "../../../store/slices/deleteColorSlice";
import { getAllColor } from "../../../store/slices/CarSlices/carColorSlice";
import { postColor } from "../../../store/slices/addColorSlice";
import { updateColor } from "../../../store/slices/updateColorSlice";

export default function ColorTable() {
  const dispatch = useAppDispatch();
  const colors = useAppSelector((state) => state.carColor.data);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedColorName, setEditedColorName] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedColorToDelete, setSelectedColorToDelete] = useState<any>(null);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [updatedColorNameConfirmation, setUpdatedColorNameConfirmation] =
    useState("");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllColor());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]); 

  const handleEditClick = (index: any, name: any, code:any) => {
    setEditIndex(index);
    setEditedColorName(name);
    setEditedCode(code);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if(name === 'name') {
      setEditedColorName(value);
    } else if(name === 'code') {
      setEditedCode(value);
    }
  };

  const handleSaveClick = async (color: any) => {
    try {
      const updatedColor = { ...color, name: editedColorName };
      await dispatch(updateColor(updatedColor));
      await dispatch(getAllColor());
      setEditIndex(-1);
      setEditedColorName("");
      setEditedCode("");
      setIsUpdateConfirmationOpen(false);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleAddRowClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleDeleteClick = async (color: any) => {
    setSelectedColorToDelete(color);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteColor({ id: selectedColorToDelete.id }));
      await dispatch(getAllColor());
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting a color:", error);
    }
  };

  const handleSaveNewRecord = async () => {
    try {
      const newColor = { name: editedColorName, code:editedCode };
      await dispatch(postColor(newColor));
      await dispatch(getAllColor());
      setEditedColorName("");
      setEditedCode("");
      setIsNewRecordDialogOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleUpdateConfirmation = async () => {
    const isExistingColor = colors.some(
      (item) =>
        item.name.toLowerCase() === editedColorName.toLowerCase() &&
        item.id !== colors[editIndex].id
    );

    if (isExistingColor) {
      console.error("This color name already exists");
      return;
    }

    setUpdatedColorNameConfirmation(editedColorName);
    setIsUpdateConfirmationOpen(true);
  };

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                Code
              </TableCell>
              <TableCell style={{ backgroundColor: "white", width: 200 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredColors.map((color, i) => (
              <TableRow
                key={color.id}
                style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      name="name"
                      value={editedColorName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    color.name
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      name="code"
                      value={editedCode}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    color.code
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(color)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(-1)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(i, color.name, color.code)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(color)}>
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
            {updatedColorNameConfirmation}"?
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
        <DialogTitle>Add a New Color Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new color:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Color Name"
            type="text"
            fullWidth
            name="name"
            value={editedColorName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="code"
            label="Color Code"
            type="text"
            fullWidth
            name="code"
            value={editedCode}
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
