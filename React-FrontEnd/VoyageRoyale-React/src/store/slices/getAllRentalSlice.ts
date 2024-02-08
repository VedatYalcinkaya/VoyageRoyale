import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetAllRentalResponse } from "../../models/RentalModel/responses/getAllRentalResponse";

interface GetAllRentals {
  data: GetAllRentalResponse[] | null;

}

const initialState: GetAllRentals = {
  data: null,
 
};

export const getAllRentals = createAsyncThunk("getAllRentals", async () => {
  const response = await axiosInstance.get<GetAllRentalResponse[]>(
    `/rentals/getAll`
  );
  return response.data;
});

const getAllRentalsSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllRentals.fulfilled, (state, action) => {
        state.data = action.payload;
      })
    
  },
});

export default getAllRentalsSlice.reducer;
