import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../../../models/CarModel/responses/response";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface GetAllCar {
  data: Car[];
  loading: boolean;
  error: string;
}

const initialState: GetAllCar = {
  data: [],
  loading: false,
  error: "",
};

export const getAllCar = createAsyncThunk('getAllCar', async () => {
  const response = await axiosInstance.get<Car[]>("/cars/getAll");
  return response.data;
});

export const getAllCarSlice = createSlice({
  name: 'getAllCar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCar.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getAllCar.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllCar.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching user data";
    });
  },
});

export default getAllCarSlice.reducer;
