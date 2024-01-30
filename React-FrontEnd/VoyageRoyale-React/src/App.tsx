
import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat';

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
    <ThemeProvider theme={theme}>
      <div>
        <Dashboard/>
      </div>
    </ThemeProvider>
  );
}

export default App;