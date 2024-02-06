import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { DeleteLocationRequest } from "../../../models/LocationModel/requests/deleteLocationRequest";

interface DeleteLocation {
  data: DeleteLocationRequest | null;
  loading: boolean;
  error: string;
}

const initialState: DeleteLocation = {
  data: null,
  loading: false,
  error: "",
};

export const deleteLocation = createAsyncThunk(
  "deleteLocation",
  async (location: DeleteLocationRequest) => {
    const response = await axiosInstance.delete(
      `/positions/delete/${location.id}`
    );
    return response.data;
  }
);

const deleteLocationSlice = createSlice({
  name: "deleteLocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default deleteLocationSlice.reducer;
