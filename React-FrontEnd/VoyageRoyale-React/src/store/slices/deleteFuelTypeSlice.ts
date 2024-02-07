import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteFuelTypeRequest } from '../../models/CarFuelTypeModel/requests/deleteFuelTypeRequest';

interface DeleteFuelType{
  data: DeleteFuelType | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteFuelType = {
  data: null,
  loading: false,
  error: "",
};

export const deleteFuelType = createAsyncThunk('deleteFuelType', async (fuelType:DeleteFuelTypeRequest) => {
  try {
    const response = await axiosInstance.delete(`/fuel_types/delete/${fuelType.id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteFuelTypeSlice = createSlice({
  name: 'deleteFuelType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFuelType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteFuelType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteFuelType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteFuelTypeSlice.reducer;