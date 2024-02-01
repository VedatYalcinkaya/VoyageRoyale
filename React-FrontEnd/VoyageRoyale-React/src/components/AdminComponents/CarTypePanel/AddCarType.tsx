import { Button } from '@mui/material';
import {  Form, Formik } from 'formik'
import * as Yup from "yup";
import { AddCarCategoryRequest } from '../../../models/CarCategoryModel/requests/addCarCategoryRequest';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch } from '../../../store/configureStore';
import { postCarCategory } from '../../../store/slices/addCarCategorySlice';

type Props = {}

function AddCarType() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Filling name field is must.")
      .min(2, "Name must be at least 2 character."),
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={(values: AddCarCategoryRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        dispatch(postCarCategory(values))
      }}
    >
  
       
      <Form>
        
        <SecondFormikInput name="name" label="CarType Name" type="text"/>

        <Button type="submit">Save</Button>
      </Form>

    </Formik>
  )
}

export default AddCarType;