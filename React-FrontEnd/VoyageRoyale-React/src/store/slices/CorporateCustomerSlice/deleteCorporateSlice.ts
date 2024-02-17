import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/interceptors/axiosInterceptors';


interface DeleteCorporate{
  data: number | null;
}

const initialState: DeleteCorporate = {
  data: null,
};

export const deleteCorporate= createAsyncThunk('deleteCorporate', async (corporate:number) => {
  try {
    const response = await axiosInstance.delete(`/corporateCustomers/delete/${corporate}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteCorporateSlice = createSlice({
  name: 'deleteCorporate',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCorporate.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
});

export default deleteCorporateSlice.reducer;