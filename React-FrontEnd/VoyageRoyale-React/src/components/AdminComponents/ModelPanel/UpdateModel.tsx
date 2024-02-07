import { Button, MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { useEffect } from 'react';
import { getCarBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';
import { CarBrandType } from '../../../models/CarBrandModel/responses/response';
import { getAllModel } from '../../../store/slices/CarSlices/carModelSlice';
import { GetAllModelResponse } from '../../../models/ModelModel/responses/getAllModelResponse';
import { updateModel } from '../../../store/slices/updateModelSlice';
import { UpdateModelRequest } from '../../../models/ModelModel/requests/updateModelRequest';


function UpdateModel() {
  const dispatch = useAppDispatch();
  const brands:CarBrandType[] = useAppSelector(state => state.carBrandType.data)
  const models:GetAllModelResponse[] =useAppSelector(state => state.carModel.data);
  const initialValues = {  id:0,name: "",brandId:0 }

  const validationSchema = Yup.object({
    id: Yup.number().positive(),
    name: Yup.string()
      .required("Title field is a must!")
      .min(2, "Title must be at least 2 character."),
      brandId: Yup.number().positive()
  })


  useEffect(()=>{
    dispatch(getCarBrandType());
    dispatch(getAllModel());
  },[])
console.log(brands);

  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: UpdateModelRequest, { resetForm }) => {
      console.log(values);
      resetForm();
console.log(brands);
     await dispatch(updateModel(values))
     dispatch(getAllModel())
    }}
    >
  
       
      <Form>
        
        <SecondFormikInput name='name' label='Updated Model Name' type='text' />
        <br />

        <Field as={Select} name="id">
        <MenuItem value="0">Select A Model For Update</MenuItem>
            {models.map((model) => <MenuItem value={model.id} key={model.id}>{model.name}</MenuItem>)}
        </Field>
        <br />
        <Field as={Select} name="brandId">
        <MenuItem value="0">Select The Model Brand</MenuItem>
            {brands.map((brand) => <MenuItem value={brand.id} key={brand.id}>{brand.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Update</Button>
      </Form>

    </Formik>
  )
}

export default UpdateModel