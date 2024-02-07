import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteColorRequest } from '../../models/ColorModel/requests/deleteColorRequest';

interface DeleteColor{
  data: DeleteColorRequest | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteColor = {
  data: null,
  loading: false,
  error: "",
};

export const deleteColor = createAsyncThunk('deleteColor', async (color:DeleteColorRequest) => {
  try {
    const response = await axiosInstance.delete(`/colors/delete/${color.id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteColorSlice = createSlice({
  name: 'deleteColor',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteColorSlice.reducer;