import React from "react";
import { useDispatch } from "react-redux";
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
} from "@mui/material";
import { useAppSelector } from "../../store/configureStore";
import { setConfettiActive } from "../../store/slices/paymentSlice";
import Confetti from "react-confetti";
import dayjs from "dayjs";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

interface PaymentProps {
  onFinishReservation?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onFinishReservation }) => {
  const selectedCar = useAppSelector((state) => state.carDetail.carDetailSend);
  const selectedPosition = useAppSelector((state) => state.reservation);
  const confettiActive = useAppSelector(
    (state) => state.payment.confettiActive
  );
  const dispatch = useDispatch();

  const calculateTotalPrice = (): number => {
    const daysDifference = dayjs(selectedPosition.returnDate).diff(
      dayjs(selectedPosition.pickUpDate),
      "day"
    );
    const totalPrice = daysDifference * (selectedCar?.dailyPrice || 0);

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const handleFinishReservation = () => {
    dispatch(setConfettiActive(true));
    toastr.success("Payment completed!");

    setTimeout(() => {
      dispatch(setConfettiActive(false));
      onFinishReservation && onFinishReservation();
      toastr.success("Payment completed!");
    }, 5000);
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
          {/* <img
            src={selectedCar?.imagePath}
            alt="Selected Car"
            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
          /> */}
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
            Total Price: ₺{totalPrice.toFixed(2)}
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
      </Card>
    </Container>
  );
};

export default Payment;
