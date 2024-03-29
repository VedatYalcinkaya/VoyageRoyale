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
import { useAppDispatch } from "./store/configureStore";
import { useEffect } from "react";
import { getCustomerByEmail } from "./store/slices/getCustomerByEmailSlice";
import tokenService from "./services/tokenService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

  useEffect(() => {
    if (tokenService.decodeToken()?.sub) {
      dispatch(getCustomerByEmail(tokenService.decodeToken()?.sub));
    }
  }, []);

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
