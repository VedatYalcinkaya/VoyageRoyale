import { configureStore } from "@reduxjs/toolkit";
import carListSlice from "./slices/CarSlices/carListSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import carDetailSlice from "./slices/CarSlices/carDetailSlice";
import selectPositionSlice from "./slices/selectPositionSlice";
import carCategorySlice from "./slices/CarSlices/carCategorySlice";
import carFuelTypeSlice from "./slices/CarSlices/carFuelTypeSlice";
import carBrandTypeSlice from "./slices/CarSlices/carBrandTypeSlice";
import carGearTypeSlice from "./slices/CarSlices/carGearTypeSlice";
import reservationSlice from "./slices/reservationSlice";
import paymentSlice from "./slices/paymentSlice";
import signUpSlice from "./slices/signUpSlice";
import addCarModelSlice from "./slices/addCarModelSlice";
import addCarCategorySlice from "./slices/addCarCategorySlice";
import carColorSlice from "./slices/CarSlices/carColorSlice";
import carModelSlice from "./slices/CarSlices/carModelSlice";
import customerInfoSlice from "./slices/CustomerSlices/customerInfoSlice";
import addCarSlice from "./slices/addCarSlice";
import updateCustomerSlice from "./slices/CustomerSlices/updateCustomerSlice";
import signInSlice from "./slices/signInSlice";
import loadingSlice from "./slices/loadingSlice";


export const store = configureStore({
  reducer: {
    carList: carListSlice,
    carDetail: carDetailSlice,
    positionList: selectPositionSlice,
    carType: carCategorySlice,
    carFuelType: carFuelTypeSlice,
    carBrandType: carBrandTypeSlice,
    carGearType: carGearTypeSlice,
    carCategory: carCategorySlice,
    reservation: reservationSlice,
    payment: paymentSlice,
    signUp: signUpSlice,
    addCarCategory:addCarCategorySlice,
    addCarModel:addCarModelSlice,
    carColor:carColorSlice,
    customerInfo: customerInfoSlice,
    carModel:carModelSlice,
    addCar:addCarSlice,
    updateCustomer: updateCustomerSlice,
    signIn: signInSlice,
    loading:loadingSlice

  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
