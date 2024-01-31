import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateCustomerRequest } from "../../../models/CustomerModel/requests/updateCustomerRequest";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface UpdateCustomer{
    data: UpdateCustomerRequest | null;
    loading: boolean;
    error: string;
}

const initialState: UpdateCustomer = {
    data: null,
    loading: false,
    error: "",
  };

  export const putCustomer = createAsyncThunk('putCustomer', async(customer:UpdateCustomerRequest) => {
    try {
        const response = await axiosInstance.put('/customers/customUpdate', customer);
        return response.data; 
      } catch (error) {
        throw error;
      }
  })

  const updateCustomerSlice = createSlice({
    name: 'updateCustomer',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=> {
        builder
        .addCase(putCustomer.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(putCustomer.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
          })
          .addCase(putCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An error occurred.";
          });
    },
  });

  export default updateCustomerSlice.reducer;