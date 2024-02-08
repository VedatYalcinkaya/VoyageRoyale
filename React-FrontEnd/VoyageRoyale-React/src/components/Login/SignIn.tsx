import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { signInRequest } from "../../models/UserModel/signInRequest";
import { postSignIn } from "../../store/slices/signInSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import authService from "../../services/authService";
import tokenService from "../../services/tokenService";
import toastr from "toastr";
import { Link } from "react-router-dom";
import { getCustomerByEmail } from "../../store/slices/getCustomerByEmailSlice";

type SignInProps = {
  setIsSignedIn: (value: boolean) => void;
}

const SignIn = ({setIsSignedIn}:SignInProps) => {
  const initialValues = { email: "", password: "" };
  useAppSelector(state => state.getCustomerByEmail.data?.id);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const dispatch = useAppDispatch();
  console.log(tokenService.decodeToken());
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: signInRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        await dispatch(postSignIn(values));
        await authService.authenticate(values);
        await dispatch(getCustomerByEmail(tokenService.decodeToken()?.sub));
        
        if(tokenService.decodeToken()?.sub === undefined){
          toastr.error("Incorrect email or password ","Caution")
        }else{
          toastr.success("Successfully Login")
          setIsSignedIn(true)
          window.history.scrollRestoration
        }
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
                <Link to="/signInSignUp" style={{color:'yellow'}}>
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
