import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddCarTypeRequest } from '../../models/CarCategoryModel/requests/addCarCategoryRequest';
import { AddModelRequest } from '../../models/ModelModel/requests/addModelRequest';

interface AddCarModel{
  data: AddModelRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddCarModel = {
  data: null,
  loading: false,
  error: "",
};

export const postCarModel = createAsyncThunk('postCarModel', async (model:AddModelRequest) => {
  try {
    const response = await axiosInstance.post('/models/add', model);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addCarModelSlice = createSlice({
  name: 'addCarModel',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCarModel.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postCarModel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postCarModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addCarModelSlice.reducer;
