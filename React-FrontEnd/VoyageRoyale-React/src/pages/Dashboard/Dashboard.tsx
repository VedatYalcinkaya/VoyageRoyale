import { Route, Routes } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import {  Grid } from "@mui/material";
import Homepage from "../Homepage/Homepage";
import TopMenu from "../../components/TopMenu";
import CarList from "../CarList/CarList";
import Location from "../Location/Location";
import UserProfile from "../UserProfile/UserProfile";
import UserReservations from "../UserReservations/UserReservations";
import SignInSignUp from "../SignInSignUp/SignInSignUp";
import CarDetails from "../CarDetails/CarDetails";



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
            <Route path="/cars" element={<CarList/>}>
              <Route path="/cars/detail" element={<CarDetails/>}/>
            </Route>
            
            <Route path="/location" Component={Location}/>
            <Route path="/userProfile" Component={UserProfile}>
              <Route path="/userProfile/reservation" Component={UserReservations}/>
            </Route>
            <Route path="/login" Component={SignInSignUp}/>
            
            
          
          </Routes>

        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard