import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { setConfettiActive } from "../../store/slices/paymentSlice";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import tokenService from "../../services/tokenService";
import { AddRentalRequest } from "../../models/RentalModel/requests/addRentalRequest";
import { postRental } from "../../store/slices/addRentalSlice";
import PaymentReceiptPdf from "../../components/PaymentReceiptPdf/PaymentReceiptPdf";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getCarDetail } from "../../store/slices/CarSlices/carDetailSlice";

interface PaymentProps {
  onFinishReservation?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onFinishReservation }) => {
  const dispatch = useAppDispatch();
  const { id: carId = "" } = useParams<{ id?: string }>();
  const [isClicked, setIsClicked] = useState(false);
  const selectedCarModel = Cookies.get("selectedCarModel");
  const selectedBrand = Cookies.get("selectedBrand");
  const selectedCarImagePath = Cookies.get("selectedCarImagePath");
  const selectedGearType = Cookies.get("selectedGearType")
  const selectedFuelType = Cookies.get("selectedFuelType")

  const navigate = useNavigate();

  let firstName = "----";
  let lastName = "----";

  const customerDataString = localStorage.getItem("customer");

  if (customerDataString) {
    const customerData = JSON.parse(customerDataString);

    if (customerData.firstName) {
      firstName = customerData.firstName;
    }

    if (customerData.lastName) {
      lastName = customerData.lastName;
    }
  }

  const selectedReservation = useAppSelector((state) => state.reservation);
  const isLoading = useAppSelector((state) => state.carDetail.loading);

  const selectedDailyPriceString = Cookies.get("selectedDailyPrice");
  const selectedDailyPrice = selectedDailyPriceString
    ? parseInt(selectedDailyPriceString)
    : 0;

  const selectedCity = Cookies.get("selectedCity");

  const selectedReturnDate: any = Cookies.get("selectedReturnDate");
  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;
  const dropOffDate: string | null = returnDate;

  const selectedPickUpDate: any = Cookies.get("selectedPickUpDate");
  const pickup: string | null = selectedPickUpDate?.substring(0, 10) ?? null;
  const pickUpDate: string | null = pickup;

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

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
    tokenService.decodeToken();
  }, [user]);

  const totalPrice = handleDate() * selectedDailyPrice;

  const handleFinishReservation = () => {
    if (tokenService.decodeToken()?.sub !== undefined) {
      dispatch(postRental(rentalInfo as AddRentalRequest));
      dispatch(setConfettiActive(true));

      setTimeout(() => {
        dispatch(setConfettiActive(false));
        onFinishReservation && onFinishReservation();
        toast.success("Payment completed!");
        setShowPDF(true);
        if (!isClicked) setIsClicked(true);

        setTimeout(() => {
          navigate("/");
          toast.info("You are directed to a new journey with Voyage Royale!");
        }, 4500);
      }, 6000);
    } else {
      toast.error("Please sign in for payment");
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
        <img src="https://s9.gifyu.com/images/SFpW6.gif" width={"10%"} />
      </Box>
    );
  }

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#0F4037", mb: 2 }}
          >
            Review Your Reservation
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        sx={{ backgroundColor: "#f9f9f9", boxShadow: 1, p: 2, mb: 2 }}
      >
        <Grid item xs={12}>
          <Typography
            sx={{ color: "#0F4037", fontSize: 16, fontWeight: "bold" }}
          >
            Confirmation #{getRandomNumber(999, 9999)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: "#f9f9f9", boxShadow: 1, p: 2 }}>
      <Grid item xs={4} sx={{ p: 5, position: 'relative' }}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h5">
              {selectedBrand} {selectedCarModel}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography fontSize={12}>
              {selectedFuelType}-{selectedGearType}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <img src={selectedCarImagePath} width="90%" />
          </Grid>
          <Grid item xs={12}  style={{ position: 'absolute', bottom: 0 }}>
            <Typography fontSize={12}>
              *This is an overview of your rental terms - inclusions, exclusions,
              potential additional costs and more-
            </Typography>
            <Typography fontSize={12} color={"green"}>
              <u>View Key Facts & Policies</u>
            </Typography>
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
                  <Typography fontSize={20}>{selectedCity}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>
                    {formatDate(selectedPickUpDate)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>DROP OFF</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography fontSize={20}>{selectedCity}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>
                    {formatDate(selectedReturnDate)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>DRIVER INFORMATION</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>
                    {firstName} {lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"} color={"green"}>
                    <u>MILEAGE</u>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography>Unlimited Mileage</Typography>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography>Included</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>Daily Price:</Typography>
                  <Typography fontWeight={"bold"}>Rental Period:</Typography>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontWeight={"bold"}>
                    ${selectedDailyPrice}
                  </Typography>
                  <Typography fontWeight={"bold"}>
                    {handleDate()} day(s)
                  </Typography>
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
                    ${totalPrice}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Typography fontSize={10}>
                    * Rates, taxes, and fees do not reflect rates, taxes and
                    fees applicable to non-included optional coverages or extras
                    added later
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container padding={2}>
              <Grid xs={6}>
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    disabled={isClicked}
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
