// updateLocationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { UpdateLocationRequest } from "../../../models/LocationModel/requests/updateLocationRequest";

interface UpdateLocation {
  data: UpdateLocationRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateLocation = {
  data: null,
  loading: false,
  error: "",
};

export const updateLocation = createAsyncThunk(
  "updateLocation",
  async (location: UpdateLocationRequest) => {
    const response = await axiosInstance.put(
      `/positions/update/${location.id}`,
      location
    );
    return response.data;
  }
);

const updateLocationSlice = createSlice({
  name: "updateLocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default updateLocationSlice.reducer;
