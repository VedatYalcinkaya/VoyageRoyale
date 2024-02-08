import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
interface DeleteInvoice{
  data: number;
}

const initialState: DeleteInvoice = {
  data: 0
};

export const deleteInvoice = createAsyncThunk('deleteInvoice', async (id:number) => {
  try {
    const response = await axiosInstance.delete(`/invoices/delete/${id}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const deleteInvoiceSlice = createSlice({
  name: 'deleteInvoice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
});

export default deleteInvoiceSlice.reducer;