import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../store/configureStore";
import { getCustomerInfo } from "../../store/slices/CustomerSlices/customerInfoSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { putCustomer } from "../../store/slices/CustomerSlices/updateCustomerSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { uploadCarImage } from "../../store/slices/addCarSlice";

const UserProfileCard: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const customer = useAppSelector((state) => state.customerInfo.data);
  const email = useAppSelector((state) => state.getCustomerByEmail.data?.email);

  const [initialFormValues, setInitialFormValues] = useState({
    id: 0,
    userId: 0,
    firstName: "",
    lastName: "",
    userEmail: "",
    tcNo: "",
    birthDate: "",
    userImagePath: "",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getCustomerInfo(email));
  }, [dispatch]);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      setInitialFormValues(JSON.parse(storedCustomer));
    }
  }, []);

  useEffect(() => {
    if (customer) {
      localStorage.setItem("customer", JSON.stringify(customer));
      setInitialFormValues({
        id: customer?.id || 0,
        userId: customer?.userId || 0,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        userEmail: customer.userEmail || "",
        tcNo: customer.tcNo || "",
        birthDate: customer.birthDate || "",
        userImagePath: customer.userImagePath || "",
      });
    }
  }, [customer]);

  const validationSchema = Yup.object({
    id: Yup.number().moreThan(0),
    firstName: Yup.string().required("First Name cannot be empty!"),
    lastName: Yup.string().required("Last Name cannot be empty!"),
    userEmail: Yup.string()
      .email("Must be email format!")
      .required("Email is required"),
    tcNo: Yup.string().length(11, "Must be 11 characters"),
    birthDate: Yup.string().required("Birth date is required"),
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={async (values: any, { setSubmitting }) => {
        if (imageFile) {
          try {
            const imageResponse = await dispatch(
              uploadCarImage(imageFile)
            ).unwrap();
            values.userImagePath = imageResponse;
          } catch (error) {
            console.error("Error uploading image", error);
            setSubmitting(false); 
            return;
          }
        }

        dispatch(putCustomer(values))
          .unwrap()
          .then((updatedCustomer) => {
            dispatch(getCustomerInfo(email))
              .unwrap()
              .then((freshCustomer) => {
                setInitialFormValues(freshCustomer);
              })
              .catch((error) =>
                console.error("Could not fetch updated customer:", error)
              );
          })
          .catch((error) => {
            console.error("Update failed:", error);
          })
          .finally(() => {
            setSubmitting(false);
            setIsFormDirty(false);
          });
      }}
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container sx={{ pl: 10, pr: 10 }}>
            <Grid item xs={12} textAlign={"center"}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  backgroundColor: "#0F4037",
                  height: 100,
                }}
              >
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    id="file"
                  />
                  <Button component="span">
                    <img
                      src={
                        values.userImagePath ||
                        "https://i.ibb.co/4KynzQ7/avatar2.png"
                      }
                      alt="Upload"
                      style={{
                        width: 130,
                        height: 130,
                        objectFit: "cover",
                        clipPath: "circle(50%)",
                        marginBottom: "-100px",
                      }}
                    />
                  </Button>
                </label>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{ padding: "20px", backgroundColor: "white" }}
              >
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Account
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, borderBottom: 1 }}>
                  Profile
                </Typography>
                <TextField
                  label="First Name"
                  value={values.firstName || ""}
                  name="firstName"
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setIsFormDirty(true);
                  }}
                  error={touched.firstName && Boolean(errors.firstName)}
                  style={{ marginBottom: "20px", marginRight: "20px" }}
                />
                <TextField
                  label="Last Name"
                  value={values.lastName || ""}
                  name="lastName"
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setIsFormDirty(true);
                  }}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
                <Typography variant="h6" sx={{ mb: 3, borderBottom: 1 }}>
                  Email
                </Typography>
                <TextField
                  label="E-mail"
                  value={values.userEmail || ""}
                  name="userEmail"
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setIsFormDirty(true);
                  }}
                  error={touched.userEmail && Boolean(errors.userEmail)}
                  style={{ marginBottom: "20px", marginRight: "20px" }}
                />
                <Typography variant="h6" sx={{ mb: 3, borderBottom: 1 }}>
                  Birthdate
                </Typography>
                <TextField
                  label="Birth Date"
                  value={values.birthDate || ""}
                  name="birthDate"
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setIsFormDirty(true);
                  }}
                  error={touched.birthDate && Boolean(errors.birthDate)}
                />
                <br />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  disabled={!isFormDirty}
                >
                  Update
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileCard;