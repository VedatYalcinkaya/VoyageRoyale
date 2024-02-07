import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { DeleteGearTypeRequest } from '../../models/CarGearTypeModel/requests/deleteGearTypeRequest';

interface DeleteGearType{
  data: DeleteGearType | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteGearType = {
  data: null,
  loading: false,
  error: "",
};

export const deleteGearType = createAsyncThunk('deleteGearType', async (gearType:DeleteGearTypeRequest) => {
  try {
    const response = await axiosInstance.delete(`/gear_types/delete/${gearType.id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteGearTypeSlice = createSlice({
  name: 'deleteGearType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGearType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteGearType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(deleteGearType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteGearTypeSlice.reducer;