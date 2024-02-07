import { ThunkDispatch } from "@reduxjs/toolkit/react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { postSignUp } from "../../store/slices/signUpSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { UserRequest } from "../../models/UserModel/request";

export default function SignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.signUp.loading);

  const initialValues = { firstName: "", lastName: "", email: "", password: "", tcNo: "", birthDate: "" }

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Name field must be fill")
      .min(2, "Name at least 2 character!"),
    lastName: Yup.string()
      .required("Lastn name field must be fill")
      .min(2, "Lastn name at least 2 character!"),
    email: Yup.string()
      .required("Email field must be fill")
      .email(),
    password: Yup.string()
      .required("Password field must be fill"),
    tcNo: Yup.string().required("Identity Number field must be fill"),

  })



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
        <Box sx={{ mt: 3 }}>
          <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={(values: UserRequest, { resetForm }) => {
              console.log(values);
              resetForm();
              dispatch(postSignUp(values));
            }}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput name="firstName" label="First Name" type="text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput name="lastName" label="Last Name" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <SecondFormikInput name="birthDate" label="Birth Date" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <SecondFormikInput name="tcNo" label="Identity Number" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <SecondFormikInput name="email" label="Email" type="email" />
                </Grid>
                <Grid item xs={12}>
                  <SecondFormikInput name="password" label="Password" type="password" />
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

            </Form>
          </Formik>

        </Box>
      </Box>
    </Container>
  );
}
