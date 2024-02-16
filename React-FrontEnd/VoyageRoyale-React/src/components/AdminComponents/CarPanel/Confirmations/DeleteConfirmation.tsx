import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteBrand } from "../../../../store/slices/deleteBrandSlice";
import { getAllCar } from "../../../../store/slices/CarSlices/getAllCarSlice";
import { useAppDispatch } from "../../../../store/configureStore";

function DeleteConfirmation({
  handleDeleteClick,
}: {
  handleDeleteClick: (car: any) => void;
}) {
  const dispatch = useAppDispatch();
  const [selectedBrandToDelete, setSelectedBrandToDelete] = useState<any>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteBrand({ id: selectedBrandToDelete.id }));
      await dispatch(getAllCar());
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default DeleteConfirmation;
