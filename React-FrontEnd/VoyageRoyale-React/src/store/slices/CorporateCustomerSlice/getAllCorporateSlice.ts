import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { GetAllCorporateResponse } from "../../../models/CorporateCustomerModel/responses/getAllCorporateResponse";

interface GetAllCorporate {
  data: GetAllCorporateResponse[] | null;

}

const initialState: GetAllCorporate = {
  data: null,
};

export const getAllCorporate = createAsyncThunk("getAllCorporate", async () => {
  const response = await axiosInstance.get<GetAllCorporateResponse[]>(
    `/corporateCustomers/getAll`
  );
  return response.data;
});

const getAllCorporateSlice = createSlice({
  name: "getAllCorporate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCorporate.fulfilled, (state, action) => {
        state.data = action.payload;
      })
 
  },
});

export default getAllCorporateSlice.reducer;
