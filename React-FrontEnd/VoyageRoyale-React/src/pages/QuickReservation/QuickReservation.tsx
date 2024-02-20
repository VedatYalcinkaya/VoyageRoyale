import React from 'react'
import ReservationBox from '../../components/ReservationBox/ReservationBox'
import { Grid, Container, Typography } from "@mui/material";
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';

type Props = {}

const QuickReservation = (props: Props) => {
  return (

      <Grid container style={{ textAlign: "center", justifyContent: "center", padding:20 }}>
        <Grid item xs={12}  >
        <Typography variant="h4" >Seamless Experience. Instant Luxury Awaits.</Typography>
        </Grid>
        <Grid item xs={12} marginTop={5} >
        <img
        src="https://i.ibb.co/6sZMtxB/quick-reservation.png"
        width={"10%"}
      
        />
        </Grid>
        <Grid item xs={12} sx={{mb:10}} >
          <ReservationBox />
        </Grid>
        <Grid item xs={12} >
          <SpecialOffers/>
        </Grid>
      </Grid>   
  )
}

export default QuickReservation