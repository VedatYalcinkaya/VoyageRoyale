import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetCustomerByEmailResponse } from "../../models/CustomerModel/responses/getCustomerByEmailResponse";

interface GetCustomer {
  data: GetCustomerByEmailResponse | null;
  loading: boolean;
  error: string;
}

const initialState: GetCustomer = {
  data: null,
  loading: false,
  error: "",
};

export const getCustomerByEmail = createAsyncThunk(
  "getCustomerByEmail",
  async (email: string | undefined) => {
    const response = await axiosInstance.get<GetCustomerByEmailResponse>(
      `/users/getByEmail?email=${email}`
    );
    return response.data;
  }
);

const getCustomerByEmailSlice = createSlice({
  name: "getCustomerByEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerByEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getCustomerByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCustomerByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default getCustomerByEmailSlice.reducer;
