import React from "react";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { UpdateLocationRequest } from "../../../models/LocationModel/requests/updateLocationRequest";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../store/configureStore";
import { updateLocation } from "../../../store/slices/LocationSlices/updateLocationSlice";
import { PayloadAction } from "@reduxjs/toolkit";

interface UpdateLocationProps {
  initialData?: UpdateLocationRequest;
}

const validationSchema = Yup.object({
  latitude: Yup.number().required("Latitude is required."),
  longitude: Yup.number().required("Longitude is required."),
  city: Yup.string().required("City is required."),
});

const UpdateLocation: React.FC<UpdateLocationProps> = ({
  initialData = { id: 0, latitude: 0, longitude: 0, city: "" },
}) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, PayloadAction>>();

  const handleSubmit = async (
    values: UpdateLocationRequest,
    formikHelpers: FormikHelpers<UpdateLocationRequest>
  ) => {
    try {
      console.log(values);
      await dispatch(updateLocation({ ...initialData, ...values }));
      formikHelpers.resetForm();
    } catch (error) {
      console.error("Error updating location data:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikBag) => (
        <Form>
          <FormikInput name="latitude" label="Latitude" type="number" />
          <FormikInput name="longitude" label="Longitude" type="number" />
          <FormikInput name="city" label="City" type="text" />

          <Button
            type="submit"
            variant="contained"
            disabled={formikBag.isSubmitting}
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateLocation;
