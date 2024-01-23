import { Route, Routes } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import Homepage from "../Homepage/Homepage";
import CarList from "../CarList/CarList";
import Location from "../Location/Location";
import UserProfile from "../UserProfile/UserProfile";
import UserReservations from "../UserReservations/UserReservations";
import SignInSignUp from "../SignInSignUp/SignInSignUp";
import CarDetails from "../CarDetails/CarDetails";
import Payment from "../Payment/Payment";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  return (
    <>
      <Grid container style={{ backgroundColor: "#F0F0F0", minHeight: "100vh" }}>
        <Grid item xs={12} sm={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={10} style={{ padding: 50}}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/details/:id" element={<CarDetails />} />
            <Route path="/location" element={<Location />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route
              path="/userProfile/reservation"
              element={<UserReservations />}
            />
            <Route path="/login" element={<SignInSignUp />} />
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
      <Grid item xs={12}>
        {/* Footer */}
        <Footer />
      </Grid>
    </>
  );
}

export default Dashboard;
