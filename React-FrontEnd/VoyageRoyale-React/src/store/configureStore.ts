import { configureStore } from "@reduxjs/toolkit";
import carListSlice from "./slices/CarSlices/carListSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import carDetailSlice from "./slices/CarSlices/carDetailSlice";
import selectPositionSlice from "./slices/selectPositionSlice";
import carBrandTypeSlice from "./slices/CarSlices/carBrandTypeSlice";
import carFuelTypeSlice from "./slices/CarSlices/carFuelTypeSlice";
import carGearTypeSlice from "./slices/CarSlices/carGearTypeSlice";
import reservationSlice from "./slices/reservationSlice";
import paymentSlice from "./slices/paymentSlice";
import signUpSlice from "./slices/signUpSlice";
import addCarModelSlice from "./slices/addCarModelSlice";
import carColorSlice from "./slices/CarSlices/carColorSlice";
import carModelSlice from "./slices/CarSlices/carModelSlice";
import customerInfoSlice from "./slices/CustomerSlices/customerInfoSlice";
import addCarSlice from "./slices/addCarSlice";
import updateCustomerSlice from "./slices/CustomerSlices/updateCustomerSlice";
import signInSlice from "./slices/signInSlice";
import loadingSlice from "./slices/loadingSlice";
import updateBrandSlice from "./slices/updateBrandSlice";
import deleteBrandSlice from "./slices/deleteBrandSlice";
import updateModelSlice from "./slices/updateModelSlice";
import deleteModelSlice from "./slices/deleteModelSlice";
import addBrandSlice from "./slices/addBrandSlice";
import updateCarSlice from "./slices/updateCarSlice";
import getAllCarSlice from "./slices/CarSlices/getAllCarSlice";
import deleteCarSlice from "./slices/deleteCarSlice";
import addColorSlice from "./slices/addColorSlice";
import updateColorSlice from "./slices/updateColorSlice";
import deleteColorSlice from "./slices/deleteColorSlice";
import updateFuelTypeSlice from "./slices/updateFuelTypeSlice";
import addFuelTypeSlice from "./slices/addFuelTypeSlice";
import deleteFuelTypeSlice from "./slices/deleteFuelTypeSlice";
import addGearTypeSlice from "./slices/addGearTypeSlice";
import updateGearTypeSlice from "./slices/updateGearTypeSlice";
import deleteGearTypeSlice from "./slices/deleteGearTypeSlice";
import addCarTypeSlice from "./slices/addCarTypeSlice";
import updateCarTypeSlice from "./slices/updateCarTypeSlice";
import carCarTypeSlice from "./slices/CarSlices/carCarTypeSlice";
import addLocationSlice from "./slices/LocationSlices/addLocationSlice";
import updateLocationSlice from "./slices/LocationSlices/updateLocationSlice";
import deleteLocationSlice from "./slices/LocationSlices/deleteLocationSlice";
import carLocationSlice from "./slices/CarSlices/carLocationSlice";
import getCustomerByEmailSlice from "./slices/getCustomerByEmailSlice";
import getAllInvoiceSlice from "./slices/getAllInvoiceSlice";
import addRentalSlice from "./slices/addRentalSlice";
import deleteInvoiceSlice from "./slices/deleteInvoiceSlice";
import deleteRentalSlice from "./slices/deleteRentalSlice";
import updateRentalSlice from "./slices/updateRentalSlice";
import corporateCustomerInfoSlice from "./slices/CorporateCustomerSlice/corporateCustomerInfoSlice";
import getAllUsersSlice from "./slices/getAllUsersSlice";
import getAllRentalSlice from "./slices/getAllRentalSlice";

export const store = configureStore({
  reducer: {
    carList: carListSlice,
    carDetail: carDetailSlice,
    positionList: selectPositionSlice,
    carFuelType: carFuelTypeSlice,
    carBrandType: carBrandTypeSlice,
    carCarType: carCarTypeSlice,
    carGearType: carGearTypeSlice,
    reservation: reservationSlice,
    payment: paymentSlice,
    signUp: signUpSlice,
    addCarCarType: addCarTypeSlice,
    addCarModel: addCarModelSlice,
    carColor: carColorSlice,
    customerInfo: customerInfoSlice,
    corporateCustomerInfo: corporateCustomerInfoSlice,
    carModel: carModelSlice,
    addCar: addCarSlice,
    updateCustomer: updateCustomerSlice,
    signIn: signInSlice,
    loading: loadingSlice,
    addBrand: addBrandSlice,
    updateBrand: updateBrandSlice,
    deleteBrand: deleteBrandSlice,
    updateModel: updateModelSlice,
    deleteModel: deleteModelSlice,
    updateCar: updateCarSlice,
    getAllCar: getAllCarSlice,
    deleteCar: deleteCarSlice,
    addRental: addRentalSlice,
    updateRental: updateRentalSlice,
    deleteRental: deleteRentalSlice,
    getCustomerByEmail: getCustomerByEmailSlice,
    addColor: addColorSlice,
    updateColor: updateColorSlice,
    deleteColor: deleteColorSlice,
    addFuelType: addFuelTypeSlice,
    updateFuelType: updateFuelTypeSlice,
    deleteFuelType: deleteFuelTypeSlice,
    adGearType: addGearTypeSlice,
    updateGearType: updateGearTypeSlice,
    deleteGearType: deleteGearTypeSlice,
    updateCarType: updateCarTypeSlice,
    deleteCarType: deleteGearTypeSlice,
    addCarType: addCarTypeSlice,
    addLocation: addLocationSlice,
    updateLocation: updateLocationSlice,
    deleteLocation: deleteLocationSlice,
    carLocation: carLocationSlice,
    getAllInvoice:getAllInvoiceSlice,
    deleteInvoice:deleteInvoiceSlice,
    getAllUsers:getAllUsersSlice,
    getAllRentals:getAllRentalSlice
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
