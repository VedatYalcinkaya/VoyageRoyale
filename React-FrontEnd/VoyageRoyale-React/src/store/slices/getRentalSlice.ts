import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetAllRentalResponse } from "../../models/RentalModel/responses/getAllRentalResponse";

interface GetRentals {
  data: GetAllRentalResponse[];
  loading: boolean;
  error: string;
}

const initialState: GetRentals = {
  data: [],
  loading: false,
  error: "",
};

export const getRentals = createAsyncThunk<GetAllRentalResponse[], void>(
  "getRentals",
  async () => {
    const response = await axiosInstance.get<GetAllRentalResponse[]>(
      "/rentals/getAll"
    );
    return response.data;
  }
);

export const getRentalSlice = createSlice({
  name: "getRentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRentals.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getRentals.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getRentals.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching rental data";
    });
  },
});

export default getRentalSlice.reducer;
