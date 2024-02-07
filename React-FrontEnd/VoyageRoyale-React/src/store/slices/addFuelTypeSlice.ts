import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddFuelTypeRequest } from '../../models/CarFuelTypeModel/requests/addFuelTypeRequest';

interface AddFuelType{
  data: AddFuelTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddFuelType = {
  data: null,
  loading: false,
  error: "",
};

export const postFuelType = createAsyncThunk('postFuelTypeCategory', async (fuelType:AddFuelTypeRequest) => {
  try {
    const response = await axiosInstance.post('/fuel_types/add', fuelType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addFuelTypeSlice = createSlice({
  name: 'addFuelType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFuelType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postFuelType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postFuelType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addFuelTypeSlice.reducer;
