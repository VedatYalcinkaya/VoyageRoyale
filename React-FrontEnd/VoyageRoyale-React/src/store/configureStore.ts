import {combineReducers, configureStore} from '@reduxjs/toolkit'
import carListSlice from './slices/CarSlices/carListSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import carDetailSlice from './slices/CarSlices/carDetailSlice'
import selectPositionSlice from './slices/selectPositionSlice';
<<<<<<< HEAD
import carCategorySlice from './slices/CarSlices/carCategorySlice';
import carFuelTypeSlice from './slices/CarSlices/carFuelTypeSlice';
import carBrandTypeSlice from './slices/CarSlices/carBrandTypeSlice';
import carGearTypeSlice from './slices/CarSlices/carGearTypeSlice';
=======
import carCategorySlice from './slices/carCategorySlice';
import reservationSlice from './slices/reservationSlice';
>>>>>>> a9e7e96219a65b6b5546a2458b37981de1106398


const vedat = "vedat";

export const store = configureStore( {
    reducer:{
        carList:carListSlice,
        carDetail:carDetailSlice,
        positionList:selectPositionSlice,
<<<<<<< HEAD
        carType:carCategorySlice,
        carFuelType:carFuelTypeSlice,
        carBrandType:carBrandTypeSlice,
        carGearType:carGearTypeSlice
=======
        carCategory:carCategorySlice,
        reservation: reservationSlice,
>>>>>>> a9e7e96219a65b6b5546a2458b37981de1106398
    }
})


export const useAppDispatch : () => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
