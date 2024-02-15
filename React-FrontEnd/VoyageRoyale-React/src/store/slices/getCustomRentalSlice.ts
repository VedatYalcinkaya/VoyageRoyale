import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetCustomRentalResponse } from "../../models/RentalModel/responses/getCustomRentalResponse";

interface GetCustomRentals {
  data: GetCustomRentalResponse[] | null;

}

const initialState: GetCustomRentals = {
  data: null,
 
};

export const getCustomRentals = createAsyncThunk("getCustomRentals", async () => {
  const response = await axiosInstance.get<GetCustomRentalResponse[]>(
    `/rentals/getCustomRentals`
  );
  return response.data;
});

const getCustomRentalsSlice = createSlice({
  name: "getCustomRentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getCustomRentals.fulfilled, (state, action) => {
        state.data = action.payload;
      })
    
  },
});

export default getCustomRentalsSlice.reducer;
