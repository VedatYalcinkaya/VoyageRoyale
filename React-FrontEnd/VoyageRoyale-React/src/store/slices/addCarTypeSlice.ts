import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddCarTypeRequest } from '../../models/CarCarTypeModel/requests/addCarTypeRequest';

interface AddCarType{
  data: AddCarTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddCarType = {
  data: null,
  loading: false,
  error: "",
};

export const postCarType = createAsyncThunk('postCarType', async (carType:AddCarTypeRequest) => {
  try {
    const response = await axiosInstance.post('/carTypes/add', carType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addCarTypeSlice = createSlice({
  name: 'addCarCategory',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCarType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postCarType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postCarType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addCarTypeSlice.reducer;
