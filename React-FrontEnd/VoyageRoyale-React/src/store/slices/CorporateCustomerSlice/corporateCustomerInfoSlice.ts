import { CorporateCustomer } from '../../../models/CorporateCustomerModel/responses/getCorporateCustomerByEmail';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CorporateCustomerInfo {
    data: CorporateCustomer | null;
    loading: boolean;
    error: string;
    CustomerInfoSend: CorporateCustomer | null;
}

const initialState: CorporateCustomerInfo = {
    data: null,
    loading: false,
    error: "",
    CustomerInfoSend: null
}

export const getCorporateCustomerInfo = createAsyncThunk('getCorporateCustomer', async (email:string| undefined) => {
    const response = await axiosInstance.get<CorporateCustomer>(`corporateCustomers/getByEmail?email=${email}`);
    return response.data;
})


export const CorporateCustomerInfoSlice = createSlice({
    name:'getCorporateCustomer',
    initialState,
    reducers: {
      setCustomerInfoSend:(state,action:PayloadAction<CorporateCustomer>)  =>{
        state.CustomerInfoSend = action.payload
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getCorporateCustomerInfo.pending, (state) => {
          state.loading = true;
          state.error = "";
        });
    
        builder.addCase(getCorporateCustomerInfo.fulfilled, (state, action) => {
          state.data = action.payload
          state.loading=false;
        });
    
        builder.addCase(getCorporateCustomerInfo.rejected, (state) => {
          state.loading = false;
          state.error = "Error fetching data"
        });
      },
})

export const {setCustomerInfoSend} = CorporateCustomerInfoSlice.actions

export default CorporateCustomerInfoSlice.reducer;