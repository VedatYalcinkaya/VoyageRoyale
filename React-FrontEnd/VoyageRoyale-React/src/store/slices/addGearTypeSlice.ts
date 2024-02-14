import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddGearTypeRequest } from '../../models/carGearTypeModel/requests/addGearTypeRequest'

interface AddGearType{
  data: AddGearTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddGearType = {
  data: null,
  loading: false,
  error: "",
};

export const postGearType = createAsyncThunk('postGearTypeCategory', async (gearType:AddGearTypeRequest) => {
  try {
    const response = await axiosInstance.post('/gear_types/add', gearType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const addGearTypeSlice = createSlice({
  name: 'addFuelType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postGearType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postGearType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postGearType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addGearTypeSlice.reducer;
