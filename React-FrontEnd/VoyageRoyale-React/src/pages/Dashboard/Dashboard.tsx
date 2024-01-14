import Navbar from "../../components/Navbar/Navbar";

import SignInSignUp from "../SignInSignUp/SignInSignUp";
import { Grid } from "@mui/material";
function Dashboard() {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Navbar/>
        </Grid>
        <Grid item xs={10}>
          <SignInSignUp/>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard