import * as Yup from "yup";
import { AddGearTypeRequest } from "../../models/carGearTypeModel/requests/addGearTypeRequest";
import { Form, Formik } from "formik";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/material";

type Props = {};

function AddGearType({}: Props) {
  const initialValues = { name: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Gear type name is required.")
      .min(2, "Gear type name should be at least 2 characters."),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: AddGearTypeRequest, formikBag) => {
        try {
          console.log(values.name);
          const response = await axiosInstance.post("gear_types/add", values);
          console.log("Server response:", response.data);
          formikBag.resetForm();
        } catch (error) {
          console.error("Error posting brand data:", error);
        }
        formikBag.setSubmitting(false);
      }}
    >
      {(formikBag) => (
        <Form>
          <FormikInput
            name="name"
            id="name"
            label="Gear Type"
            formikBag={formikBag}
          />

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddGearType;
