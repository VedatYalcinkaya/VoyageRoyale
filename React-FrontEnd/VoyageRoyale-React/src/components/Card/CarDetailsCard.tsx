import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Car } from '../../models/CarModel/response';
import CarService from '../../services/CarService';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/configureStore';
import { getCarDetail } from '../../store/slices/carDetailSlice';
import { useParams } from 'react-router-dom';

type Props = {}

const CarDetailsCard = (props: Props) => {


  const dispatch :ThunkDispatch<any, any, AnyAction> = useDispatch();

  const carss =useAppSelector(state => state.carDetail.data)    
  const { id } = useParams<{ id?: string }>();
  // const [car, setCar] = useState<Car|any>({});
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetchCars();
    dispatch(getCarDetail(1));
  }, [dispatch, id]);
  console.log(carss)

  const fetchCars = () => {
    // let service: CarService = new CarService();
    // service.getById().then((response: any) => {
    //   console.log(response.data);
    //   setCar(response.data);
    //   setIsLoading(false);
    // });
  };

  return (
    <Box sx={{display:'flex',  justifyContent:'center'}}>
        <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          width='300'
          image="https://sixt.com.tr/storage/images/shares/togg-1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {carss?.brandName  }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box mt={3}>
          <Button size="large" color="primary"  variant='contained' >
          Rent Now
        </Button>
        </Box>
        
      </CardActions>
    </Card>
    </Box>
  )
}

export default CarDetailsCard