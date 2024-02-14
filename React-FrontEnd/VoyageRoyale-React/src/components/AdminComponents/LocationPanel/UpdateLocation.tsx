import React, { useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { UpdateLocationRequest } from "../../../models/LocationModel/requests/updateLocationRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/configureStore";
import { updateLocation } from "../../../store/slices/LocationSlices/updateLocationSlice";
import { Position } from "../../../models/LocationModel/responses/response";
import {
  selectLocations,
  getCarLocations,
} from "../../../store/slices/CarSlices/carLocationSlice";

const UpdateLocation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations: Position[] = useSelector(selectLocations);

  useEffect(() => {
    dispatch(getCarLocations());
  }, [dispatch]);

  const initialValues: UpdateLocationRequest = {
    id: 0,
    latitude: 0,
    longitude: 0,
    city: "",
  };

  const validationSchema = Yup.object({
    id: Yup.number().moreThan(0, "Please select an id"),
    latitude: Yup.number().required("Latitude is required."),
    longitude: Yup.number().required("Longitude is required."),
    city: Yup.string().required("City is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: UpdateLocationRequest, formikBag) => {
        try {
          console.log(values);
          await dispatch(updateLocation(values));
          formikBag.resetForm();
          dispatch(getCarLocations());
        } catch (error) {
          console.error("Error updating location data:", error);
        }
        formikBag.setSubmitting(false);
      }}
    >
      {(formikBag) => (
        <Form>
          <Field as={Select} name="id">
            <MenuItem value={0}>Select a Position ID</MenuItem>
            {locations?.map((location) => (
              <MenuItem value={location.id} key={location.id}>
                {location.id}
              </MenuItem>
            ))}
          </Field>
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
          <div>
            {locations.map((location) => (
              <div key={location.id}></div>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateLocation;
