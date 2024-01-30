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
import QuickReservation from "../QuickReservation/QuickReservation";
import AboutUs from "../AboutUs/AboutUs";
import AddBrand from "../../adminPages/BrandPanel/AddBrand";

function Dashboard() {
  const backgroundStyle = {
    backgroundImage: `url('https://i.ibb.co/nr2cNv9/5660740.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <>
      <Grid container style={{ ...backgroundStyle, minHeight: "100vh" }}>
        <Grid item xs={12} sm={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={10} style={{ padding: 50 }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/details/:id" element={<CarDetails />} />
            <Route path="/location" element={<Location />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/quickReservation" element={<QuickReservation />} />
            <Route path="/signInSignUp" element={<SignInSignUp />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/reservations" element={<UserReservations />} />
            <Route
              path="/userProfile/reservation"
              element={<UserReservations />}
            />
            <Route path="/login" element={<SignInSignUp />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/brand/add" element={<AddBrand/>}/>
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
