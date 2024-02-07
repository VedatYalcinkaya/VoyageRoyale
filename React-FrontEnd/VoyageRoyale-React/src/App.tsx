import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/montserrat";
import "@fontsource/merriweather";
import "@fontsource/dm-serif-display";
import "@fontsource/noto-serif";
import "@fontsource/prata";
import "@fontsource/italiana";
import "@fontsource/lato";
import "@fontsource/open-sans";
import { getCarBrandType } from "./store/slices/CarSlices/carBrandTypeSlice";
import { useAppDispatch } from "./store/configureStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCarGearType } from "./store/slices/CarSlices/carGearTypeSlice";
import { getCarCarType } from "./store/slices/CarSlices/carCarTypeSlice";
import { getAllColor } from "./store/slices/CarSlices/carColorSlice";
import { getCarFuelType } from "./store/slices/CarSlices/carFuelTypeSlice";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f3f37",
    },
    secondary: {
      main: "#bc9160",
    },
    info: {
      main: "#8abda1",
    },
    divider: "#bc9160",
    success: {
      main: "#5a8a6f",
    },
    warning: {
      main: "#ed6c02",
    },
    text: {
      primary: "#1f3f37",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

function App() {
  const dispatch = useAppDispatch();

  dispatch(getCarBrandType());
  dispatch(getCarGearType());
  dispatch(getCarCarType());
  dispatch(getAllColor());
  dispatch(getCarFuelType());

  

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
