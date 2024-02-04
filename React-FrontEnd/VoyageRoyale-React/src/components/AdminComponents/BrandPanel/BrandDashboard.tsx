import React from 'react'
import BrandTable from './BrandTable'
import { Grid } from '@mui/material'
import AddBrand from './AddBrand'
import BrandsTable from './BrandsTable'
import UpdateBrand from './UpdateBrand'

function BrandDashboard() {
  return (
   <Grid container>
    <Grid item xs={12} md={12} lg={12}>
        <Grid container>
            <Grid item xs={6} md={6} lg={6}>
              <AddBrand/>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <UpdateBrand/>
            </Grid>            
        </Grid>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>
      <BrandsTable/>
    </Grid>

   </Grid>
  )
}

export default BrandDashboard