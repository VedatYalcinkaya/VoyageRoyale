import { useEffect } from 'react';
import { Car } from '../../models/CarModel/response';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { getCarList } from '../../store/slices/CarSlices/carListSlice';
import { useAppSelector } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

type CarCardProps = {};

const CarCard: React.FC<CarCardProps> = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const selectedCarType = useAppSelector((state) => state.carType.carType);
  const selectedFuel = useAppSelector((state) => state.carFuelType.fuelType);
  const selectedBrand = useAppSelector((state) => state.carBrandType.brandType);
  const selectedGear = useAppSelector((state) => state.carGearType.gearType);

  const cars: Car[] = useAppSelector((state) => state.carList.data) || [];



  const filterCars = (car: Car) => {
    const typeMatch = !selectedCarType || car.carTypeName === selectedCarType;
    const fuelMatch = !selectedFuel || car.fuelTypeName === selectedFuel;
    const brandMatch = !selectedBrand || car.brandName === selectedBrand;
    const gearMatch = !selectedGear || car.gearTypeName === selectedGear;

    return typeMatch && fuelMatch && brandMatch && gearMatch;
  };

  const filteredCars = cars.filter(filterCars);



  return (
    <Container sx={{ py: 2, ml: 3 }} maxWidth="md">
      <Grid container spacing={2}>
        {filteredCars.map((car: Car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding:2 }}>
              <CardMedia component="div" sx={{ pt: '56.25%', "&:hover": {
                      backgroundColor: "#F0F0F0",
                    }}} image={car.imagePath} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {car.dailyPrice} <CurrencyLiraIcon fontSize="small" />
                </Typography>
                <Typography component="h5" sx={{ fontWeight: 'bold' }}>
                  {car.fuelTypeName}
                </Typography>
                <Typography component="h6" sx={{ fontWeight: 'bold' }}>
                  {car.gearTypeName}
                </Typography>
              </CardContent>
              <CardActions>
                <Box >
                  <Link to={`/details/${car.id}`}>
                    <Button size="small" variant="contained" sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#0F4037",
                    "&:hover": {
                      backgroundColor: "#B58B5D",
                    },
                  }}>
                      Details
                    </Button>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarCard;
