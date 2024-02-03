import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteBrandRequest } from '../../models/CarBrandModel/requests/deleteBrandRequest';

interface DeleteBrand{
  data: DeleteBrandRequest | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteBrand = {
  data: null,
  loading: false,
  error: "",
};

export const deleteBrand = createAsyncThunk('deleteBrand', async (brand:DeleteBrandRequest) => {
  try {
    const response = await axiosInstance.delete(`/brands/delete/${brand.id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteBrandSlice = createSlice({
  name: 'deleteBrand',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteBrandSlice.reducer;