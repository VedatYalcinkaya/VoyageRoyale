import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, styled } from '@mui/material';
import AdminCarCard from './AdminCarCard';
import AddCar from './AddCar';
import AddCarDialog from './Dialogs/AddCarDialog';
import AddCarModelSlice from '../../../store/slices/addCarModelSlice';


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

  const handleAddNewRecordClick = () => {
    setIsNewRecordDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsNewRecordDialogOpen(false);
  };

  return (
    <>
      <AdminCarCard onAddNewRecordClick={handleAddNewRecordClick} />
      <Dialog open={isNewRecordDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth={true} >
        <DialogTitle>Add New Car Record</DialogTitle>
        <DialogContent>
          <AddCarDialog/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarDashboard;
