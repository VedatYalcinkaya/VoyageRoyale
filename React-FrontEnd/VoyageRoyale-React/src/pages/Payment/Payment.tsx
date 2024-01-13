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

interface Payment {
  location: Location;
  driver: Driver;
  car: Car;
  totalPrice: number;
  onFinishReservation: () => void;
}

const Payment: React.FC<Payment> = ({
  location,
  driver,
  car,
  totalPrice,
  onFinishReservation,
}) => {
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reservation Details
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
          Finish Reservation
        </Button>
      </Card>
    </Container>
  );
};

export default Payment;
