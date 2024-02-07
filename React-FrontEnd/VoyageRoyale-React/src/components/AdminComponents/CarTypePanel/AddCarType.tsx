import { Button } from '@mui/material';
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch } from '../../../store/configureStore';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { postCarType } from '../../../store/slices/addCarTypeSlice';
import { AddCarTypeRequest } from '../../../models/CarCarTypeModel/requests/addCarTypeRequest';
import { getCarCarType } from '../../../store/slices/CarSlices/carCarTypeSlice';

type Props = {}

function AddCarType() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })
  dispatch(getCarCarType());
  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddCarTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(postCarType(values));
      dispatch(getCarCarType());
    }}
    >
  
       
      <Form>
        <SecondFormikInput name="name"  label="Car Type Name" type='text' />
        <br />

        <Button type="submit" variant='contained'>Save</Button>
      </Form>

    </Formik>
  )
}

export default AddCarType