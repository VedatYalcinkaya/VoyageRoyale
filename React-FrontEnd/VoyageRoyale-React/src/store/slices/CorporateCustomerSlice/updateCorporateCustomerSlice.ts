import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateCorporateCustomerRequest } from "../../../models/CorporateCustomerModel/requests/updateCorporateCustomerModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface UpdateCorporateCustomer{
    data: UpdateCorporateCustomerRequest | null;
    loading: boolean;
    error: string;
}

const initialState: UpdateCorporateCustomer = {
    data: null,
    loading: false,
    error: "",
  };

  export const putCorporateCustomer = createAsyncThunk('putCorporateCustomer', async(corporateCustomer:UpdateCorporateCustomerRequest) => {
    try {
        const response = await axiosInstance.put('/corporateCustomers/customUpdate', corporateCustomer);
        return response.data; 
      } catch (error) {
        throw error;
      }
  })

  const updateCorporateCustomerSlice = createSlice({
    name: 'updateCorporateCustomer',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=> {
        builder
        .addCase(putCorporateCustomer.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(putCorporateCustomer.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
          })
          .addCase(putCorporateCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An error occurred.";
          });
    },
  });

  export default updateCorporateCustomerSlice.reducer;