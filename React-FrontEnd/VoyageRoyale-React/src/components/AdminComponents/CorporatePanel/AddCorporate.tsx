import { ThunkDispatch } from "@reduxjs/toolkit/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { useAppDispatch } from "../../../store/configureStore";
import { CorporateSignUpRequest } from "../../../models/UserModel/requests/corporateSignUpRequest";
import { postCorporateSignUp } from "../../../store/slices/corporateSignUpSlice";
import { getAllCorporate } from "../../../store/slices/CorporateCustomerSlice/getAllCorporateSlice";
export default function SignUp() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();




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
            await dispatch(postCorporateSignUp(values))
            dispatch(getAllCorporate())
          }}
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
                {"Save"}
              </Button>
            </Form>

        </Formik>
      </Box>
    </>
  );
}
