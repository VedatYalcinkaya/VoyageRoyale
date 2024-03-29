import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";
import { signInRequest } from "../../models/UserModel/requests/signInRequest";
import { isSignedIn, postSignIn } from "../../store/slices/signInSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import authService from "../../services/authService";
import tokenService from "../../services/tokenService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getCustomerByEmail } from "../../store/slices/getCustomerByEmailSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

type SignInProps = {
  closeSignInDrawer:() => void;
}

const SignIn = ({closeSignInDrawer }:SignInProps) => {
  const initialValues = { email: "", password: "" };
  useAppSelector(state => state.getCustomerByEmail.data?.id);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  
  const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  
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
        console.log(tokenService.decodeToken());
        if(tokenService.decodeToken()?.sub === undefined){
          toast.error("Incorrect email or password ")
        }else{
          toast.success("Login Successfull")
          dispatch(isSignedIn(true));
        }
      }}
    >
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:"#BC9160",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontSize:20,fontWeight:"bold", color: "#0F4037", mt:2, mb:2 }}>
            Welcome to Voyage Royale! 👋🏻
          </Typography>
          <Typography sx={{ fontSize:12,color: "#0F4037"}}>
            Please sign in to your account and start the adventure
          </Typography>
          <Form>
          <div style={{marginTop: 10, marginBottom: 15,width: "100%" }} >
            <SecondFormikInput name="email" label="Email" type="text" />
            </div>
            <SecondFormikInput
              name="password"
              label="Password"
              type="password"
            /><br/>
            <Button
              type="submit"
              sx={{
                mb: 2,mt:2,
                
                color:"#D4D2A9",
                backgroundColor: "#0F4037",             
                "&:hover": {
                  backgroundColor: "#0B352D",
                  
                    }}}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item sx={{mb:5,mt:2}}>
                <Link to="/signInSignUp" style={{color:"#0F4037"}} onClick={closeSignInDrawer}>
                  <u>Don't have an account? Sign Up</u>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
    </Formik>
  );
};

export default SignIn;
