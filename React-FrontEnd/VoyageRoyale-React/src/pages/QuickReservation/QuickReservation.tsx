import React from 'react'
import ReservationBox from '../../components/ReservationBox/ReservationBox'
import { Grid, Container } from "@mui/material";
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';

type Props = {}

const QuickReservation = (props: Props) => {
  return (

      <Grid container style={{ textAlign: "center", justifyContent: "center", padding:50 }}>
        <Grid item xs={12}  >
        <img
        src="https://i.ibb.co/xJ0yrgp/luuxry-element.png"
        width={"40%"}
        />
        </Grid>
        <Grid item xs={12} sx={{mb:10,mt:5}} >
          <ReservationBox />
        </Grid>
        <Grid item xs={12} >
          <SpecialOffers/>
        </Grid>
      </Grid>   
  )
}

export default QuickReservation