import {combineReducers, configureStore} from '@reduxjs/toolkit'
import carListSlice from './slices/carListSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import carDetailSlice from './slices/carDetailSlice'
import selectPositionSlice from './slices/selectPositionSlice';
import carCategorySlice from './slices/carCategorySlice';
import reservationSlice from './slices/reservationSlice';


const vedat = "vedat";

export const store = configureStore( {
    reducer:{
        carList:carListSlice,
        carDetail:carDetailSlice,
        positionList:selectPositionSlice,
        carCategory:carCategorySlice,
        reservation: reservationSlice,
    }
})


export const useAppDispatch : () => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
