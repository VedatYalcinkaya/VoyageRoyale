import React, { useEffect } from 'react'
import CarDetailsCard from '../../components/Card/CarDetailsCard'
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { getCarGearType } from '../../store/slices/CarSlices/carGearTypeSlice';
import { Box, Typography } from '@mui/material';
import SelectedReservationDetails from '../../components/Card/SelectedReservationDetails';


type Props = {}

const CarDetails = (props: Props) => {
  return (
    <div>
      <SelectedReservationDetails />
      <CarDetailsCard />
    </div>
  )
}

export default CarDetails