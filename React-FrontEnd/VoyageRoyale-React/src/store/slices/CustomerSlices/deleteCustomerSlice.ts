import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/interceptors/axiosInterceptors';


interface DeleteCustomer{
  data: number | null;
}

const initialState: DeleteCustomer = {
  data: null,
};

export const deleteCustomer= createAsyncThunk('deleteCustomer', async (customer:number) => {
  try {
    const response = await axiosInstance.delete(`/customers/delete/${customer}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteCustomerSlice = createSlice({
  name: 'deleteCustomer',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
});

export default deleteCustomerSlice.reducer;