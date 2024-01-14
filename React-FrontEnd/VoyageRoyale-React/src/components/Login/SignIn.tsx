import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SignIn() {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:"#0F4037",
            padding: 3,
            borderRadius: 2,
            
          }}
        >
          <Typography component="h1" variant="h5" sx={{color: "#D9D5A7"}}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, }}>
            <TextField
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                "&:hover": {
                  borderColor: "#B58B5D",
                },
                "&:focus": {
                  borderColor: "#B58B5D",
                },
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#BF9460",
                "&:hover": {
                  backgroundColor: "#B58B5D",
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" sx={{color: "#D9D5A7",}}>
                  {<u>"Don't have an account? Sign Up"</u>}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}