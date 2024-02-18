import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/configureStore";
import { getCarDetail, setCarDetailSend } from "../../store/slices/CarSlices/carDetailSlice";
import { Link, useParams } from "react-router-dom";
import SelectedReservationDetails from "./SelectedReservationDetails";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Cookies from "js-cookie";
import { getCarGearType } from "../../store/slices/CarSlices/carGearTypeSlice";

interface CarDetailsCardProps { }

const CarDetailsCard: React.FC<CarDetailsCardProps> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { id: carId } = useParams<{ id?: string }>();
  const carDetails = useAppSelector((state) => state.carDetail.data);
  const isLoading = useAppSelector((state) => state.carDetail.loading);

  useEffect(() => {
    if (carId) {
      dispatch(getCarDetail(parseInt(carId)));
      dispatch(getCarGearType())
    }
  }, [dispatch, carId]);

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const selectedReturnDate = Cookies.get('selectedReturnDate')
  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;

  let dropOffDate: string | null = returnDate;

  const selectedPickUpDate = Cookies.get('selectedPickUpDate')
  const pickup: string | null = selectedPickUpDate?.substring(0, 10) ?? null;
  let pickUpDate: string | null = pickup;

  const handleBookNowButton = () => {
    Cookies.set('selectedDailyPrice', String(carDetails?.dailyPrice))
    Cookies.set('selectedCarModel', String(carDetails?.modelName))

  }

  const handleDate = () => {
    if (pickUpDate && dropOffDate) {
      const pickUpDateTime = new Date(pickUpDate);
      const dropOffDateTime = new Date(dropOffDate);

      const differenceInMs =
        dropOffDateTime.getTime() - pickUpDateTime.getTime();

      const differenceInDays = Math.ceil(
        differenceInMs / (1000 * 60 * 60 * 24)
      );

      return differenceInDays;
    } else {
      return 0;
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://s9.gifyu.com/images/SFpW6.gif"
          width={"10%"} />
      </Box>
    );;
  }

  if (!carDetails) {
    return <p>No data available</p>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          overflow: "auto",
          minHeight: "calc(100vh - 80px)",
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={8} textAlign={"center"}>
            <Typography variant="h5" fontWeight="bold">
              {carDetails.brandName} {carDetails.modelName}
            </Typography>
            <Grid container>
              <Grid container>
                <Grid item xs={12} sx={{ mt: -10, mb: -10 }}>
                  <img
                    width="60%"
                    src={carDetails.imagePath}
                    alt={`${carDetails.brandName} ${carDetails.modelName}`}
                  />
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Grid item>
                    <AccountTreeIcon
                      fontSize="small"
                      sx={{ height: 30, color: "#BC9160" }}
                    ></AccountTreeIcon>
                  </Grid>
                  <Typography sx={{ mr: 5, fontSize: 17, ml: 1 }}>
                    {carDetails.gearTypeName}
                  </Typography>
                  <Grid item>
                    <LocalGasStationIcon
                      fontSize="small"
                      sx={{ height: 30, color: "#BC9160" }}
                    ></LocalGasStationIcon>
                  </Grid>
                  <Typography sx={{ fontSize: 17, ml: 1 }}>
                    {carDetails.fuelTypeName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent={"center"} sx={{ mt: 2 }}>
              <Grid item textAlign={"center"}>
                <AccessTimeIcon
                  fontSize="small"
                  sx={{ height: 13, color: "green" }}
                ></AccessTimeIcon>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "green", fontSize: 13, mr: 2 }}>
                  Free Cancellation
                </Typography>
              </Grid>
              <Grid item>
                <DoneAllIcon
                  fontSize="small"
                  sx={{ height: 13, color: "#BC9160" }}
                ></DoneAllIcon>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "#BC9160", fontSize: 13, mr: 2 }}>
                  Instant Approval
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ mt: -0.5, mr: 2, fontSize: 15 }}>
                  <u> {getRandomNumber(100, 200)} Comments</u>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: 12,
                    mt: -0.5,
                    padding: 0.6,
                    color: "#D4D2A9",
                    backgroundColor: "#0F4037",
                    borderRadius: 1,
                  }}
                >
                  {parseFloat((Math.random() * 0.3 + 4.5).toFixed(1))}
                </Typography>
              </Grid>
              <Grid item>
                <StarIcon
                  fontSize="small"
                  sx={{ height: 20, mt: 0.2 }}
                ></StarIcon>
              </Grid>
              <Grid item>
                <StarIcon
                  fontSize="small"
                  sx={{ height: 20, mt: 0.2 }}
                ></StarIcon>
              </Grid>
              <Grid item>
                <StarIcon
                  fontSize="small"
                  sx={{ height: 20, mt: 0.2 }}
                ></StarIcon>
              </Grid>
              <Grid item>
                <StarIcon
                  fontSize="small"
                  sx={{ height: 20, mt: 0.2 }}
                ></StarIcon>
              </Grid>
              <Grid item>
                <StarHalfIcon
                  fontSize="small"
                  sx={{ height: 20, mt: 0.2 }}
                ></StarHalfIcon>
              </Grid>
            </Grid>
            <Grid >
              <Paper elevation={2}>
                <Grid
                  textAlign={"left"}
                  container
                  spacing={2}
                  sx={{ backgroundColor: "white", padding: 2, mt: 3 }}
                >
                  <Grid item xs={12}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        Delivery Type :
                      </span>{" "}
                      <span style={{ color: "green" }}>Shuttle Bus</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Office Address :{" "}
                      </span>{" "}
                      <span style={{ color: "green" }}>1 Aviation Circle</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Phone Number :{" "}
                      </span>{" "}
                      <span style={{ color: "green" }}>8772830898</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Paper sx={{ mt: 2, mb: 5, padding: 2 }}>
                <Grid container>
                  <Grid item textAlign={"left"}>
                    <Typography sx={{ fontSize: 12 }}>
                      Information on and fees of extra products and services
                      purchasable at the counter or based on your use of the
                      rental, such as driving cross border and, if any, pick-up
                      and drop-off grace periods.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="column"
            justifyContent="start"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <Paper
              style={{
                textAlign: "right",
                backgroundColor: "#f8f8f8",
                width: "270px",
                height: "300px",
                padding: "7%",
                paddingRight: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 12 }}>
                {handleDate()} day(s)
              </Typography>
              <Typography sx={{ fontSize: 20 }}>Total Price</Typography>
              <Typography
                sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
              >
                ${carDetails.dailyPrice * handleDate()}
              </Typography>
              <Typography sx={{ fontSize: 12, mb: 5, color: "#BC9160" }}>
                Daily Price: ${carDetails.dailyPrice}
              </Typography>
              <Button
                onClick={handleOpenPopup}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  marginBottom: 16,
                  padding: 6,
                  borderRadius: 5,
                  backgroundColor: "rgba(0, 0, 0, 0.5);",
                }}
              >
                Included in the price <KeyboardArrowRightIcon />
              </Button>
              <Dialog open={openPopup} onClose={handleClosePopup}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Included in the Price
                </DialogTitle>
                <List>
                  {[
                    "Airport Service Charge",
                    "Customer Facility Charge",
                    "Unlimited Mileage",
                    "Stay Safe Initiative",
                    "SCH",
                    "Inclusive Product Package",
                    "Collision Damage Waiver",
                    "Supplementary Liability Insurance",
                    "Theft Protection",
                  ].map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <DoneIcon sx={{ color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Dialog>

              <Link to={`/payment/${carId}`}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textAlign: "center" }}
                  onClick={() => { handleBookNowButton() }}
                >
                  Book Now
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CarDetailsCard;
