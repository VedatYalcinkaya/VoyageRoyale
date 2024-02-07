import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateFuelTypeRequest } from '../../models/CarFuelTypeModel/requests/updateFuelTypeRequest';


interface UpdateFuelType{
  data: UpdateFuelTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateFuelType = {
  data: null,
  loading: false,
  error: "",
};

export const updateFuelType = createAsyncThunk('updateFuelType', async (fuelType:UpdateFuelTypeRequest) => {
  try {
    const response = await axiosInstance.put('/fuel_types/update', fuelType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateFuelTypeSlice = createSlice({
  name: 'updateFuelType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFuelType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateFuelType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateFuelType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateFuelTypeSlice.reducer;