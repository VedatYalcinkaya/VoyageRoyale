import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddBrandRequest } from '../../models/CarBrandModel/requests/addBrandRequest';

interface AddBrand{
  data: AddBrandRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddBrand = {
  data: null,
  loading: false,
  error: "",
};

export const postBrand = createAsyncThunk('postCarCategory', async (brand:AddBrandRequest) => {
  try {
    const response = await axiosInstance.post('/brands/add', brand);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addBrandSlice = createSlice({
  name: 'addBrand',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBrand.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addBrandSlice.reducer;
