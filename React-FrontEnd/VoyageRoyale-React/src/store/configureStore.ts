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
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
