import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddColorRequest } from '../../../models/ColorModel/requests/addColorRequest';
import axiosInstance from '../../../utils/interceptors/axiosInterceptors';

interface AddColor{
  data: AddColorRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddColor = {
  data: null,
  loading: false,
  error: "",
};

export const postColorModel = createAsyncThunk('postColorModel', async (color:AddColorRequest) => {
  try {
    const response = await axiosInstance.post('/colors/add', color);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addColorSlice = createSlice({
  name: 'addColorModel',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postColorModel.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postColorModel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postColorModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addColorSlice.reducer;
