import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateBrandRequest } from '../../models/CarBrandModel/requests/updateBrandRequest';
import { UpdateCarRequest } from '../../models/CarModel/requests/updateCarRequest';


interface UpdateCar{
  data: UpdateCarRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateCar = {
  data: null,
  loading: false,
  error: "",
};

export const updateCar = createAsyncThunk('updateCar', async (car:UpdateCarRequest) => {
  try {
    const response = await axiosInstance.put('/cars/update', car);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateCarSlice = createSlice({
  name: 'updateCar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateCarSlice.reducer;