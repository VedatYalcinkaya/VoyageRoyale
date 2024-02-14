import { Route, Routes } from "react-router";
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
import AddBrand from "../../components/AdminComponents/BrandPanel/AddBrand";

import AddModel from "../../components/AdminComponents/ModelPanel/AddModel";
import AddCar from "../../components/AdminComponents/CarPanel/AddCar";
import AddFuelType from "../../components/AdminComponents/FuelTypePanel/AddFuelType";
import AddGearType from "../../components/AdminComponents/GearTypePanel/AddGearType";
import AddLocation from "../../components/AdminComponents/LocationPanel/AddLocation";
import CarFeatures from "../AdminPages/CarFeatures/CarFeatures";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddCarType from "../../components/AdminComponents/CarTypePanel/AddCarType";
import Users from "../AdminPages/Users/Users";
import Cars from "../AdminPages/Cars/Cars";
import Positions from "../AdminPages/Positions/Positions";
import Rentals from "../AdminPages/Rentals/Rentals";
import Invoices from "../AdminPages/Invoices/Invoices";
import NotFound from "../404NotFound/NotFound";
import ProtectedRoute from "../../guards/ProtectedRoute";
import SignUpRoute from "../../guards/SignUpRoute";
import AdminRoute from "../../guards/AdminRoute";


function Dashboard() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12} sm={10} style={{ padding: 30, paddingLeft:60 }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/details/:id" element={<CarDetails />} />
            <Route path="/location" element={<Location />} />
            <Route path="/userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
            <Route path="/quickReservation" element={<QuickReservation />} />
            <Route path="/signInSignUp" element={<SignUpRoute><SignInSignUp /></SignUpRoute>}/>
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/reservations" element={<UserReservations />} />
            <Route path="/payment" element={<Payment />} />
            <Route
              path="/adminDashboard/carFeatures"
              element={<AdminRoute><CarFeatures /></AdminRoute>}
            />
            <Route path="/adminDashboard/users" element={<AdminRoute><Users /></AdminRoute>} />
            <Route path="/adminDashboard/cars" element={<AdminRoute><Cars /></AdminRoute>} />
            <Route path="/adminDashboard/positions" element={<AdminRoute><Positions /></AdminRoute>} />
            <Route path="/adminDashboard/rentals" element={<AdminRoute><Rentals /></AdminRoute>} />
            <Route path="/adminDashboard/invoices" element={<AdminRoute><Invoices /></AdminRoute>} />
            <Route
              path="/userProfile/reservation"
              element={<ProtectedRoute><UserReservations /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
