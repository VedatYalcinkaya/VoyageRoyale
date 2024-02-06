import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { AddLocationRequest } from "../../../models/LocationModel/requests/addLocationRequest";
import { AppDispatch } from "../../../store/configureStore";
import { addLocation } from "../../../store/slices/LocationSlices/addLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCarLocations,
  selectLocations,
} from "../../../store/slices/CarSlices/carLocationSlice";
import { Position } from "../../../models/LocationModel/responses/response";

const AddLocation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations: Position[] = useSelector(selectLocations);

  useEffect(() => {
    dispatch(getCarLocations());
  }, [dispatch]);

  const initialValues: AddLocationRequest = {
    latitude: 0,
    longitude: 0,
    city: "",
  };

  const validationSchema = Yup.object({
    latitude: Yup.number().required("Latitude is required."),
    longitude: Yup.number().required("Longitude is required."),
    city: Yup.string().required("City is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: AddLocationRequest, formikBag) => {
        try {
          console.log(values);
          await dispatch(addLocation(values));
          formikBag.resetForm();
          dispatch(getCarLocations());
        } catch (error) {
          console.error("Error adding location data:", error);
        }
        formikBag.setSubmitting(false);
      }}
    >
      {(formikBag) => (
        <Form>
          <FormikInput
            name="latitude"
            label="Latitude"
            type="number"
          />
          <FormikInput name="longitude" label="Longitude" type="number" />
          <FormikInput name="city" label="City" type="text" />

          <Button
            type="submit"
            variant="contained"
            disabled={formikBag.isSubmitting}
          >
            Save
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

export default AddLocation;
