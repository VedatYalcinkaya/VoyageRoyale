import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { CarFuelType } from '../../../models/CarFuelTypeModel/responses/response';
import { UpdateFuelTypeRequest } from '../../../models/CarFuelTypeModel/requests/updateFuelTypeRequest';
import { updateFuelType } from '../../../store/slices/updateFuelTypeSlice';
import { getCarFuelType } from '../../../store/slices/CarSlices/carFuelTypeSlice';


function UpdateFuelType() {
  const dispatch = useAppDispatch();
  const fuelTypes:CarFuelType[] = useAppSelector(state => state.carFuelType.data)

  const initialValues = {  name: "", id:0 }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Title field is a must!")
      .min(2, "Title must be at least 2 character."),
    id: Yup.number().integer()
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateFuelTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(updateFuelType(values))
      dispatch(getCarFuelType())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Updated Fuel Type Name' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select a Gear Type to be Updated</MenuItem>
            {fuelTypes.map((fuelType) => <MenuItem value={fuelType.id} key={fuelType.id}>{fuelType.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateFuelType