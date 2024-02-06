import { Grid } from "@mui/material";
import AddLocation from "./AddLocation";
import LocationTable from "./LocationTable";
import UpdateLocation from "./UpdateLocation";

function LocationDashboard() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}>
        <AddLocation />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <UpdateLocation />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <LocationTable />
      </Grid>
    </Grid>
  );
}

export default LocationDashboard;
