import React, { useEffect, useState } from 'react'; 
import { Car } from '../../models/CarModel/response';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { getCarList } from '../../store/slices/carListSlice';
import { useAppSelector } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import CarService from '../../services/CarService';
import { Link } from 'react-router-dom';

type Props = {};


const CarCard = (props: Props) => {

  const dispatch :ThunkDispatch<any, any, AnyAction> = useDispatch();

  const carss =useAppSelector(state => state.carList.data)    
    

  
 
  useEffect(() => {

    dispatch(getCarList()); 
    // fetchCars()
     
  }, []);
 console.log(carss)
  // const fetchCars = () => {
  //   let service: CarService = new CarService();
  //   service.getAll().then((response: any) => {
  //     console.log(response.data);
  //     setCars(response.data);
     
  //   });
  // };  

  return (


    <Container sx={{ py: 2 }} maxWidth="md">
  
      {/* End hero unit */}
      <Grid container spacing={4}>
      
        {carss.map((car: Car) => ( 
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',

                }}
                image={car.imagePath}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  
                  {car.dailyPrice} <CurrencyLiraIcon fontSize='small'></CurrencyLiraIcon>
                </Typography>
                <Typography component="h5" sx={{ fontWeight: 'bold' }}>
                  {"Manuel"}
                </Typography>
                <Typography component="h6"  sx={{ fontWeight: 'bold' }}>
                  {"Dizel"}
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

