import { Button,  MenuItem, Select } from '@mui/material';
import {  Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { AddModelRequest } from '../../../models/ModelModel/requests/addModelRequest';
import { CarBrandType } from '../../../models/CarBrandModel/responses/response';
import { useEffect } from 'react';
import { getCarBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';
import { postCarModel } from '../../../store/slices/addCarModelSlice';
import { getAllModel } from '../../../store/slices/CarSlices/carModelSlice';

type Props = {}

function AddModel() {
    const dispatch = useAppDispatch();
    const brands:CarBrandType[] = useAppSelector(state => state.carBrandType.data);

  const initialValues = {name: "" , brandId:0}

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Filling name field is must.")
      .min(2, "Name must be at least 2 character."),
    brandId: Yup.number().moreThan(0)
  })

  useEffect(()=>{
    dispatch(getCarBrandType());
    dispatch(getAllModel());
  },[])
  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
    onSubmit={ async (values: AddModelRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        await dispatch(postCarModel(values));
        dispatch(getAllModel());
      }}
    >
  
       
      <Form>
        
        <SecondFormikInput name="name" label="Model Name" type="text"/>
        <br />
        <br />

        <Field as={Select} name="brandId">
        <MenuItem value="0">Select A Brand</MenuItem>
            {brands.map((brand) => <MenuItem value={brand.id} key={brand.id}>{brand.name}</MenuItem>)}
        </Field>
        <br />
        <br />
        <Button type="submit" variant='contained'>Save</Button>
      </Form>

    </Formik>
  )
}

export default AddModel;