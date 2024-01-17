import { Route, Routes } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { Grid } from "@mui/material";
import Homepage from "../Homepage/Homepage";
import TopMenu from "../../components/TopMenu";
import CarList from "../CarList/CarList";
import Location from "../Location/Location";
import UserProfile from "../UserProfile/UserProfile";
import UserReservations from "../UserReservations/UserReservations";
import SignInSignUp from "../SignInSignUp/SignInSignUp";
import CarDetails from "../CarDetails/CarDetails";
import Payment from "../Payment/Payment";

function Dashboard() {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Navbar />
        </Grid>
        <Grid item xs={10}>
          <Grid>
            <TopMenu />
          </Grid>
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/cars" Component={CarList} />
            <Route path="/details/:id" Component={CarDetails} />
            <Route path="/location" Component={Location} />
            <Route path="/userProfile" Component={UserProfile} />
            <Route
              path="/userProfile/reservation"
              Component={UserReservations}
            />

            <Route path="/login" Component={SignInSignUp} />
            <Route
              path="/payment"
              element={
                <Payment
                  location={{ address: "", city: "" }}
                  driver={{ name: "", licensePlate: "" }}
                  car={{ model: "" }}
                  totalPrice={0}
                  onFinishReservation={() => {}}
                />
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
