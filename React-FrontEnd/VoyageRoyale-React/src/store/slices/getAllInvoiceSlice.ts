import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetAllInvoiceResponse } from "../../models/InvoiceModel/responses/getAllInvoiceResponse";

interface GetAllInvoice {
  data: GetAllInvoiceResponse[] | null;
  loading: boolean;
  error: string;
}

const initialState: GetAllInvoice = {
  data: null,
  loading: false,
  error: "",
};

export const getAllInvoice = createAsyncThunk("getAllInvoice", async () => {
  const response = await axiosInstance.get<GetAllInvoiceResponse[]>(
    `/invoices/getAll`
  );
  return response.data;
});

const getAllInvoiceSlice = createSlice({
  name: "getAllInvoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInvoice.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default getAllInvoiceSlice.reducer;
