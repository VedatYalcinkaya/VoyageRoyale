import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { DeleteRentalRequest } from "../../models/RentalModel/requests/deleteRentalRequest";

interface DeleteRental {
  data: number ;
  loading: boolean;
  error: string;
}

const initialState: DeleteRental = {
  data: 0,
  loading: false,
  error: "",
};

export const deleteRental = createAsyncThunk(
  "deleteRental",
  async (id:number) => {
    const response = await axiosInstance.delete(`/rentals/delete/${id}`);
    return response.data;
  }
);

const deleteRentalSlice = createSlice({
  name: "deleteRental",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRental.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteRental.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteRentalSlice.reducer;
