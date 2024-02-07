import { Button } from '@mui/material';
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch } from '../../../store/configureStore';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { AddColorRequest } from '../../../models/ColorModel/requests/addColorRequest';
import { getAllColor } from '../../../store/slices/CarSlices/carColorSlice';
import { postColor } from '../../../store/slices/addColorSlice';

type Props = {}

function AddColor() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "", code:""}

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
      code: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })
  dispatch(getAllColor());
  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddColorRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(postColor(values));
      dispatch(getAllColor());
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

export default AddColor