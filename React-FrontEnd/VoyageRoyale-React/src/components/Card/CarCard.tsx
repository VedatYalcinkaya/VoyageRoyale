import { useEffect } from "react";
import { Car } from "../../models/CarModel/responses/response";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getCarList } from "../../store/slices/CarSlices/carListSlice";
import { useAppSelector } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

type CarCardProps = {};

const CarCard: React.FC<CarCardProps> = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const selectedCarType = useAppSelector((state) => state.carCarType.carType);
  const selectedFuel: string[] = useAppSelector((state) => state.carFuelType.fuelType) ?? [];

  const selectedBrand = useAppSelector((state) => state.carBrandType.brandType);
  const selectedGear = useAppSelector((state) => state.carGearType.gearType);

  const cars: Car[] = useAppSelector((state) => state.carList.data) || [];

  const filterCars = (car: Car) => {
    const typeMatch = !selectedCarType || car.carTypeName === selectedCarType;
    const fuelMatch = selectedFuel.length === 0 || selectedFuel.includes(`${car.fuelTypeName}`);
    const brandMatch = !selectedBrand || car.brandName === selectedBrand;
    const gearMatch = !selectedGear || car.gearTypeName === selectedGear;

    return typeMatch && fuelMatch && brandMatch && gearMatch;
  };

  const filteredCars = selectedFuel.length > 0 ? cars.filter(filterCars) : cars;

  return (
    <Container sx={{ py: 2, ml: 3 }} maxWidth="md">
      <Grid container spacing={2}>
        {filteredCars.map((car: Car) => (
          <Grid container key={car.id} xs={12} sm={12} md={12}>
            <Grid item xs={9}></Grid>
            <Grid item xs={12}>
            <Typography>{car.brandName}</Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>{car.fuelTypeName}</Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>{car.dailyPrice}</Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Typography>{car.year}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarCard;
