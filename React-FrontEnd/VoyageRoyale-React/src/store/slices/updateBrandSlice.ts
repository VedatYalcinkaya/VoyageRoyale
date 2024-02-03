import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateBrandRequest } from '../../models/CarBrandModel/requests/updateBrandRequest';


interface UpdateBrand{
  data: UpdateBrandRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateBrand = {
  data: null,
  loading: false,
  error: "",
};

export const updateBrand = createAsyncThunk('updateBrand', async (brand:UpdateBrandRequest) => {
  try {
    const response = await axiosInstance.put('/brands/update', brand);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateBrandSlice = createSlice({
  name: 'updateBrand',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateBrandSlice.reducer;