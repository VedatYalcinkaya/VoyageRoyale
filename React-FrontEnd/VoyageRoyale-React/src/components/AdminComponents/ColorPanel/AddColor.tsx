import { Box, Button } from '@mui/material';
import {  Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch } from '../../../store/configureStore';
import { postCarCategory } from '../../../store/slices/addCarCategorySlice';
import { AddColorRequest } from '../../../models/ColorModel/requests/addColorRequest';

type Props = {}

function AddColor() {
  const dispatch = useAppDispatch();
  const initialValues = { name: "", code:"" }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Filling name field is must.")
      .min(2, "Name must be at least 2 character."),
      code: Yup.string()
      .required("Code field is must.")
      .min(2, "Code must be at least 2 character."),
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={(values: AddColorRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        dispatch(postCarCategory(values))
      }}
    >
  
       
      <Form>
        <Box justifyItems="end">
        <SecondFormikInput name="name" label="Color Name" type="text"/>
        <SecondFormikInput name="code" label="Hex Code" type="text"/>

        <Button type="submit">Save</Button>
        </Box>
      </Form>
      

    </Formik>
  )
}

export default AddColor;