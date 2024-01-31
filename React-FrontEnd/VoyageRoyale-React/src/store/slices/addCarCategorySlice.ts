import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddCarCategoryRequest } from '../../models/CarCategoryModel/requests/addCarCategoryRequest';

interface AddCarCategory{
  data: AddCarCategoryRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddCarCategory = {
  data: null,
  loading: false,
  error: "",
};

export const postCarCategory = createAsyncThunk('postCarCategory', async (carType:AddCarCategoryRequest) => {
  try {
    const response = await axiosInstance.post('/carTypes/add', carType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addCarCategorySlice = createSlice({
  name: 'addCarCategory',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCarCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postCarCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postCarCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addCarCategorySlice.reducer;
