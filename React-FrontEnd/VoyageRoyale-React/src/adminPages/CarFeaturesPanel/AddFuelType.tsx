import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { addFuelTypeRequest } from "../../models/CarFuelTypeModel/requests/addFuelTypeRequest";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import FormikInput from "../../components/FormikInput/FormikInput";

type Props = {};

function AddFuelType({}: Props) {
  const initialValues = { fuel_name: "" };

  const validationSchema = Yup.object({
    fuel_name: Yup.string()
      .required("Fuel type name is required.")
      .min(2, "Fuel type name should be at least 2 characters."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: addFuelTypeRequest, formikBag) => {
        try {
          console.log(values.fuel_name);
          const response = await axiosInstance.post("fuel_types/add", values);
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
          <FormikInput
            name="fuel_name"
            id="name"
            label="Fuel Type"
            formikBag={formikBag}
          />

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddFuelType;
