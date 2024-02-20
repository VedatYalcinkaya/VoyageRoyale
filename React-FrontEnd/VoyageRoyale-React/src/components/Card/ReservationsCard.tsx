import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import getCustomRentalSlice, {
  getCustomRentals,
} from "../../store/slices/getCustomRentalSlice";
import { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { deleteRental } from "../../store/slices/deleteRentalSlice";

type CarCardProps = {};
interface User {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  tcNo: string;
  birthDate: number;
  userImagePath: string | null;
}

const ReservationsCard: React.FC<CarCardProps> = () => {
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem("customer");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);

  const rentals = useAppSelector((state) => state.getCustomRentals.data);

  console.log(rentals);
  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  
  const handleDate = (startDate: any, endDate: any) => {
    const pickUpDateTime = new Date(startDate);
    const dropOffDateTime = new Date(endDate);

    const differenceInMs = dropOffDateTime.getTime() - pickUpDateTime.getTime();

    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays;
  };

  const handleDeleteClick = async (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      if (selectedRentalId) {
        await dispatch(deleteRental(selectedRentalId));
        await dispatch(getCustomRentals());
        setIsDeleteConfirmationOpen(false);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCustomRentals());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const userReservations = rentals
    ? rentals.filter((rental) => rental.userId === user?.userId)
    : [];

  var numberOfReservations = userReservations.length;

  console.log(userReservations);

  if (numberOfReservations === 0) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <img src="https://i.ibb.co/bB8gFmw/My-Reservations.jpg" alt="No reservations" width={"100%"}/>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Typography sx={{mb:5}}>You have <b>{numberOfReservations} reservation(s) </b></Typography>
      {userReservations.map((rental) => (
        <Grid container key={rental.id} xs={12} sm={12} md={12}>
          <Paper
            elevation={5}
            style={{
              padding: "3%",
              marginBottom: "20px",
              boxShadow: "0px 4px 20px rgba(15, 64, 55, 0.2)",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "green",
                        mb: 2,
                      }}
                    >
                      {<PlaceIcon sx={{ fontSize: 15 }} />}{" "}
                      {rental.carPositionCity}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sx={{ ml: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      {rental.carBrandName} {rental.carModelName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold", fontSize:18 }}>
                      Reservation Number:
                    </Typography>
                    <Typography>{getRandomNumber(300, 999)}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{mb:2}}>
                  <Typography sx={{ fontWeight: "bold", fontSize:18}}>
                      Reservation Date:
                    </Typography>
                    <Typography>{formatDate(rental.createdDate)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: "bold", fontSize:18 }}>
                      Pick Up
                    </Typography>
                    <Typography>{formatDate(rental.startDate)}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{mb:2}}>
                  <Typography sx={{ fontWeight: "bold", fontSize:18 }}>
                      Drop Off
                    </Typography>
                    <Typography>{formatDate(rental.endDate)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold", fontSize:18 }}>
                      Daily Price
                    </Typography>
                    <Typography>${rental.carDailyPrice}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold", fontSize:18 }}>
                      Rental Period
                    </Typography>
                    <Typography>
                      {handleDate(rental.startDate, rental.endDate)}day(s)
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color:"#bc9160" }}>
                      Total Price
                    </Typography>
                    <Typography sx={{fontSize:20}}>${rental.carDailyPrice *(handleDate(rental.startDate, rental.endDate)) }</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
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
                      onClick={() => handleDeleteClick(rental.id)}
                    >
                      Cancel My Reservation
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                alignItems={"center"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8f8f8",
                  minHeight: "100%",
                }}
              >
                <Grid container>
                  <Grid item xs={12} textAlign={"center"}>
                    <img
                      src="https://i.ibb.co/wZkGJP8/Logo-Ye-il.png"
                      width={"10%"}
                    />
                  </Grid>
                  <Grid item xs={12}textAlign={"center"}>
                    <img src={rental.carImagePath} width={"60%"} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>
    
  );
};

export default ReservationsCard;
