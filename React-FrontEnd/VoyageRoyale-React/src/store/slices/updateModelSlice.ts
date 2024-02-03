import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateBrandRequest } from '../../models/CarBrandModel/requests/updateBrandRequest';
import { UpdateModelRequest } from '../../models/ModelModel/requests/updateModelRequest';


interface UpdateModel{
  data: UpdateModelRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateModel = {
  data: null,
  loading: false,
  error: "",
};

export const updateModel = createAsyncThunk('updateModel', async (brand:UpdateModelRequest) => {
  try {
    const response = await axiosInstance.put('/models/update', brand);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateModelSlice = createSlice({
  name: 'updateModel',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateModel.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateModel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateModelSlice.reducer;