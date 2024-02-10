import { useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit/react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { postSignUp } from "../../store/slices/signUpSlice";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { UserRequest } from "../../models/UserModel/request";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function SignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.signUp.loading);

  const [open, setOpen] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    tcNo: "",
    birthDate: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required!")
      .min(2, "First name must be at least 2 characters!"),
    lastName: Yup.string()
      .required("Last name is required!")
      .min(2, "Last name must be at least 2 characters!"),
    email: Yup.string().required("Email is required!").email(),
    password: Yup.string().required("Password is required!"),
    tcNo: Yup.string().required("Identity Number is required!"),
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: UserRequest, { resetForm }) => {
            console.log(values);
            resetForm();
            dispatch(postSignUp(values));
            setOpen(true);
          }}
        >
          {({ values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h4" sx={{ mb: 6 }}>
                    Create Your Account
                  </Typography>
                  <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput
                    name="firstName"
                    label="First Name*"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput
                    name="lastName"
                    label="Last Name*"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Birth Date" timezone="Europe/Istanbul" />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ mb: 5 }}>
                  <SecondFormikInput
                    name="tcNo"
                    label="Identity Number*"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
                    Login Information
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <SecondFormikInput name="email" label="Email*" type="email" />
                </Grid>
                <Grid item xs={6}>
                  <SecondFormikInput
                    name="password"
                    label="Password*"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                component={RouterLink}
                to="/"
                type="submit"
                variant="contained"
                sx={{
                  mt: 7,
                  mb: 2,
                  width: 100,
                  backgroundColor: "#0F4037",
                  "&:hover": {
                    backgroundColor: "#B58B5D",
                  },
                }}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your account has been successfully created!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
