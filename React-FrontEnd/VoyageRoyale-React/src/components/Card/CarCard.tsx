import React, { useEffect, useState } from 'react';
import CarService from '../../services/CarService';
import { Car } from '../../models/CarModel/response';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography, imageListClasses } from '@mui/material';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';


type Props = {};


const CarCard = (props: Props) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    let service: CarService = new CarService();
    service.getAll().then((response: any) => {
      console.log(response.data);
      setCars(response.data);
      setIsLoading(false);
    });
  };

  return (


    <Container sx={{ py: 2 }} maxWidth="md">
  
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cars.map((car: Car) => (
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
                <Typography component="tspan" sx={{ fontWeight: 'bold' }}>
                  {"Manuel"}
                </Typography>
                <Typography component="tspan" pl='110px' sx={{ fontWeight: 'bold' }}>
                  {"Dizel"}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ml:'165px'}}>
                  <Button size="small" variant='contained'>Details</Button>
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
