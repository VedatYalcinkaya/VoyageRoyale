import React from 'react'
import ReservationBox from '../../components/ReservationBox/ReservationBox'
import { Grid, Container } from "@mui/material";

type Props = {}

const QuickReservation = (props: Props) => {
  return (

      <Grid container style={{ textAlign: "center", justifyContent: "center", padding:50 }}>
        <Grid item sm={12} >
          <ReservationBox />
        </Grid>
      </Grid>   
  )
}

export default QuickReservation