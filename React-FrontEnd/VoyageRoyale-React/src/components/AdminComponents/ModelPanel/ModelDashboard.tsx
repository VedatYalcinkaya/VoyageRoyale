import { Grid } from '@mui/material'
import React from 'react'
import AddModel from './AddModel'
import UpdateModel from './UpdateModel'
import ModelsTable from './ModelsTable'



function ModelDashboard() {
  return (
    <Grid container>
    <Grid item xs={12} md={12} lg={12}>
        <Grid container>
            <Grid item xs={6} md={6} lg={6}>
             <AddModel/>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
               <UpdateModel/>
            </Grid>            
        </Grid>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>
      <ModelsTable/>
    </Grid>

   </Grid>
  )
}

export default ModelDashboard