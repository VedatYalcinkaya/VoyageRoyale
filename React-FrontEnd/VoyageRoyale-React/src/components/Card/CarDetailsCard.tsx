import React from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  SnackbarContent,
  Typography,
} from '@mui/material';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/configureStore';
import { getCarDetail } from '../../store/slices/CarSlices/carDetailSlice';
import { useParams } from 'react-router-dom';
import { Car } from '../../models/CarModel/response';
import { blue } from '@mui/material/colors';

interface CarDetailsCardProps {}

const CarDetailsCard: React.FC<CarDetailsCardProps> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { id: carId } = useParams<{ id?: string }>();
  const carDetails = useAppSelector((state) => state.carDetail.data);
  const isLoading = useAppSelector((state) => state.carDetail.loading);
  const error = useAppSelector((state) => state.carDetail.error);

  React.useEffect(() => {
    if (carId) {
      dispatch(getCarDetail(parseInt(carId)));
    }
  }, [dispatch, carId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }



  if (!carDetails) {
    return <p>No data available</p>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
        overflow: 'auto', // Enable scrolling if content overflows
      }}
    >
      <CarDetailsCardContent carDetails={carDetails} />
    </Box>
  );
};

interface CarDetailsCardContentProps {
  carDetails: Car;
}

const CarDetailsCardContent: React.FC<CarDetailsCardContentProps> = ({ carDetails }) => (
  <Card sx={{ maxWidth: 700, width: '100%' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={carDetails?.imagePath}
        alt="Car Image"
      />
      <CardContent >
        <Typography variant="h4" gutterBottom>
          {carDetails?.brandName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
              <SnackbarContent message={`Model: ${carDetails?.modelName}`}  />
              </ListItem>
              <ListItem>
              <SnackbarContent message={`Fuel Type: ${carDetails?.fuelTypeName}`}  />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} sx={{fontWeight:'5px'}}>
            <List>
              <ListItem>
              <SnackbarContent message={`Gear Type: ${carDetails?.gearTypeName}`}/>
              </ListItem>
              <ListItem>
              <SnackbarContent message={`Car Type: ${carDetails?.carTypeName}`} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Box mt={3} width="100%">
        <Button size="large" color="success" variant="contained" fullWidth>
           Rent Now
        </Button>
      </Box>
    </CardActions>
  </Card>
);

export default CarDetailsCard;
