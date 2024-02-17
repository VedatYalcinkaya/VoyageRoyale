import React, { useEffect } from 'react'
import CarDetailsCard from '../../components/Card/CarDetailsCard'
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { getCarGearType } from '../../store/slices/CarSlices/carGearTypeSlice';
import { Box } from '@mui/material';
import { getCarCarType } from '../../store/slices/CarSlices/carCarTypeSlice';

type Props = {}

const CarDetails = (props: Props) => {
  // const dispatch: ThunkDispatch<any, any, Action> = useAppDispatch();
  // const loading = useAppSelector((state) => state.loading.requestCount);
  
  // useEffect(() => { 
  //   dispatch(getCarGearType());
    
  // }, []);
  
  // if (loading > 0) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <img
  //       src="https://s9.gifyu.com/images/SFpW6.gif"
  //       width={"10%"}/>
  //     </Box>
  //   );
  // } else {
  return (
    <div><CarDetailsCard/></div>
  )
  }
//}

export default CarDetails