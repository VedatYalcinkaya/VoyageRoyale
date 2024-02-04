import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';

interface DeleteCar{
  data: number | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteCar = {
  data: null,
  loading: false,
  error: "",
};

export const deleteCar= createAsyncThunk('deleteCars', async (car:number) => {
  try {
    const response = await axiosInstance.delete(`/cars/delete/${car}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteCarSlice = createSlice({
  name: 'deleteCar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteCarSlice.reducer;