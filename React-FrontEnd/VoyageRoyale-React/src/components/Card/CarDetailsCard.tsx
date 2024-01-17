import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Car } from '../../models/CarModel/response';
import CarService from '../../services/CarService';

type Props = {}

const CarDetailsCard = (props: Props) => {


  const [car, setCar] = useState<Car|any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    let service: CarService = new CarService();
    service.getById().then((response: any) => {
      console.log(response.data);
      setCar(response.data);
      setIsLoading(false);
    });
  };

  return (
    <Box sx={{display:'flex',  justifyContent:'center', mt:5} }>
        <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          width='300'
          image={carss?.imagePath}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {`${car.brandName}  ${car.dailyPrice}₺`}
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