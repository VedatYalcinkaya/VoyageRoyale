import { Button } from '@mui/material';
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch } from '../../../store/configureStore';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { getCarFuelType } from '../../../store/slices/CarSlices/carFuelTypeSlice';
import { AddFuelTypeRequest } from '../../../models/CarFuelTypeModel/requests/addFuelTypeRequest';
import { postFuelType } from '../../../store/slices/addFuelTypeSlice';


type Props = {}

function AddFuelType() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })
  dispatch(getCarFuelType());
  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddFuelTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(postFuelType(values));
      dispatch(getCarFuelType());
    }}
    >
  
       
      <Form>
        <SecondFormikInput name="name"  label="Fuel Type Name" type='text' />
        <br />

        <Button type="submit" variant='contained'>Save</Button>
      </Form>

    </Formik>
  )
}

export default AddFuelType