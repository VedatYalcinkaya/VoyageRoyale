import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateCarTypeRequest } from '../../models/CarCarTypeModel/requests/updateCarTypeRequest';


interface UpdateCarType{
  data: UpdateCarTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateCarType = {
  data: null,
  loading: false,
  error: "",
};

export const updateCarType = createAsyncThunk('updateCarType', async (carType:UpdateCarTypeRequest) => {
  try {
    const response = await axiosInstance.put('/carTypes/update', carType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateCarTypeSlice = createSlice({
  name: 'updateCarType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCarType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateCarType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateCarType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateCarTypeSlice.reducer;