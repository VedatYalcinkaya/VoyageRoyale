import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import FormikInput from "../../FormikInput/FormikInput";
import { AddLocationRequest } from "../../../models/LocationModel/requests/addLocationRequest";

type Props = {};

function AddLocation({}: Props) {
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
          const response = await axiosInstance.post("locations/add", values);
          console.log("Server response: ", response.data);
          formikBag.resetForm();
        } catch (error) {
          console.error("Error posting fuel type data:", error);
        }
        formikBag.setSubmitting(false);
      }}
    >
      {(formikBag) => (
        <Form>
          <Field
            as={FormikInput}
            name="latitude"
            id="latitude"
            label="Latitude"
            formikBag={formikBag}
          />
          <Field
            as={FormikInput}
            name="longitude"
            id="longitude"
            label="Longitude"
            formikBag={formikBag}
          />
          <Field
            as={FormikInput}
            name="city"
            id="city"
            label="City"
            formikBag={formikBag}
          />

          <Button type="submit" disabled={formikBag.isSubmitting}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddLocation;
