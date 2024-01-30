
import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat';
import { AuthProvider } from "./context/AuthContext";


const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
});


function App() {
  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <div>
        <Dashboard/>
      </div>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
