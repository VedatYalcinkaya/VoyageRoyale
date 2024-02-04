import { Grid } from '@mui/material'
import React from 'react'
import AddCar from './AddCar'
import UpdateCar from './UpdateCar'
import CarsTable from './CarsTable'

type Props = {}

const CarDashboard = (props: Props) => {
  return (
    <Grid container>
    <Grid item xs={12} md={12} lg={12}>
        <Grid container>
            <Grid item xs={6} md={6} lg={6}>
              <AddCar/>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
               <UpdateCar/>
            </Grid>            
        </Grid>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>
      <CarsTable/>
    </Grid>

   </Grid>
  )
}

export default CarDashboard