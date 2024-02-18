import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { setConfettiActive } from "../../store/slices/paymentSlice";
import Confetti from "react-confetti";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import tokenService from "../../services/tokenService";
import { AddRentalRequest } from "../../models/RentalModel/requests/addRentalRequest";
import { postRental } from "../../store/slices/addRentalSlice";
import PaymentReceiptPdf from "../../components/PaymentReceiptPdf/PaymentReceiptPdf";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getCarDetail } from "../../store/slices/CarSlices/carDetailSlice";

interface PaymentProps {
  onFinishReservation?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onFinishReservation }) => {
  const dispatch = useAppDispatch();
  const { id: carId = "" } = useParams<{ id?: string }>();
  const selectedCarModel = Cookies.get("selectedCarModel");
  const selectedBrand = Cookies.get("selectedBrand");
  const selectedCarImagePath = Cookies.get("selectedCarImagePath");

  const selectedReservation = useAppSelector((state) => state.reservation);

  const selectedDailyPriceString = Cookies.get("selectedDailyPrice");
  const selectedDailyPrice = selectedDailyPriceString
    ? parseInt(selectedDailyPriceString)
    : 0;

  const selectedCity = Cookies.get("selectedCity");
  const selectedReturnDate = Cookies.get("selectedReturnDate");

  const selectedPickupDate = Cookies.get("selectedPickUpDate");
  const pickup: string | null = selectedPickupDate?.substring(0, 10) ?? null;

  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const confettiActive = useAppSelector(
    (state) => state.payment.confettiActive
  );
  const user = useAppSelector((state) => state.getCustomerByEmail.data?.id);
  const [showPDF, setShowPDF] = useState(false);
  const [rentalInfo, setRentalInfo] = useState({});

  const calculateTotalPrice = (): number => {
    const daysDifference = dayjs(selectedReturnDate).diff(
      dayjs(selectedPickupDate),
      "day"
    );
    const totalPrice = daysDifference * selectedDailyPrice;

    return totalPrice;
  };

  React.useEffect(() => {
    {
      dispatch(getCarDetail(parseInt(carId)));
    }
  }, [dispatch, carId]);

  useEffect(() => {
    if (user !== undefined) {
      setRentalInfo({
        startDate: pickup,
        endDate: returnDate,
        carId: carId,
        userId: user,
      });
    }
    console.log(rentalInfo);
    tokenService.decodeToken();
  }, [user]);

  console.log(user);

  const totalPrice = calculateTotalPrice();

  const handleFinishReservation = () => {
    if (tokenService.decodeToken()?.sub !== undefined) {
      dispatch(postRental(rentalInfo as AddRentalRequest));

      dispatch(setConfettiActive(true));

      setTimeout(() => {
        dispatch(setConfettiActive(false));
        onFinishReservation && onFinishReservation();
        toast.success("Payment completed!");
      }, 3000);
      setShowPDF(true);
    } else {
      toast.error("Please sign in for payment");
    }
  };

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#0F4037", mb: 5 }}
          >
            Review Your Reservation
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ boxShadow: 2, p: 2 }}>
        <Grid item xs={4} sx={{ p: 5 }}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {selectedBrand} {selectedCarModel}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <img src={selectedCarImagePath} width="80%" />
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ borderLeft: 1, borderColor: "#bc9160" }}
          spacing={2}
        >
          <Box sx={{}}>
            {confettiActive && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
              />
            )}
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>PICK UP</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>{selectedCity}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>{pickup}</Typography>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>DROP OFF</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>{selectedCity}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>{returnDate}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>ADD ONS</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>None</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>
                    <u>TOTAL PRICE</u>
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} fontSize={26}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "#0F4037",
                      color: "#fff",
                      display: "block",
                      padding: "12px",
                    }}
                    onClick={handleFinishReservation}
                  >
                    Finish Payment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {showPDF && (
              <Box sx={{ textAlign: "center" }}>
                <PDFDownloadLink
                  document={
                    <PaymentReceiptPdf
                      selectedPosition={selectedReservation}
                      selectedCar={selectedCarModel}
                      totalPrice={totalPrice}
                    />
                  }
                  fileName="Payment_Details.pdf"
                >
                  {({ loading }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Payment;
