
import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat';
import { AuthProvider } from "./context/AuthContext";
<<<<<<< HEAD

=======
>>>>>>> a66db9399a993ecd3f224832b66f5f52148687d8

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