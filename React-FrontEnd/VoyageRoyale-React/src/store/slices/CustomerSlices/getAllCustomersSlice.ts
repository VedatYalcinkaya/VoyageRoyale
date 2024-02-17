import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { GetAllCustomerResponse } from "../../../models/CustomerModel/responses/getAllCustomerResponse";

interface GetAllCustomer {
  data: GetAllCustomerResponse[] | null;

}

const initialState: GetAllCustomer = {
  data: null,
};

export const getAllCustomer = createAsyncThunk("getAllCustomer", async () => {
  const response = await axiosInstance.get<GetAllCustomerResponse[]>(
    `/customers/getAll`
  );
  return response.data;
});

const getAllCustomerSlice = createSlice({
  name: "getAllCustomer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
      })
 
  },
});

export default getAllCustomerSlice.reducer;
