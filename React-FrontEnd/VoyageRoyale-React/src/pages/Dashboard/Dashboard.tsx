import { Route, Routes } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { AppBar, Grid } from "@mui/material";
import Homepage from "../Homepage/Homepage";
import TopMenu from "../../components/TopMenu";


function Dashboard() {
  return (
    <>

      <Grid container>
        <Grid item xs={2}>
          <Navbar />
        </Grid>
        <Grid item xs={10}>
          <Grid>
            <TopMenu/>
          </Grid>
          <Routes>
            <Route path="/" Component={Homepage} />
          </Routes>

        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard