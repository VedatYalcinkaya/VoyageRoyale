import React, { useEffect } from 'react'
import { Typography, Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { getCustomerInfo } from '../../store/slices/CustomerSlices/customerInfoSlice';

type Props = {}

const UserProfileCard = (props: Props) => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(state => state.customerInfo.data);

  useEffect(() => {
    dispatch(getCustomerInfo(1)); // ID 5 olan müşteriyi almak için dispatch
  }, [dispatch]);

  return (
    <Box sx={{ width:"60%" , border: 1}}>
    <Box sx={{ width: '100%' , margin: 2 , justifyContent: 'space-evenly' }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold' }}>Name</Typography>
          <Typography>{customer?.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold'}}>Surname</Typography>
          <Typography>{customer?.lastName}</Typography>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ width: '100%' , margin: 2 , justifyContent: 'space-evenly' }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold' }}>E-mail</Typography>
          <Typography>{customer?.userEmail}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold'}}>Birth Date</Typography>
          <Typography>{customer?.birthDate}</Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
}

export default UserProfileCard