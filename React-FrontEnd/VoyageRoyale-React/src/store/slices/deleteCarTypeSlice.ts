import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteCarTypeRequest } from '../../models/CarCarTypeModel/requests/deleteCarTypeRequest';

interface DeleteCarType{
  data: DeleteCarTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteCarType = {
  data: null,
  loading: false,
  error: "",
};

export const deleteCarType = createAsyncThunk('deleteCarType', async (carType:DeleteCarTypeRequest) => {
  try {
    const response = await axiosInstance.delete(`/carTypes/delete/${carType.id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteCarTypeSlice = createSlice({
  name: 'deleteCarType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCarType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteCarType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteCarType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteCarTypeSlice.reducer;