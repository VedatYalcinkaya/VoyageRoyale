import { ThunkDispatch } from "@reduxjs/toolkit/react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { CorporateSignUpRequest } from "../../models/UserModel/requests/corporateSignUpRequest";
import { postCorporateSignUp } from "../../store/slices/corporateSignUpSlice";

export default function CorporateSignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();


  const initialValues = { companyName: "", taxNo: "", email: "", password: "", authorities:["USER","CORPORATE_CUSTOMER"]}

  const validationSchema = Yup.object({
    companyName: Yup.string()
      .required("Name field must be fill")
      .min(2, "Name at least 2 character!"),
    taxNo: Yup.string()
      .required("Tax Number field must be fill")
      .min(11, "Tax Number at least 11 character!"),
    email: Yup.string()
      .required("Email field must be fill")
      .email(),
    password: Yup.string()
      .required("Password field must be fill"),

  })



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
          Corporate Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={async (values: CorporateSignUpRequest, { resetForm }) => {
              console.log(values);
              resetForm();
              await dispatch(postCorporateSignUp(values));
            }}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput name="companyName" label="Company Name" type="text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput name="taxNo" label="Tax Number" type="text" />
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
                Sign Up
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
}
