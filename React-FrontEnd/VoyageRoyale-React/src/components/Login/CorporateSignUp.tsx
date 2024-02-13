import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit/react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { postSignUp } from "../../store/slices/signUpSlice";
import { postSignIn } from "../../store/slices/signInSlice"; // Import postSignIn action
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../FormikInput/SecondFormikInput";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRequest } from "../../models/UserModel/requests/request";
import { CorporateSignUpRequest } from "../../models/UserModel/requests/corporateSignUpRequest";
import { postCorporateSignUp } from "../../store/slices/corporateSignUpSlice";

export default function SignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.signUp.loading);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (openSuccess) {
      toast.success("Your account has been successfully created!");
    }
    if (openFailure) {
      toast.error("Account creation failed.");
    }
  }, [openSuccess, openFailure]);

  const initialValues = {
    companyName: "",
    taxNo: "",
    email: "",
    password: "",
    authorities: ["USER", "CORPORATE_CUSTOMER"],
  };

  const validationSchema = Yup.object({
    companyName: Yup.string()
      .required("Company name is required!")
      .min(2, "Type at least 2 characters"),
    taxNo: Yup.string()
      .required("Tax Number is required")
      .min(11, "Tax number must be 11 characters"),
    email: Yup.string().required("Email is required!").email(),
    password: Yup.string().required("Password is required!"),
  });

  return (
    <>
      <Box>
        <Formik
          initialValues={initialValues} validationSchema={validationSchema}
          onSubmit={async (values: CorporateSignUpRequest, { resetForm }) => {
            console.log(values);
            resetForm();
            await dispatch(postCorporateSignUp(values))}}
        >
        
            <Form>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
                    Corporate Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondFormikInput
                    name="companyName"
                    label="Company Name*"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                  <SecondFormikInput
                    name="taxNo"
                    label="Tax Number*"
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
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  height: 40,
                  color: "#D4D2A9",
                  backgroundColor: "#0F4037",
                  "&:hover": {
                    backgroundColor: "#A3794F",
                    color: "#0F4037",
                  },
                }}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>

        </Formik>
      </Box>
    </>
  );
}
