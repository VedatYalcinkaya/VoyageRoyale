import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddCarRequest } from '../../models/CarModel/requests/addCarRequest';

interface AddCar{
  data: AddCarRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddCar = {
  data: null,
  loading: false,
  error: "",
};

export const postCar = createAsyncThunk('postCar', async (car:AddCarRequest) => {
  try {
    const response = await axiosInstance.post('/cars/add', car);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addCarSlice = createSlice({
  name: 'addCar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCar.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postCar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addCarSlice.reducer;
