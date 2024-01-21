// import React, { useEffect } from 'react';
// import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
// import { Form, Formik, Field } from 'formik';
// import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../store/configureStore';
// import { getCarCategory } from '../../store/slices/carCategorySlice';
// import * as yup from 'yup';
// import { getCarFuelType } from '../../store/slices/carFuelTypeSlice';
// import CarFuelFiter from './CarFuelFilter';




// type CarFilterProps = {
//   onFilterChange: (type: string) => void;
// };

// const CarFilter = ({ onFilterChange }: CarFilterProps) => {
//   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
//   const carTypes = useAppSelector(state => state.carType.data);
//   const fuelTypes = useAppSelector(state => state.carFuelType.data)

//   useEffect(() => {
//     dispatch(getCarCategory());
//     dispatch(getCarFuelType())
//   }, []);

//   console.log(fuelTypes)

//   const validationSchema = yup.object({
//     type: yup.string().required('Type is required'),
  
//   });

//   const initialValues = {
//     type: '',
//     fuelType:''
//   };

//   const handleSubmit = (values: any) => {
//     onFilterChange(values.type)

//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >

//       <Form>
//         <Field
//           as={TextField}
//           fullWidth
//           id="type"
//           name="type"
//           label="Car Type"
//           select
//           variant="outlined"
//         >
//           {carTypes.map((type) => (
//             <MenuItem key={type.id} value={type.name}>
//               {type.name}
//             </MenuItem>
//           ))}
//         </Field>

//         <Field
//           as={TextField}
//           fullWidth
       
//           label="Fuel Type"
//           select
//           variant="outlined"
//         >
//           {fuelTypes.map((fuel) => (
//             <MenuItem key={fuel.id} value={fuel.name}>
//               {fuel.name}
//             </MenuItem>
//           ))}
//         </Field>

//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Filter
//         </Button>
//       </Form>
//     </Formik>

//   );
// };

// export default CarFilter;
