import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../../../models/CarModel/response";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarDetail {
  data: Car|null;
  loading: boolean;
  error: string;
}

const initialState: CarDetail = {
  data: null,
  loading: false,
  error: "",
};

export const getCarDetail = createAsyncThunk('getCarList', async (id:number|undefined) => {
  const response = await axiosInstance.get<Car>('cars/getById?id='+id);
  return response.data;
});

export const carDetailSlice = createSlice({
  name: 'carList',
  initialState,
  reducers: {}, // You can add other reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(getCarDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarDetail.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading=false;
    });

    builder.addCase(getCarDetail.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching data"
    });
  },
});

export default carDetailSlice.reducer;