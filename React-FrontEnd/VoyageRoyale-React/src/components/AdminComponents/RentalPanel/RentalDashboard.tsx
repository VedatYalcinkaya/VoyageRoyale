import { Grid } from "@mui/material";

import RentalTable from "./RentalTable";
import UpdateRental from "./UpdateRental";
import AddRental from "./AddRentals";
import AddRentals from "./AddRentals";


function RentalDashboard() {
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container>
          <Grid item xs={6} md={6} lg={6}>
            <AddRentals/>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <UpdateRental />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <RentalTable />
      </Grid>
    </Grid>
  );
}

export default RentalDashboard;
