import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { UpdateCorporatePanelRequest } from "../../../models/CorporateCustomerModel/requests/updateCorporatePanelRequest";

interface UpdateCorporate{
    data: UpdateCorporatePanelRequest | null;
}

const initialState: UpdateCorporate = {
    data: null,
  };

  export const putCorporate = createAsyncThunk('putCorporate', async(customer:UpdateCorporatePanelRequest) => {
    try {
        const response = await axiosInstance.put('/corporateCustomers/update', customer);
        return response.data; 
      } catch (error) {
        throw error;
      }
  })

  const updateCorporateSlice = createSlice({
    name: 'updateCorporate',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=> {
        builder

          .addCase(putCorporate.fulfilled, (state, action) => {
            state.data = action.payload
          })
    },
  });

  export default updateCorporateSlice.reducer;