import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateColorRequest } from '../../models/ColorModel/requests/updateColorRequest';


interface UpdateColor{
  data: UpdateColorRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateColor = {
  data: null,
  loading: false,
  error: "",
};

export const updateColor = createAsyncThunk('updateColor', async (color:UpdateColorRequest) => {
  try {
    const response = await axiosInstance.put('/colors/update', color);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateColorSlice = createSlice({
  name: 'updateColor',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateColor.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateColorSlice.reducer;