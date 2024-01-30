import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddBrandRequest } from '../../models/CarBrandModel/requests/addBrandRequest';
import FormikInput from '../../components/FormikInput/FormikInput';

type Props = {}

function AddBrand({ }: Props) {
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })

  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={async(values:AddBrandRequest, formikBag) => {

        try {
          console.log(values.name)
          const response = await axiosInstance.post('brands/add', values);
          console.log("Server response:", response.data);
          formikBag.resetForm();
        } catch (error) {
          console.error("Error posting brand data:", error);
        }
        formikBag.setSubmitting(false);
      }}
    >
  
       {formikBag => (
      <Form>
        <FormikInput name="name" id="name" label="Brand Name" formikBag={formikBag} />
        {/* <Field
          as={TextField}
          fullWidth
          id="name"
          name="name"
          label="Brand Name"
          value={formikBag.values.name}
        /> */}

        <Button type="submit">Save</Button>
      </Form>)}

    </Formik>
  )
}

export default AddBrand