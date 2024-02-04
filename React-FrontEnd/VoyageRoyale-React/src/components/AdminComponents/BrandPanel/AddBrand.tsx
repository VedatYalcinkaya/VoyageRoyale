import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import axiosInstance from '../../../utils/interceptors/axiosInterceptors';
import { AddBrandRequest } from '../../../models/CarBrandModel/requests/addBrandRequest';
import FormikInput from '../../FormikInput/FormikInput';
import { postBrand } from '../../../store/slices/addBrandSlice';
import { useAppDispatch } from '../../../store/configureStore';
import { getCarBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';

type Props = {}

function AddBrand() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })

  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddBrandRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(postBrand(values));
      dispatch(getCarBrandType());
    }}
    >
  
       
      <Form>
        <SecondFormikInput name="name"  label="Brand Name" type='text' />
        <br />

        <Button type="submit" variant='contained'>Save</Button>
      </Form>

    </Formik>
  )
}

export default AddBrand