import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../../models/CustomerModel/responses/getCustomerByIdResponse";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";


interface CustomerInfo {
    data: Customer | null;
    loading: boolean;
    error: string;
    CustomerInfoSend: Customer | null;
}

const initialState: CustomerInfo = {
    data: null,
    loading: false,
    error: "",
    CustomerInfoSend: null
}

export const getCustomerInfo = createAsyncThunk('getCustomer', async (id:number) => {
    const response = await axiosInstance.get<Customer>('customers/getById?id='+id);
    return response.data;
})

export const customerInfoSlice = createSlice({
    name:'getCustomer',
    initialState,
    reducers: {
      setCustomerInfoSend:(state,action:PayloadAction<Customer>)  =>{
        state.CustomerInfoSend = action.payload
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomerInfo.pending, (state) => {
          state.loading = true;
          state.error = "";
        });
    
        builder.addCase(getCustomerInfo.fulfilled, (state, action) => {
          state.data = action.payload
          state.loading=false;
        });
    
        builder.addCase(getCustomerInfo.rejected, (state) => {
          state.loading = false;
          state.error = "Error fetching data"
        });
      },
})

export const {setCustomerInfoSend} = customerInfoSlice.actions

export default customerInfoSlice.reducer;