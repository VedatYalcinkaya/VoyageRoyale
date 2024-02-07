import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { GetAllColorResponse } from '../../../models/ColorModel/responses/getAllColorResponse';
import { getAllColor } from '../../../store/slices/CarSlices/carColorSlice';
import { UpdateColorRequest } from '../../../models/ColorModel/requests/updateColorRequest';
import { updateColor } from '../../../store/slices/updateColorSlice';


function UpdateColor() {
  const dispatch = useAppDispatch();
  const colors:GetAllColorResponse[] = useAppSelector(state => state.carColor.data)

  const initialValues = {  name: "",id:0 }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Please type a name")
      .min(2, "Name must be at least 2 characters."),
    id: Yup.number().integer()
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateColorRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(updateColor(values))
      dispatch(getAllColor())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Color to be Updated' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select A Color For Update</MenuItem>
            {colors.map((color) => <MenuItem value={color.id} key={color.id}>{color.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateColor