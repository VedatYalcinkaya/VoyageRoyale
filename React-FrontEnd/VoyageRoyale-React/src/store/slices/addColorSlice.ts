import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddColorRequest } from '../../models/ColorModel/requests/addColorRequest';

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

export const postColor = createAsyncThunk('postColorCategory', async (color:AddColorRequest) => {
  try {
    const response = await axiosInstance.post('/colors/add', color);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addColorSlice = createSlice({
  name: 'addColorCategory',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postColor.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postColor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addColorSlice.reducer;
