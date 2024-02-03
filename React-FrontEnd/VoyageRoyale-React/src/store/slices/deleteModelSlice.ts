import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteModelRequest } from '../../models/ModelModel/requests/deleteBrandRequest';

interface DeleteModel{
  data: number;
  loading: boolean;
  error: string;
}

const initialState: DeleteModel = {
  data: 0,
  loading: false,
  error: "",
};

export const deleteModel = createAsyncThunk('deleteModel', async (model:number) => {
  try {
    const response = await axiosInstance.delete(`/models/delete/${model}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteModelSlice = createSlice({
  name: 'deleteModel',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteModel.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteModelSlice.reducer;