import { ThunkDispatch } from "@reduxjs/toolkit/react";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/configureStore";
import { UserRequest } from "../../../models/UserModel/requests/request";
import { postSignUp } from "../../../store/slices/signUpSlice";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { toast } from "react-toastify";
import { getAllCustomer } from "../../../store/slices/CustomerSlices/getAllCustomersSlice";

export default function AddCustomer() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();


  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    tcNo: "",
    birthDate: undefined,
    authorities: ["USER", "CUSTOMER"],
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
    birthDate: Yup.number().moreThan(1900).required("Birth Date is required!"),
  });

  return (
    <>
      <Box>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={async(values: UserRequest, { resetForm }) => {
            console.log(values);
            try {
                resetForm();
            await dispatch(postSignUp(values))
            dispatch(getAllCustomer())
            } catch (error:any) {
                toast.error(error.message);
            }
            
          }}
        >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                  <SecondFormikInput
                    name="birthDate"
                    label="Birth Date"
                    type="number"
                  />
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
                {"Save"}
              </Button>
            </Form>
        </Formik>
      </Box>
    </>
  );
}
