import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { updateBrand } from '../../../store/slices/updateBrandSlice';
import { UpdateBrandRequest } from '../../../models/CarBrandModel/requests/updateBrandRequest';
import { useEffect } from 'react';
import { getCarBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';
import { CarBrandType } from '../../../models/CarBrandModel/responses/response';


function UpdateBrand() {
  const dispatch = useAppDispatch();
  const brands:CarBrandType[] = useAppSelector(state => state.carBrandType.data)

  const initialValues = {  name: "",id:0 }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Title field is a must!")
      .min(2, "Title must be at least 2 character."),
    id: Yup.number().integer()
  })


  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateBrandRequest, { resetForm }) => {
      console.log(values);
      resetForm();
      await dispatch(updateBrand(values))
      dispatch(getCarBrandType())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Updated Brand Name' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select A Brand For Update</MenuItem>
            {brands.map((brand) => <MenuItem value={brand.id} key={brand.id}>{brand.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateBrand