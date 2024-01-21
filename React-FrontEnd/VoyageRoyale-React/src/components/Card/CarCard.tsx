import { useEffect } from 'react'; 
import { Car } from '../../models/CarModel/response';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { getCarList } from '../../store/slices/CarSlices/carListSlice';
import { useAppSelector } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { string } from 'yup';
import CarFuelFilter from './CarCardFilters/CarFuelFilter';

type CarCardProps = {
  
};


const CarCard = () => {

  const dispatch :ThunkDispatch<any, any, AnyAction> = useDispatch();
  const selectedCarType = useAppSelector(state=>state.carType.carType);
  const selectedFuel = useAppSelector(state=> state.carFuelType.fuelType)
  const selectedBrand = useAppSelector(state=> state.carBrandType.brandType)
  const selectedGear= useAppSelector(state => state.carGearType.gearType)
  const cars =useAppSelector(state => state.carList.data)    
    

  const filteredCars = cars.filter((car) => {
    return (
      (!selectedCarType || car.carTypeName === selectedCarType) &&
      (!selectedFuel || car.fuelTypeName === selectedFuel) &&
      (!selectedBrand|| car.brandName === selectedBrand) &&
      (!selectedGear || car.gearTypeName === selectedGear)
    );
  });

 
  useEffect(() => {
    dispatch(getCarList()); 
  }, []);



  return (


    <Container sx={{ py: 2 }} maxWidth="md">

      <Grid container spacing={4}>
      
        {filteredCars.map((car: Car) => ( 
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                }}
                image={car.imagePath}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  
                  {car.dailyPrice} <CurrencyLiraIcon fontSize='small'></CurrencyLiraIcon>
                </Typography>
                <Typography component="h5" sx={{ fontWeight: 'bold' }}>
                  {car.fuelTypeName}
                </Typography>
                <Typography component="h6"  sx={{ fontWeight: 'bold' }}>
                  {car.gearTypeName}
                </Typography>
              </CardContent>
              <CardActions>
                <Box >
                  <Link to={`/details/${car.id}`}><Button size="small" variant='contained'>Details</Button></Link>
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

