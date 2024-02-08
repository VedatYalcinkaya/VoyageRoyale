import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { AddRentalRequest } from "../../models/RentalModel/requests/addRentalRequest";

interface AddRental {
  data: AddRentalRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddRental = {
  data: null,
  loading: false,
  error: "",
};

export const postRental = createAsyncThunk(
  "postRental",
  async (rental: AddRentalRequest) => {
    const response = await axiosInstance.post("/rentals/add", rental);
    return response.data;
  }
);

const addRentalSlice = createSlice({
  name: "addRental",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRental.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postRental.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addRentalSlice.reducer;
