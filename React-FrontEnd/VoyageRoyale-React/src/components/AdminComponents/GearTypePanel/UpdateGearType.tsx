import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { updateGearType } from '../../../store/slices/updateGearTypeSlice';
import { getCarGearType } from '../../../store/slices/CarSlices/carGearTypeSlice';
import { UpdateGearTypeRequest } from '../../../models/carGearTypeModel/requests/updateGearTypeRequest';
import { CarGearType } from '../../../models/carGearTypeModel/responses/response';


function UpdateGearType() {
  const dispatch = useAppDispatch();
  const gearTypes = useAppSelector(state => state.carGearType.data)

  const initialValues = {  name: "",id:0 }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Title field is a must!")
      .min(2, "Title must be at least 2 character."),
    id: Yup.number().integer()
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateGearTypeRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(updateGearType(values))
      dispatch(getCarGearType())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Updated Gear Type Name' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select a Gear Type to be Updated</MenuItem>
            {gearTypes.map((gearType: CarGearType) => <MenuItem value={gearType.id} key={gearType.id}>{gearType.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateGearType