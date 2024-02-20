import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, styled } from '@mui/material';
import AdminCarCard from './AdminCarCard';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';


const CarDashboard = () => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleAddNewRecordClick = () => {
    setIsNewRecordDialogOpen(true);
  };
  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleNewRecordCloseDialog = () => {
    setIsNewRecordDialogOpen(false);
  };

  const handleUpdateCloseDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <>
      <AdminCarCard onAddNewRecordClick={handleAddNewRecordClick} onUpdateClick={handleUpdateClick} />
      <Dialog open={isNewRecordDialogOpen} onClose={handleNewRecordCloseDialog} maxWidth="md" fullWidth={true} >
        <DialogTitle>Add a New Record</DialogTitle>
        <DialogContent>
          <AddCar/>
        </DialogContent>
      </Dialog>
      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateCloseDialog} maxWidth="md" fullWidth={true} >
        <DialogTitle>Update a Record</DialogTitle>
        <DialogContent>
          <UpdateCar />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarDashboard;