import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { UpdateRentalRequest } from "../../models/RentalModel/requests/updateRentalRequest";

interface UpdateRental {
  loading: boolean;
  error: string;
}

const initialState: UpdateRental = {
  loading: false,
  error: "",
};

export const updateRental = createAsyncThunk<void, UpdateRentalRequest>(
  "updateRental",
  async (updateData: UpdateRentalRequest) => {
    const response = await axiosInstance.put(
      `/rentals/${updateData.id}`,
      updateData
    );
    return response.data;
  }
);

const updateRentalSlice = createSlice({
  name: "updateRental",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateRental.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateRental.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateRentalSlice.reducer;
