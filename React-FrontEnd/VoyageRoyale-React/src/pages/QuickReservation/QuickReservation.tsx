import React from 'react'
import ReservationBox from '../../components/ReservationBox/ReservationBox'
import { Grid, Container } from "@mui/material";

type Props = {}

const QuickReservation = (props: Props) => {
  return (
    <Container>
      <Grid container style={{ textAlign: "center", justifyContent: "center" }}>
        <Grid item sm={12} style={{ padding: 60, paddingLeft: 90, marginBottom:100, marginTop:60 }}>
          <ReservationBox />
        </Grid>
      </Grid>
    </Container>
  )
}

export default QuickReservation