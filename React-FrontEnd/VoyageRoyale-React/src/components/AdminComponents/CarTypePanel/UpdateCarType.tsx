import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { UpdateCarTypeRequest } from '../../../models/CarCarTypeModel/requests/updateCarTypeRequest';
import { updateCarType } from '../../../store/slices/updateCarTypeSlice';
import { getCarCarType } from '../../../store/slices/CarSlices/carCarTypeSlice';
import { CarCarType } from '../../../models/CarCarTypeModel/responses/response';


function UpdateCarType() {
  const dispatch = useAppDispatch();
  const carTypes:CarCarType[] = useAppSelector(state => state.carCarType.data)

  const initialValues = {  name: "",id:0 }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Title field is a must!")
      .min(2, "Title must be at least 2 character."),
    id: Yup.number().integer()
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateCarTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(updateCarType(values))
      dispatch(getCarCarType())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Updated Car Type Name' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select A Car Type For Update</MenuItem>
            {carTypes.map((carType) => <MenuItem value={carType.id} key={carType.id}>{carType.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateCarType