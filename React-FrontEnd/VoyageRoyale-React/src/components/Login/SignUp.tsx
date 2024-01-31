import React from "react";
import { ThunkDispatch } from "@reduxjs/toolkit/react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { postSignUp } from "../../store/slices/signUpSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function SignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.signUp.loading);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email: string = (formData.get("email") as string) || "";
    const password: string = (formData.get("password") as string) || "";
    const firstName: string = (formData.get("firstName") as string) || "";
    const lastName: string = (formData.get("lastName") as string) || "";
    const tcNo: string = (formData.get("tcNo") as string) || "";
    const birthDate: string = (formData.get("birthDate") as string) || "";

    console.log(email, password, firstName, lastName, tcNo, birthDate)
    console.log(formData)

    dispatch(
      postSignUp({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        tcNo: tcNo,
        birthDate: birthDate,
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0F4037",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                required
                fullWidth
                id="tcNo"
                label="TC No"
                name="tcNo"
                autoComplete="TC No"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                required
                fullWidth
                id="birthDate"
                label="Birthdate"
                name="birthDate"
                autoComplete="birthdate"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
