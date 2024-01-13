import React from 'react'
import { Typography, Grid, Box } from '@mui/material';

type Props = {}

const UserProfileCard = (props: Props) => {

  return (
    <Box sx={{ width:"60%" , border: 1}}>
    <Box sx={{ width: '100%' , margin: 2 , justifyContent: 'space-evenly' }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold' }}>Name</Typography>
          <Typography>Vedat</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold'}}>Surname</Typography>
          <Typography>Yalçınkaya</Typography>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ width: '100%' , margin: 2 , justifyContent: 'space-evenly' }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold' }}>E-mail</Typography>
          <Typography>vedatylcnky@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{fontWeight: 'bold'}}>Birth Date</Typography>
          <Typography>01.06.1998</Typography>
        </Grid>
      </Grid>
    </Box>
    </Box>
    
  );
}

export default UserProfileCard