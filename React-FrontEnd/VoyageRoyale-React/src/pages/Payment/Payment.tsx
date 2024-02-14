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
  Container,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { setConfettiActive } from "../../store/slices/paymentSlice";
import Confetti from "react-confetti";
import dayjs from "dayjs";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import tokenService from "../../services/tokenService";
import { AddRentalRequest } from "../../models/RentalModel/requests/addRentalRequest";
import { postRental } from "../../store/slices/addRentalSlice";
import PaymentReceiptPdf from "../../components/PaymentReceiptPdf/PaymentReceiptPdf";

interface PaymentProps {
  onFinishReservation?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onFinishReservation }) => {
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector((state) => state.carDetail.carDetailSend);
  const selectedPosition = useAppSelector((state) => state.reservation);
  const pickup: string | null =
    selectedPosition.pickUpDate?.substring(0, 10) ?? null;
  const returnDate: string | null =
    selectedPosition.returnDate?.substring(0, 10) ?? null;
  const confettiActive = useAppSelector(
    (state) => state.payment.confettiActive
  );
  const user = useAppSelector((state) => state.getCustomerByEmail.data?.id);
  const [showPDF, setShowPDF] = useState(false);
  const [rentalInfo, setRentalInfo] = useState({});

  const calculateTotalPrice = (): number => {
    const daysDifference = dayjs(selectedPosition.returnDate).diff(
      dayjs(selectedPosition.pickUpDate),
      "day"
    );
    const totalPrice = daysDifference * (selectedCar?.dailyPrice || 0);

    return totalPrice;
  };

  useEffect(() => {
    if (user !== undefined) {
      setRentalInfo({
        startDate: pickup,
        endDate: returnDate,
        carId: selectedCar?.id,
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
        toastr.success("Payment completed!");
      }, 3000);
      setShowPDF(true);
    } else {
      toastr.error("Please sign in for payment", "Caution");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          marginTop: "100px",
          backgroundColor: "rgba(255, 255, 255, 0.90)",
          backdropFilter: "blur(5px)",
          position: "relative",
        }}
      >
        {confettiActive && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
          />
        )}
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", color: "#0F4037" }}
          >
            Payment Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`Location: ${selectedPosition.position?.city}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Latitude : ${selectedPosition.position?.latitude} Longitude : ${selectedPosition.position?.longitude}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Car Model: ${selectedCar?.modelName}`} />
            </ListItem>
          </List>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: "5px", marginLeft: "15px" }}
          >
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          style={{
            margin: "auto",
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
        {showPDF && (
          <Box sx={{ textAlign: "center" }}>
            <PDFDownloadLink
              document={
                <PaymentReceiptPdf
                  selectedPosition={selectedPosition}
                  selectedCar={selectedCar}
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
      </Card>
    </Container>
  );
};

export default Payment;
