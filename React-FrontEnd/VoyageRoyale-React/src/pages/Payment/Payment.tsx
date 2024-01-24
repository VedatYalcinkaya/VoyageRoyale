import React from "react";
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

interface Location {
  address: string;
  city: string;
}

interface Driver {
  name: string;
  licensePlate: string;
}

interface Car {
  model: string;
}

interface PaymentProps {
  location: Location;
  driver: Driver;
  car: Car;
  totalPrice: number;
  onFinishReservation: () => void;
}

const Payment: React.FC<PaymentProps> = ({
  location,
  driver,
  car,
  totalPrice,
  onFinishReservation,
}) => {
  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: "100px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`Location: ${location.address}, ${location.city}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Driver: ${driver.name}`}
                secondary={`License Plate: ${driver.licensePlate}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Car: ${car.model}`} />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={onFinishReservation}
        >
          Finish Payment
        </Button>
      </Card>
    </Container>
  );
};

export default Payment;
