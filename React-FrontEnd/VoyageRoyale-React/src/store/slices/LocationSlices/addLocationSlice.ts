import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { AddLocationRequest } from "../../../models/LocationModel/requests/addLocationRequest";

interface AddLocation {
  data: AddLocationRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddLocation = {
  data: null,
  loading: false,
  error: "",
};

export const addLocation = createAsyncThunk(
  "addLocation",
  async (location: AddLocationRequest) => {
    const response = await axiosInstance.post("/positions/add", location);
    return response.data;
  }
);

const addLocationSlice = createSlice({
  name: "addLocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLocation.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default addLocationSlice.reducer;
