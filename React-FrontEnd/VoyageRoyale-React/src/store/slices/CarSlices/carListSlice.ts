import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../../../models/CarModel/response";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarList {
  data: Car[];
  loading: boolean;
  error: string;
}

interface ReservationInfo{
  pickupDate:string | null;
  returnDate:string | null;
  positionId:number | undefined;
}

const initialState: CarList = {
  data: [],
  loading: false,
  error: "",
};

export const getCarList = createAsyncThunk('getCarList', async (reservationInfo:ReservationInfo) => {
  const response = await axiosInstance.get<Car[]>(`/cars/getByReservationInputs?pickUpDate=${reservationInfo.pickupDate}&returnDate=${reservationInfo.returnDate}&positionId=${reservationInfo.positionId}`);
  return response.data;
});

export const carListSlice = createSlice({
  name: 'carList',
  initialState,
  reducers: {}, // You can add other reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(getCarList.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarList.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching user data";
    });
  },
});

export default carListSlice.reducer;
