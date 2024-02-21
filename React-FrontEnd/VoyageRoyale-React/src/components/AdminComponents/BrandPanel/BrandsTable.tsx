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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { updateBrand } from "../../../store/slices/updateBrandSlice";
import { getCarBrandType } from "../../../store/slices/CarSlices/carBrandTypeSlice";
import { postBrand } from "../../../store/slices/addBrandSlice";
import { deleteBrand } from "../../../store/slices/deleteBrandSlice";

export default function BrandsTable() {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.carBrandType.data);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedBrandName, setEditedBrandName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedBrandToDelete, setSelectedBrandToDelete] = useState<any>(null);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [updatedBrandNameConfirmation, setUpdatedBrandNameConfirmation] =
    useState("");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCarBrandType());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]); 

  const handleEditClick = (index: any, name: any) => {
    setEditIndex(index);
    setEditedBrandName(name);
  };

  const handleInputChange = (e: any) => {
    setEditedBrandName(e.target.value);
  };

  const handleSaveClick = async (brand: any) => {
    const updatedBrand = { ...brand, name: editedBrandName };

    const isExistingBrand = brands.some(
      (item) =>
        item.name.toLowerCase() === editedBrandName.toLowerCase() &&
        item.id !== brand.id
    );

    if (isExistingBrand) {
      console.error("This brand already exists");
      return;
    }

    setUpdatedBrandNameConfirmation(editedBrandName);
    setIsUpdateConfirmationOpen(true);
  };

  const handleAddRowClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleDeleteClick = async (brand: any) => {
    setSelectedBrandToDelete(brand);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteBrand({ id: selectedBrandToDelete.id }));
      await dispatch(getCarBrandType());
      setIsDeleteConfirmationOpen(false);
      toast.info("Record has been deleted")
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleSaveNewRecord = async () => {
    try {
      const newBrand = { name: editedBrandName };
      await dispatch(postBrand(newBrand));
      await dispatch(getCarBrandType());
      setEditedBrandName("");
      setIsNewRecordDialogOpen(false);
      toast.success("Record has been successfully added")
      
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleUpdateConfirmation = async () => {
    try {
      const updatedBrand = { ...brands[editIndex], name: editedBrandName };
      await dispatch(updateBrand(updatedBrand));
      await dispatch(getCarBrandType());
      setEditIndex(-1);
      setEditedBrandName("");
      setIsUpdateConfirmationOpen(false);
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            {filteredBrands.map((brand, i) => (
              <TableRow
                key={brand.id}
                style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <TextField
                      value={editedBrandName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    brand.name
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === i ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(brand)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(-1)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(i, brand.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(brand)}>
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
            {updatedBrandNameConfirmation}"?
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
        <DialogTitle>Add a New Brand Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new brand:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand Name"
            type="text"
            fullWidth
            value={editedBrandName}
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
