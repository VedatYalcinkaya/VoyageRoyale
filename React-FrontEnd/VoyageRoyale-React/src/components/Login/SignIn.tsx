// SignIn.tsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../../context/AuthContext';

interface SignInProps {
  onClose: () => void;
  onSignIn: () => void; // Change the type of onSignIn to a function
}

const SignIn: React.FC<SignInProps> = ({ onClose, onSignIn }) => {
  const { signIn } = useAuth(); // Access the signIn function from the authentication context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please provide both email and password.');
      return;
    }

    // Call the signIn function provided by the authentication context
    signIn();

    // Call the onSignIn function provided by the parent component (Sidebar)
    onSignIn();

    // Clear the form data
    setFormData({
      email: '',
      password: '',
    });

    // Close the sign-in drawer
    onClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: "#0F4037",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            value={formData.email}
            onChange={handleInputChange}
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
            value={formData.password}
            onChange={handleInputChange}
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
              <Link
                href="#"
                variant="body2"
                sx={{ color: "#D9D5A7" }}
              >
                {<u>"Don't have an account? Sign Up"</u>}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
