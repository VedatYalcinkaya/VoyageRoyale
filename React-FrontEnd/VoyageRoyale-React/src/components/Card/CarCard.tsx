import { useEffect } from "react";
import { Car } from "../../models/CarModel/responses/response";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../store/configureStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

type CarCardProps = {};

const CarCard: React.FC<CarCardProps> = () => {
  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const selectedCarType: string[] = useAppSelector(
    (state) => state.carCarType.carType
  );
  const selectedFuel: string[] =
    useAppSelector((state) => state.carFuelType.fuelType) ?? [];

  const selectedBrand: string[] = useAppSelector(
    (state) => state.carBrandType.brandType
  );
  const selectedGear: string[] = useAppSelector(
    (state) => state.carGearType.gearType
  );

  const cars: Car[] = useAppSelector((state) => state.carList.data) || [];

  const filterCars = (car: Car) => {
    const typeMatch =
      selectedCarType.length === 0 ||
      selectedCarType.includes(`${car.carTypeName}`);
    const fuelMatch =
      selectedFuel.length === 0 || selectedFuel.includes(`${car.fuelTypeName}`);
    const brandMatch =
      selectedBrand.length === 0 || selectedBrand.includes(`${car.brandName}`);
    const gearMatch =
      selectedGear.length === 0 || selectedGear.includes(`${car.gearTypeName}`);

    return typeMatch && fuelMatch && brandMatch && gearMatch;
  };
  console.log(cars);
  const filteredCars =
    selectedFuel.length > 0 ||
    selectedBrand.length > 0 ||
    selectedGear.length > 0 ||
    selectedCarType.length > 0
      ? cars.filter(filterCars)
      : cars;

  const selectedReturnDate = useAppSelector(
    (state) => state.reservation.returnDate
  );
  const returnDate: string | null =
    selectedReturnDate?.substring(0, 10) ?? null;

  let dropOffDate: string | null = returnDate;

  const selectedPickupDate = useAppSelector(
    (state) => state.reservation.pickUpDate
  );
  const pickup: string | null = selectedPickupDate?.substring(0, 10) ?? null;
  let pickUpDate: string | null = pickup;

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

  return (
    <Grid container>
      {Array.isArray(filteredCars) &&
        filteredCars.map((car: Car) => (
          <Grid container key={car.id} xs={12} sm={12} md={12}>
            <Paper
              elevation={5}
              style={{
                padding: "3%",
                marginBottom: "20px",
                boxShadow: "0px 4px 20px rgba(15, 64, 55, 0.2)",
              }}
            >
              <Grid container>
                <Grid item xs={8}>
                  <Grid item xs={12}>
                    <Grid container alignItems={"center"}>
                      <Grid item xs={8}>
                        <Typography variant="h5" fontWeight="bold">
                          {car.brandName} {car.modelName}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{textAlign:"right"}}>
                        <img
                        
                          width="40%"
                          src={car.brandLogoPath}
                          alt={`${car.brandName} `}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <Grid container>
                      <Grid item xs={6} sx={{ mt: -5, mb: -5, ml: -1 }}>
                        <img
                          width="100%"
                          src={car.imagePath}
                          alt={`${car.brandName} ${car.modelName}`}
                        />
                      </Grid>
                      <Grid
                        container
                        xs={6}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Grid item>
                          <AccountTreeIcon
                            fontSize="small"
                            sx={{ height: 30, color: "#BC9160" }}
                          ></AccountTreeIcon>
                        </Grid>
                        <Typography sx={{ mr: 5, fontSize: 17, ml: 1 }}>
                          {car.gearTypeName}
                        </Typography>
                        <Grid item>
                          <LocalGasStationIcon
                            fontSize="small"
                            sx={{ height: 30, color: "#BC9160" }}
                          ></LocalGasStationIcon>
                        </Grid>
                        <Typography sx={{ fontSize: 17, ml: 1 }}>
                          {car.fuelTypeName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <Grid container alignItems="center">
                      <Grid item>
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ height: 13, color: "green" }}
                        ></AccessTimeIcon>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{ color: "green", fontSize: 13, mr: 2 }}
                        >
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
                        <Typography
                          sx={{ color: "#BC9160", fontSize: 13, mr: 2 }}
                        >
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
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Paper
                    style={{
                      textAlign: "right",
                      backgroundColor: "#f8f8f8",
                      width: "220px",
                      height: "250px",
                      padding: "7%",
                      marginLeft: 30,
                      paddingRight: 20,
                      display: "flex", // Use flexbox
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>
                      {handleDate()} day(s)
                    </Typography>
                    <Typography sx={{ fontSize: 20 }}>Total Price</Typography>
                    <Typography
                      sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
                    >
                      ${car.dailyPrice * handleDate()}
                    </Typography>
                    <Typography sx={{ fontSize: 12, mb: 5 }}>
                      Daily Price: ${car.dailyPrice}
                    </Typography>
                    <Link to={`/details/${car.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textAlign: "center", color: "#D4D2A9" }}
                      >
                        Rent Now
                      </Button>
                    </Link>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default CarCard;
