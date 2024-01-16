import {combineReducers, configureStore} from '@reduxjs/toolkit'
import carListSlice from './slices/carListSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'




export const store = configureStore( {
    reducer:{
        carList:carListSlice
    }
})


export const useAppDispatch : () => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
