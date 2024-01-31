import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { signInRequest } from "../../models/UserModel/signInRequest";
import { postSignIn } from "../../store/slices/signInSlice";
import { useAppDispatch } from "../../store/configureStore";

const SignIn = ({}) => {
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: signInRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        dispatch(postSignIn(values));
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#0F4037",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
            Sign in
          </Typography>
          <Form>
            <SecondFormikInput name="email" label="Email" type="text" />
            <SecondFormikInput
              name="password"
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#BF9460",
                "&:hover": {
                  backgroundColor: "#B58B5D",
                },
              }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: "#D9D5A7" }}>
                  <u>Don't have an account? Sign Up</u>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </Formik>
  );
};

export default SignIn;
