import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateRentalRequest } from '../../models/RentalModel/requests/updateRentalRequest';


interface UpdateRental{
  data: UpdateRentalRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateRental = {
  data: null,
  loading: false,
  error: "",
};

export const updateRental = createAsyncThunk('updateRental', async (rental:UpdateRentalRequest) => {
  try {
    const response = await axiosInstance.put('/rentals/update', rental);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateRentalSlice = createSlice({
  name: 'updateRental',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRental.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateRental.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateRentalSlice.reducer;