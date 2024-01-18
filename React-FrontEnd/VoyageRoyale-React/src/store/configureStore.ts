import {combineReducers, configureStore} from '@reduxjs/toolkit'
import carListSlice from './slices/carListSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import carDetailSlice from './slices/carDetailSlice'
<<<<<<< HEAD
import carCategorySlice from './slices/carCategorySlice';
=======
import selectPositionSlice from './slices/selectPositionSlice';
>>>>>>> b140230f60f01fccbe0d8ed0030b620a2213831e


const vedat = "vedat";

export const store = configureStore( {
    reducer:{
        carList:carListSlice,
        carDetail:carDetailSlice,
<<<<<<< HEAD
        carCategory:carCategorySlice
=======
        positionList:selectPositionSlice
>>>>>>> b140230f60f01fccbe0d8ed0030b620a2213831e
    }
})


export const useAppDispatch : () => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
