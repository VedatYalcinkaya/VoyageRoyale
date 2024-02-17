import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { UpdateCustomerPanelRequest } from "../../../models/CustomerModel/requests/updateCustomerPanelRequest";

interface UpdateCustomer{
    data: UpdateCustomerPanelRequest | null;
}

const initialState: UpdateCustomer = {
    data: null,
  };

  export const putCustomerPanel = createAsyncThunk('putCustomerPanel', async(customer:UpdateCustomerPanelRequest) => {
    try {
        const response = await axiosInstance.put('/customers/update', customer);
        return response.data; 
      } catch (error) {
        throw error;
      }
  })

  const updateCustomerPanelSlice = createSlice({
    name: 'updateCustomerPanel',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=> {
        builder

          .addCase(putCustomerPanel.fulfilled, (state, action) => {
            state.data = action.payload
          })
    },
  });

  export default updateCustomerPanelSlice.reducer;