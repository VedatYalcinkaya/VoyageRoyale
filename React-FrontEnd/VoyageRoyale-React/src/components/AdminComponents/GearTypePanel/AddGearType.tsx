import { Button } from '@mui/material';
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch } from '../../../store/configureStore';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { AddGearTypeRequest } from '../../../models/CarGearTypeModel/requests/addGearTypeRequest';
import { getCarGearType } from '../../../store/slices/CarSlices/carGearTypeSlice';
import { postGearType } from '../../../store/slices/addGearTypeSlice';

type Props = {}

function AddGearType() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Başlık alanı zorunludur.")
      .min(2, "Başlık en az 2 haneden oluşmalıdır."),
  })
  dispatch(getCarGearType());
  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddGearTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(postGearType(values));
      dispatch(getCarGearType());
    }}
    >
  
       
      <Form>
        <SecondFormikInput name="name"  label="Gear Type Name" type='text' />
        <br />

        <Button type="submit" variant='contained'>Save</Button>
      </Form>

    </Formik>
  )
}

export default AddGearType