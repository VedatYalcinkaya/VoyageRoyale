import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateGearTypeRequest } from '../../models/carGearTypeModel/requests/updateGearTypeRequest'


interface UpdateGearType{
  data: UpdateGearTypeRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateGearType = {
  data: null,
  loading: false,
  error: "",
};

export const updateGearType = createAsyncThunk('updateGearType', async (gearType:UpdateGearTypeRequest) => {
  try {
    const response = await axiosInstance.put('/gear_types/update', gearType);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const updateGearTypeSlice = createSlice({
  name: 'updateGearType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGearType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateGearType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateGearType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateGearTypeSlice.reducer;